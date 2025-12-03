import React from "react"; // eslint-disable-line no-unused-vars

const Issuu = ({ urlUri }: { urlUri: string }) => {
  const urlParts = urlUri.split("/");
  const docsIndex = urlParts.indexOf("docs");
  const userName = urlParts[docsIndex - 1];
  const docName = urlParts[docsIndex + 1];

  return (
    <div className="rul-embed-platform issuu">
      <iframe
        allowFullScreen
        allow="fullscreen"
        src={`//e.issuu.com/embed.html?d=${docName}&u=${userName}`}
        title={urlUri}
        style={{
          border: "0",
          width: "100%",
          height: "675px",
        }}
        // onLoad={onReady}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default Issuu;
