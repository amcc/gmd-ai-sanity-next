import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Force revalidate all major content tags multiple times to ensure it works
    const tags = ["artwork", "biography", "studio", "homepageSingleton"];
    const paths = ["/", "/artwork", "/biography", "/studio"];
    // Revalidate tags
    for (const tag of tags) {
      revalidateTag(tag);
    }
    // Revalidate paths
    for (const path of paths) {
      revalidatePath(path);
    }
    // Also try revalidating with layout: true to clear layout cache
    revalidatePath("/", "layout");
    revalidatePath("/artwork", "layout");
    return NextResponse.json(
      {
        success: true,
        message: "Cache revalidated successfully",
        revalidated_tags: tags,
        revalidated_paths: paths,
        timestamp: new Date().toISOString(),
        cache_headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
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
