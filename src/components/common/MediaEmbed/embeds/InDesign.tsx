import React from "react"; // eslint-disable-line no-unused-vars

const InDesign = ({ urlUri }: { urlUri: string }) => {
  return (
    <div
      className="rul-embed-platform issuu"
      style={{ position: "relative", paddingTop: "56.25%" }}
    >
      <iframe
        // allowFullScreen
        allow="fullscreen"
        src={urlUri}
        title={urlUri}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        // ref={() => onReady()}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default InDesign;
