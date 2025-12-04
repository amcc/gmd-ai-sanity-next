/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ImageGrid,
  RelatedArtwork,
  RelatedBiography,
} from "@/components/common/ImageGrid";

// Union type for all possible items
type Document = any;

interface RelatedSectionProps {
  document: Document;
}

const RelatedSection = ({ document }: RelatedSectionProps) => {
  const relatedArtworks = Array.isArray(document?.relatedArtworks)
    ? (document.relatedArtworks as (RelatedArtwork | null)[]).filter(
        (a): a is RelatedArtwork => a !== null
      )
    : [];

  const relatedBiography = Array.isArray(document?.relatedBiography)
    ? (document.relatedBiography as (RelatedBiography | null)[]).filter(
        (b): b is RelatedBiography => b !== null
      )
    : [];

  const exhibition = ["group", "solo"];
  const event = ["talk", "residency"];
  const press = ["press"];

  console.log("relatedBiography", relatedBiography);
  const relatedExhibtions = relatedBiography.filter((bio) =>
    bio.type ? exhibition.includes(bio.type) : false
  );
  const relatedEvents = relatedBiography.filter((bio) =>
    bio.type ? event.includes(bio.type) : false
  );
  const relatedPress = relatedBiography.filter((bio) =>
    bio.type ? press.includes(bio.type) : false
  );
  const otherBio = relatedBiography.filter((bio) =>
    bio.type ? ![...exhibition, ...event, ...press].includes(bio.type) : true
  );

  // Related Biography sections to consider:
  // { title: "Group Show", value: "group" },
  // { title: "Solo Show", value: "solo" },
  // { title: "Talk", value: "talk" },
  // { title: "Education", value: "education" },
  // { title: "Publication", value: "publication" },
  // { title: "Collection", value: "collection" },
  // { title: "Residency", value: "residency" },
  // { title: "Press", value: "press" },

  return (
    <section className="related-section">
      {relatedArtworks.length > 0 && (
        <div>
          <h2 className="big-title">Related Artworks</h2>
          <ImageGrid
            relatedArtworks={relatedArtworks}
            itemType="artwork"
            related
          />
        </div>
      )}
      {relatedExhibtions.length > 0 && (
        <div>
          <h2 className="big-title">Related Exhibitions</h2>
          <ImageGrid
            relatedBiography={relatedExhibtions}
            itemType="biography"
            related
          />
        </div>
      )}
      {relatedEvents.length > 0 && (
        <div>
          <h2 className="big-title">Related Events</h2>
          <ImageGrid
            relatedBiography={relatedEvents}
            itemType="biography"
            related
          />
        </div>
      )}
      {relatedPress.length > 0 && (
        <div>
          <h2 className="big-title">Related Press</h2>
          <ImageGrid
            relatedBiography={relatedPress}
            itemType="biography"
            related
          />
        </div>
      )}
      {otherBio.length > 0 && (
        <div>
          <h2 className="big-title">Related Biography</h2>
          <ImageGrid relatedBiography={otherBio} itemType="biography" related />
        </div>
      )}
    </section>
  );
};
export { RelatedSection };
