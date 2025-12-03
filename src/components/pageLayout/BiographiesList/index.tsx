import { BIOGRAPHIES_QUERYResult } from "@/sanity/types";
import { BiographyTypeList } from "./BiographyTypeList";

interface BiographiesListProps {
  biographies: BIOGRAPHIES_QUERYResult;
}

const BiographiesList = ({ biographies }: BiographiesListProps) => {
  const exhibitions = biographies.filter(
    (bio) => bio.type === "solo" || bio.type === "group"
  );
  //   const solo = biographies.filter((bio) => bio.type === "solo");
  //   const group = biographies.filter((bio) => bio.type === "group");
  const talks = biographies.filter((bio) => bio.type === "talk");
  const education = biographies.filter((bio) => bio.type === "education");
  const publications = biographies.filter((bio) => bio.type === "publication");
  const collections = biographies.filter((bio) => bio.type === "collection");
  const residencies = biographies.filter((bio) => bio.type === "residency");
  const press = biographies.filter((bio) => bio.type === "press");

  const current = biographies.filter(
    (bio) =>
      (bio.type === "solo" || bio.type === "group") &&
      bio.startDate &&
      bio.endDate &&
      new Date(bio.startDate) <= new Date() &&
      new Date(bio.endDate) >= new Date()
  );

  const upcoming = biographies.filter(
    (bio) =>
      (bio.type === "solo" || bio.type === "group") &&
      bio.startDate &&
      new Date(bio.startDate) > new Date()
  );

  if (!biographies || biographies.length === 0) {
    return null;
  }

  return (
    <div>
      <BiographyTypeList biographies={current} type={"current"} />
      <BiographyTypeList biographies={upcoming} type={"upcoming"} />
      <BiographyTypeList biographies={exhibitions} type="exhibitions" />
      <BiographyTypeList biographies={talks} type="talks" />
      <BiographyTypeList biographies={publications} type="publications" />
      <BiographyTypeList biographies={residencies} type="residencies" />
      <BiographyTypeList biographies={press} type="press" />
      <BiographyTypeList biographies={collections} type="collections" />
      <BiographyTypeList biographies={education} type="education" />
    </div>
  );
};
export { BiographiesList };
