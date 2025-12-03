import React from "react";
import dynamic from "next/dynamic";

import styles from "./Youtube.module.css";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const Youtube = ({
  url,
  autoplay,
}: {
  url: string;
  autoplay: boolean | undefined;
}) => {
  const ar = url.includes("://www.youtube.com/shorts") ? 9 / 16 : 16 / 9;

  const width = "100%";
  const height = "100%";
  // return null;

  return (
    <div
      className={
        ar !== 16 / 9 ? `${styles.video} ${styles.dynamicAspect}` : styles.video
      }
      style={{
        ...(ar !== 16 / 9 && ({ "--aspect-ratio": ar } as React.CSSProperties)),
      }}
    >
      <ReactPlayer
        // controls={true}
        url={url}
        width={width}
        height={height}
        controls={!autoplay}
        loop={autoplay}
        playing={autoplay}
        muted={autoplay}
      />{" "}
    </div>
  );
};

export { Youtube };
