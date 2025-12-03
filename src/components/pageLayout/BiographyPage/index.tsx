import { BIOGRAPHY_QUERYResult } from "@/sanity/types";
import { formatDateRange } from "@/utils/common";
import { BlockContent } from "@/components/common/BlockContent";
import { PortableTextBlock } from "@portabletext/react";
import { ArtworksSection } from "@/components/common/ArtworksSection";
import { MainImage } from "@/components/common/MainImage";
import { RelatedSection } from "@/components/common/RelatedSection";
import styles from "./Artwork.module.css";

interface BiographyPageProps {
  biography: BIOGRAPHY_QUERYResult;
}

const BiographyPage = ({ biography }: BiographyPageProps) => {
  if (!biography) return null;

  const biographyDate = formatDateRange(biography.startDate, biography.endDate);

  return (
    <div className={`${styles.artworkPage} padded-page`}>
      {biography?.mainImage && <MainImage image={biography.mainImage} />}
      <div className={styles.artInfoContainer}>
        <section className={"body-section"}>
          <h1>{biography.title}</h1>
          <section className={styles.details}>
            {biographyDate && (
              <div className={styles.date}>{biographyDate}</div>
            )}

            {/* <div className={styles.material}>{artwork.material}</div>
             */}
            {biography.address && (
              <div className={styles.address}>
                {biography.address.name && <div>{biography.address.name}</div>}
                {biography.address.street && (
                  <div>{biography.address.street}</div>
                )}
                {biography.address.city && <div>{biography.address.city}</div>}
                {biography.address.postcode && (
                  <div>{biography.address.postcode}</div>
                )}
                {biography.address.country && (
                  <div>{biography.address.country}</div>
                )}
              </div>
            )}
            {biography.links && biography.links?.length > 0 && (
              <div className={styles.links}>
                {biography.links.map((link, index) => (
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
            {biography.downloads && biography.downloads.length > 0 && (
              <>
                <h3>Downloads</h3>
                {biography.downloads.map((download, index) => (
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
          {biography?.description && (
            <BlockContent
              blocks={biography.description as PortableTextBlock[]}
            />
          )}
        </section>
      </div>
      <ArtworksSection artworks={biography?.artworks || []} />
      <RelatedSection document={biography} />
    </div>
  );
};

export { BiographyPage };
