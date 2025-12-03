// Example: How to use the ImageGrid component for different document types

import { ImageGrid } from "@/components/common/ImageGrid";
import { sanityFetch } from "@/sanity/lib/client";
import {
  ARTWORKS_QUERY,
  BIOGRAPHIES_QUERY,
  STUDIOS_QUERY,
} from "@/sanity/lib/queries";

// Usage Examples:

// 1. For Artworks (existing usage)
export async function ArtworkGridExample() {
  const artworks = await sanityFetch({
    query: ARTWORKS_QUERY,
    tags: ["artwork"],
  });

  return <ImageGrid artworks={artworks} itemType="artwork" />;
}

// 2. For Biographies
export async function BiographyGridExample() {
  const biographies = await sanityFetch({
    query: BIOGRAPHIES_QUERY,
    tags: ["biography"],
  });

  return <ImageGrid biographies={biographies} itemType="biography" />;
}

// 3. For Studios
export async function StudioGridExample() {
  const studios = await sanityFetch({
    query: STUDIOS_QUERY,
    tags: ["studio"],
  });

  return <ImageGrid studios={studios} itemType="studio" />;
}

// 4. Recent items (with recent prop)
export async function RecentArtworkGridExample() {
  const artworks = await sanityFetch({
    query: ARTWORKS_QUERY,
    tags: ["artwork"],
  });

  return <ImageGrid artworks={artworks} itemType="artwork" recent={true} />;
}

/* 
Key Features of the Refactored ImageGrid:

1. **Polymorphic Design**: Accepts different document types (artwork, biography, studio)
2. **Dynamic Routing**: Automatically generates correct URLs based on itemType
3. **Flexible Filtering**: Supports category filtering for artworks and type filtering for biographies
4. **Search Functionality**: Built-in search across titles and descriptions
5. **Responsive Layout**: Maintains existing grid layout and responsive behavior
6. **Type Safety**: Proper TypeScript interfaces (see types.ts)

Props:
- `artworks?`: Array of artwork documents
- `biographies?`: Array of biography documents  
- `studios?`: Array of studio documents
- `itemType`: 'artwork' | 'biography' | 'studio' - determines behavior and routing
- `recent?`: boolean - enables recent/priority mode with carousel

The component automatically:
- Filters out items without required fields (slug, mainImage)
- Generates appropriate href URLs based on itemType
- Provides category/type filtering when applicable
- Maintains existing search and sort functionality
- Preserves all CSS styling and responsive behavior
*/
