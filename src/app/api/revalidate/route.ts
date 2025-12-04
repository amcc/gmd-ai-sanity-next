import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handleRevalidation() {
  try {
    // Revalidate content tags used in the site
    const tags = ["faq", "homepageSingleton"];
    const paths = ["/"];
    
    // Revalidate tags
    tags.forEach((tag) => {
      revalidateTag(tag);
    });
    
    // Revalidate paths
    paths.forEach((path) => {
      revalidatePath(path);
    });
    
    // Also revalidate with layout to clear layout cache
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Cache revalidated successfully",
      revalidated_tags: tags,
      revalidated_paths: paths,
      timestamp: new Date().toISOString(),
      cache_headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    };
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const result = await handleRevalidation();
    return NextResponse.json(result, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Revalidation error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature for security
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    const body = await req.text();
    
    if (!isValidSignature(body, signature ?? "", process.env.SANITY_WEBHOOK_SECRET ?? "")) {
      console.warn("Invalid webhook signature received");
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Trigger revalidation on valid webhook
    const result = await handleRevalidation();
    return NextResponse.json(result, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Revalidation error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
