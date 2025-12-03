import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons Section
      S.listItem()
        .title("Homepage")
        .child(
          S.document()
            .schemaType("homepageSingleton")
            .documentId("homepageSingleton")
        ),
      S.listItem()
        .title("Links Page")
        .child(
          S.document()
            .schemaType("linkPageSingleton")
            .documentId("linkPageSingleton")
        ),

      S.divider(),

      // Main Content
      S.documentTypeListItem("faq").title("FAQs"),
    ]);
