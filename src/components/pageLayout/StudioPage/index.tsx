import { STUDIO_QUERYResult } from "@/sanity/types";
import { formatDate } from "@/utils/common";
import { BlockContent } from "@/components/common/BlockContent";
import { PortableTextBlock } from "@portabletext/react";
import { ArtworksSection } from "@/components/common/ArtworksSection";
import { MainImage } from "@/components/common/MainImage";
import { RelatedSection } from "@/components/common/RelatedSection";
import styles from "./Artwork.module.css";

interface StudioPageProps {
  studio: STUDIO_QUERYResult;
}

const StudioPage = ({ studio }: StudioPageProps) => {
  if (!studio) return null;
  const studioDate = formatDate(studio.publishedAt);

  return (
    <div className={`${styles.artworkPage} padded-page`}>
      {studio?.mainImage && <MainImage image={studio.mainImage} />}
      <div className={styles.artInfoContainer}>
        <section className={"body-section"}>
          <h1>{studio.title}</h1>
          <section className={styles.details}>
            {studioDate && <div className={styles.date}>{studioDate}</div>}
            {studio.links && studio.links?.length > 0 && (
              <div className={styles.links}>
                {studio.links.map((link, index) => (
                  <div className={styles.link} key={index}>
                    <a
                      href={link.url || undefined}
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                    >
                      {link.title}
                    </a>
                  </div>
                ))}
              </div>
            )}
            {studio.downloads && studio.downloads.length > 0 && (
              <>
                <h3>Downloads</h3>
                {studio.downloads.map((download, index) => (
                  <div className={styles.link} key={index}>
                    <a
                      href={download.asset?.url || undefined}
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                    >
                      Download File
                    </a>
                  </div>
                ))}
              </>
            )}
          </section>
        </section>
        <section className="body-section">
          {studio?.description && (
            <BlockContent blocks={studio.description as PortableTextBlock[]} />
          )}
        </section>
      </div>
      <ArtworksSection artworks={studio?.media || []} />
      <RelatedSection document={studio} />
    </div>
  );
};

export { StudioPage };
