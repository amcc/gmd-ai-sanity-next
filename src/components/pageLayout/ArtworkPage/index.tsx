/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockContent } from "@/components/common/BlockContent";
import { PortableTextBlock } from "@portabletext/react";
import { MainImage } from "@/components/common/MainImage";
import { ArtworksSection } from "@/components/common/ArtworksSection";
import { RelatedSection } from "@/components/common/RelatedSection";
import styles from "./Artwork.module.css";

interface ArtworkPageProps {
  artwork: any;
}

const ArtworkPage = ({ artwork }: ArtworkPageProps) => {
  if (!artwork) return null;

  const date = artwork.artworkDate
    ? new Date(artwork.artworkDate).getFullYear()
    : null;

  const width = artwork.dimensions ? artwork.dimensions.width || null : null;
  const depth = artwork.dimensions ? artwork.dimensions.depth || null : null;
  const height = artwork.dimensions ? artwork.dimensions.height || null : null;
  const units = artwork.dimensions ? artwork.dimensions.units || null : null;

  const dims = width || depth || height ? true : null;

  return (
    <div className={`${styles.artworkPage} padded-page`}>
      {artwork?.mainImage && <MainImage image={artwork.mainImage} />}
      <div className={styles.artInfoContainer}>
        <section className={"body-section"}>
          <h1>{artwork.title}</h1>
          <section className={styles.details}>
            {date && <div className={styles.date}>{date}</div>}
            <div className={styles.material}>{artwork.material}</div>
            <div className={styles.dimensions}>
              {width && (
                <>
                  {width}
                  {units}
                </>
              )}
              {depth && (
                <>
                  {" x "}
                  {depth}
                  {units}
                </>
              )}
              {height && (
                <>
                  {" x "}
                  {height}
                  {units}
                </>
              )}
              {dims && (
                <>
                  {" "}
                  ({width && <>w</>}
                  {depth && <> x d</>}
                  {height && <> x h</>})
                </>
              )}
            </div>
            {artwork.links && artwork.links?.length > 0 && (
              <div className={styles.links}>
                {artwork.links.map((link: any, index: number) => (
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

            {artwork.downloads && artwork.downloads.length > 0 && (
              <>
                <h3>Downloads</h3>
                {artwork.downloads.map((download: any, index: number) => (
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
          {artwork?.description && (
            <BlockContent blocks={artwork.description as PortableTextBlock[]} />
          )}
        </section>
        {/* <section className={styles.empty}></section> */}
      </div>
      <ArtworksSection artworks={artwork?.artworks || []} />
      <RelatedSection document={artwork} />
    </div>
  );
};

export { ArtworkPage };
