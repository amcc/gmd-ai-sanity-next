import { type SchemaTypeDefinition } from "sanity";
import { imageItem } from "./objects/imageItem";
import { videoItem } from "./objects/videoItem";
import { dimensions } from "./objects/dimensions";
import { blockContent } from "./objects/blockContent";
// import { artworkReference } from "./objects/artworkReference";
// import { biographyReference } from "./objects/biographyReference";
import { linkItem } from "./objects/linkItem";
import { faq } from "./documents/faq";
import { address } from "./objects/address";
import { download } from "./objects/download";
import { linkPageItem } from "./objects/linkPageItem";
import { linkPageSingleton } from "./objects/links";
import { homepageSingleton } from "./singletons/homepageSingleton";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    faq,

    // Objects
    imageItem,
    videoItem,
    dimensions,
    blockContent,
    // artworkReference,
    // biographyReference,
    linkItem,
    linkPageItem,
    address,
    download,

    // Singletons
    homepageSingleton,
    linkPageSingleton,
  ],
};
