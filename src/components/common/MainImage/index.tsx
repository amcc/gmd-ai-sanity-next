import { SanityImage } from "../SanityImage";
import {
  SanityImageMetadata,
  SanityImageHotspot,
  SanityImageCrop,
} from "@/sanity/types";

import styles from "./MainImage.module.css";

type Image = {
  _key?: string;
  _type?: "imageItem";
  asset: {
    _id: string;
    _ref: null;
    url: string | null;
    metadata: SanityImageMetadata | null;
  } | null;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  caption?: string;
  alt?: string;
};

interface MainImage {
  image: Image;
}

const MainImage = ({ image }: MainImage) => {
  return (
    <div className={styles.mainImage}>
      <SanityImage
        image={image}
        constrainHeight={true}
        maxHeight="97vh"
        objectFit="contain"
        sizes="(max-width: 35em) calc(100vw - 32px), (max-width: 48em) calc(100vw - 128px), calc(100vw - 256px)"
        quality={98} // High quality for main artwork images
        maxWidth={1600} // Reasonable max for artwork detail pages
      />
    </div>
  );
};

export { MainImage };
