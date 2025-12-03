import React from "react"; // eslint-disable-line no-unused-vars
import ReactPlayer from "react-player";

// For Platform options see:
// https://www.npmjs.com/package/react-player

const SoundCloud = ({ urlUri }: { urlUri: string }) => {
  return (
    <div className="rul-embed-platform soundcloud">
      <ReactPlayer
        url={urlUri}
        config={{
          soundcloud: {
            options: {
              autoplay: false,
              color: "#000000",
              sharing: true,
              download: true,
              show_artwork: false,
            },
          },
        }}
        // onReady={onReady}
        controls
        playing={false}
        width="100%"
        height="30%"
      />
    </div>
  );
};

export default SoundCloud;
