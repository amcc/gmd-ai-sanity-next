import React from "react"; // eslint-disable-line no-unused-vars
import ReactPlayer from "react-player";

// For Platform options see:
// https://www.npmjs.com/package/react-player

const Facebook = ({ urlUri }: { urlUri: string }) => {
  return (
    <div className="rul-embed-platform facebook">
      <ReactPlayer
        url={urlUri}
        config={{
          facebook: {
            // appId: '12345'
          },
        }}
        controls
        playing={false}
        width="100%"
        height="auto"
        // onReady={onReady}
      />
    </div>
  );
};

export default Facebook;
