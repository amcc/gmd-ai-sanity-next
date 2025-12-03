import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}/social.png`;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          backgroundImage: `url(${image})`,
          background: "rgba(255,255,255, 1)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    ),
    {
      ...size,
    }
  );
}
