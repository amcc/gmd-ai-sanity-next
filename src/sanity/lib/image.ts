import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageMetadata } from "@/sanity/types";

import { dataset, projectId } from "../env";

// import { log } from "@/utils/common";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

type ImageProps = {
  asset: {
    _id: string;
    _ref: null;
    url: string | null;
    metadata: SanityImageMetadata | null;
  } | null;
};

export const urlFor = (source: ImageProps) => {
  return builder.image(source);
};

// interface ImageDimensions {
//   width: number;
//   height: number;
// }

// export function getImageDimensions(image: SanityImageSource): ImageDimensions {
//   if (
//     !image ||
//     typeof image !== "object" ||
//     !("asset" in image) ||
//     !image.asset._ref
//   ) {
//     throw new Error("Invalid image source");
//   }

//   const dimensions = image.asset._ref.match(/-(\d+)x(\d+)-/);
//   if (!dimensions) {
//     throw new Error("Could not extract dimensions from image source");
//   }

//   return {
//     width: parseInt(dimensions[1], 10),
//     height: parseInt(dimensions[2], 10),
//   };
// }
