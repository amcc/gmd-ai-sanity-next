import { SanityImage } from "../SanityImage";

// A convenience component that automatically uses DPR detection
export const HighDPISanityImage = (
  props: Parameters<typeof SanityImage>[0]
) => {
  return <SanityImage {...props} />;
};

export default HighDPISanityImage;
