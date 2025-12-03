import { ARTWORKS_QUERYResult } from "@/sanity/types";

export interface OrderOption {
  key: string;
  label: string;
  sortFn?: (
    artworks: NonNullable<ARTWORKS_QUERYResult[number]>[]
  ) => NonNullable<ARTWORKS_QUERYResult[number]>[];
}

export const ORDER_OPTIONS: OrderOption[] = [
  {
    key: "priority",
    label: "Order by major exhibtion",
    sortFn: (artworks) =>
      [...artworks].sort((a, b) => (b.major ? 1 : 0) - (a.major ? 1 : 0)),
  },
  {
    key: "date",
    label: "Order by date",
    sortFn: (artworks) =>
      [...artworks].sort((a, b) => {
        const dateA = new Date(a.artworkDate || a.publishedAt || 0);
        const dateB = new Date(b.artworkDate || b.publishedAt || 0);
        return dateB.getTime() - dateA.getTime();
      }),
  },
];

export const DEFAULT_ORDER = ORDER_OPTIONS[0].key;
