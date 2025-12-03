import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

export const runtime = "edge";

export const alt = "AI - Show Your Visual Creativity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function HomepageOGImage() {
  try {
    // Fetch homepage data to get the first artwork image
    const homepage = await sanityFetch({
      query: HOMEPAGE_QUERY,
      tags: ["homepageSingleton"],
    });

    // Get the first artwork image if available
    const firstArtwork = homepage?.artworks?.[0];
    const imageUrl =
      firstArtwork?._type === "imageItem" ? firstArtwork.asset?.url : null;

    if (imageUrl) {
      // Use the artwork image as the Open Graph image
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={imageUrl + "?w=1200&h=630&fit=crop&crop=center"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="GMD AI"
            />
          </div>
        ),
        {
          ...size,
        }
      );
    }

    // Fallback: use the existing JPG if no artwork image
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src="/opengraph-image.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="GMD AI"
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Error generating homepage OG image:", error);

    // Fallback: use the existing JPG
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src="/opengraph-image.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="GMD AI"
          />
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
