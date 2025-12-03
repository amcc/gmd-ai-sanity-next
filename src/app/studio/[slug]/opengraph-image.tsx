import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { STUDIO_QUERY } from "@/sanity/lib/queries";
import { STUDIO_QUERYResult } from "@/sanity/types";

export const runtime = "edge";

export const alt = "Alistair McClymont";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function ArtworkOGImage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // Fetch the artwork data
    const studio: STUDIO_QUERYResult = await sanityFetch({
      query: STUDIO_QUERY,
      params,
      tags: ["studio"],
    });

    if (!studio) {
      // Fallback if artwork not found
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              backgroundColor: "#252525",
            }}
          ></div>
        ),
        {
          ...size,
        }
      );
    }

    // Get the main image URL from Sanity
    const imageUrl = studio.mainImage?.asset?.url;

    if (imageUrl) {
      // Use the artwork's main image as the Open Graph image
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
              alt={studio.title || "Alistair McClymont"}
            />
          </div>
        ),
        {
          ...size,
        }
      );
    }

    // Fallback: use the existing JPG if no main image
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
            alt="Alistair McClymont"
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Error generating artwork OG image:", error);

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
            alt="Alistair McClymont"
          />
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
