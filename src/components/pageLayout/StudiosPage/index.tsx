import { ImageGrid } from "@/components/common/ImageGrid";
import { STUDIOS_QUERYResult } from "@/sanity/types";

interface StudiosPageProps {
  studios: STUDIOS_QUERYResult;
}

const StudiosPage = ({ studios }: StudiosPageProps) => {
  return (
    <div>
      <ImageGrid itemType="studio" studios={studios} />
    </div>
  );
};

export { StudiosPage };
