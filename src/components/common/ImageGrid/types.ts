// Grid item types for different document types
export interface GridItemBase {
  _id: string;
  slug: { current: string };
  title?: string | null;
  mainImage?: {
    asset: {
      _id: string;
      url?: string | null;
    } | null;
  } | null;
}

export interface ArtworkGridItem extends GridItemBase {
  categories?: Array<{ title?: string | null }> | null;
  description?: Array<{
    _type: string;
    children?: Array<{ text: string }>;
  }> | null;
  priority?: boolean | null;
  artworkDate?: string | null;
}

export interface BiographyGridItem extends GridItemBase {
  type?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface StudioGridItem extends GridItemBase {
  location?: string | null;
  year?: string | null;
}

export type GridItem = ArtworkGridItem | BiographyGridItem | StudioGridItem;

// Type guards
export const isArtworkItem = (item: GridItem): item is ArtworkGridItem => {
  return "categories" in item || "priority" in item;
};

export const isBiographyItem = (item: GridItem): item is BiographyGridItem => {
  return "type" in item && "startDate" in item;
};

export const isStudioItem = (item: GridItem): item is StudioGridItem => {
  return "location" in item || "year" in item;
};
