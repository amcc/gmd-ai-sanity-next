import React from "react"; // eslint-disable-line no-unused-vars

const Spotify = ({ urlUri }: { urlUri: string }) => {
  // TRACK
  // https://open.spotify.com/track/2EqlS6tkEnglzr7tkKAAYD
  // <iframe src="https://open.spotify.com/embed/track/2EqlS6tkEnglzr7tkKAAYD" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  // spotify:track:2EqlS6tkEnglzr7tkKAAYD

  // ALBUM
  // https://open.spotify.com/album/4RuzGKLG99XctuBMBkFFOC
  // <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  // spotify:album:1DFixLWuPkv3KT3TnV35m3

  // PODCAST SHOW
  // https://open.spotify.com/show/1amnggjPO42W9l9R5xXodQ?si=gNbcAWmBRXiBCKbwnqKuOg
  // <iframe src="https://open.spotify.com/embed-podcast/show/3vikAuFxKVNe2GBZC61IYD" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  // spotify:show:3vikAuFxKVNe2GBZC61IYD

  // PODCAST EPISODE
  // https://open.spotify.com/episode/7ID7aPKQWy5sKWBAviIwMD?si=-cchsVEwQYeuK4garVATEw
  // <iframe src="https://open.spotify.com/embed-podcast/episode/5shxpdGkCaERVmZSjpbfbk" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  // spotify:episode:5shxpdGkCaERVmZSjpbfbk

  // PLAYLIST
  // https://open.spotify.com/playlist/3ALgoNp8qNdvGq6kVC2n9x?si=OEAayxJbS92Y_Y7tutNvOg
  // <iframe src="https://open.spotify.com/embed/playlist/3ALgoNp8qNdvGq6kVC2n9x" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  // spotify:playlist:3ALgoNp8qNdvGq6kVC2n9x

  let srcUrl = "";

  /******/
  // URI
  /******/
  // Track
  if (urlUri.includes("spotify:track")) {
    const id = urlUri.split(":").slice(-1)[0];
    srcUrl = `https://open.spotify.com/embed/track/${id}`;
  }

  // Album
  if (urlUri.includes("spotify:album")) {
    const id = urlUri.split(":").slice(-1)[0];
    srcUrl = `https://open.spotify.com/embed/album/${id}`;
  }

  // Podcast Show
  if (urlUri.includes("spotify:show")) {
    const id = urlUri.split(":").slice(-1)[0];
    srcUrl = `https://open.spotify.com/embed-podcast/show/${id}`;
  }

  // Podcast Episode
  if (urlUri.includes("spotify:episode")) {
    const id = urlUri.split(":").slice(-1)[0];
    srcUrl = `https://open.spotify.com/embed-podcast/episode/${id}`;
  }

  // Playlist
  if (urlUri.includes("spotify:playlist")) {
    const id = urlUri.split(":").slice(-1)[0];
    srcUrl = `https://open.spotify.com/embed/playlist/${id}`;
  }

  /******/
  // URL
  /******/
  // Track
  if (urlUri.includes("https://open.spotify.com/track/")) {
    srcUrl = urlUri.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed/"
    );
  }

  // Album
  if (urlUri.includes("https://open.spotify.com/album/")) {
    srcUrl = urlUri.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed/"
    );
  }

  // Podcast Show
  if (urlUri.includes("https://open.spotify.com/show/")) {
    srcUrl = urlUri.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed-podcast/"
    );
  }

  // Podcast Episode
  if (urlUri.includes("https://open.spotify.com/episode/")) {
    srcUrl = urlUri.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed-podcast/"
    );
  }

  // Playlist
  if (urlUri.includes("https://open.spotify.com/playlist/")) {
    srcUrl = urlUri.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed/"
    );
  }

  return (
    <div className="rul-embed-platform spotify" style={{ width: "100%" }}>
      <iframe
        src={srcUrl}
        width="100%"
        height="300px"
        // frameBorder="0"
        // allowtransparency="true"
        allow="encrypted-media"
        title={`${srcUrl}&view=coverart`}
        // ref={() => onReady()}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default Spotify;
