import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Clear all cache tags used in the site
    const allTags = ["faq", "homepageSingleton", "linkPageSingleton"];
    // Clear all paths
    const allPaths = ["/"];
    // Revalidate each tag multiple times
    for (let i = 0; i < 3; i++) {
      for (const tag of allTags) {
        revalidateTag(tag);
      }
    }
    // Revalidate each path with different options
    for (const path of allPaths) {
      revalidatePath(path);
      revalidatePath(path, "layout");
      revalidatePath(path, "page");
    }
    return NextResponse.json({
      success: true,
      message: "Aggressive cache revalidation completed",
      cleared_tags: allTags,
      cleared_paths: allPaths,
      iterations: 3,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed aggressive revalidation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
