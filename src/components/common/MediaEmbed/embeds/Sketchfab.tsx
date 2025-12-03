import React from "react"; // eslint-disable-line no-unused-vars

const Sketchfab = ({ urlUri }: { urlUri: string }) => {
  // Check If Shortened URL

  let embeddedModel = false;
  let linkedModel = false;

  if (urlUri.includes("sketchfab.com/3d-models/")) embeddedModel = true;
  if (urlUri.includes("skfb.ly")) linkedModel = true;

  return (
    <>
      {embeddedModel && (
        <div
          className="rul-embed-platform sketchfab sketchfab-embed-wrapper"
          style={{
            position: "relative",
            paddingTop: "50%",
          }}
        >
          <iframe
            title={urlUri}
            src={`${urlUri}/embed?preload=1&amp;ui_controls=0&amp;ui_infos=0&amp;ui_inspector=0&amp;ui_stop=0&amp;ui_watermark=1&amp;ui_watermark_link=0`}
            // frameBorder="0"
            allow="autoplay; fullscreen;"
            // mozallowfullscreen="true"
            // webkitallowfullscreen="true"
            style={{
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
      )}
      {linkedModel && (
        <div className="sketchfab-embed-wrapper">
          <a href={urlUri} target="_blank" rel="noreferrer">
            Link to SketchFab Model Viewer
          </a>
        </div>
      )}
    </>
  );
};

export default Sketchfab;
