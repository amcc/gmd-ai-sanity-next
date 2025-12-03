import React from "react"; // eslint-disable-line no-unused-vars
import ReactPlayer from "react-player";

// For Platform options see:
// https://www.npmjs.com/package/react-player

const Streamable = ({ urlUri }: { urlUri: string }) => {
  return (
    <div
      className="rul-embed-platform streamable"
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
    >
      <ReactPlayer
        url={urlUri}
        config={{}}
        controls
        playing={false}
        width="100%"
        height="100%"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        // onReady={onReady}
      />
    </div>
  );
};

export default Streamable;
