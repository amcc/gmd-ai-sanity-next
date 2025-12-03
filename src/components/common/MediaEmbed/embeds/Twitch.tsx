import React from "react"; // eslint-disable-line no-unused-vars
import ReactPlayer from "react-player";

// For Platform options see:
// https://www.npmjs.com/package/react-player

const Twitch = ({ urlUri }: { urlUri: string }) => {
  return (
    <div
      className="rul-embed-platform twitch"
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
    >
      <ReactPlayer
        url={urlUri}
        config={{
          twitch: {
            options: {},
          },
        }}
        controls
        playing={false}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        // onReady={onReady}
      />
    </div>
  );
};

export default Twitch;
