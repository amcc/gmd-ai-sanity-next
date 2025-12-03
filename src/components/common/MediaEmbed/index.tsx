"use client-only";

import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import * as styles from "./MediaEmbed.module.scss";

// import Instagram from "./embeds/Instagram"
import Issuu from "./embeds/Issuu";
import Spotify from "./embeds/Spotify";
import Sketchfab from "./embeds/Sketchfab";
import { Youtube } from "./embeds/Youtube";
// import Facebook from "./embeds/Facebook"
import Twitch from "./embeds/Twitch";
import SoundCloud from "./embeds/SoundCloud";
// import Streamable from "./embeds/Streamable"
import { Vimeo } from "./embeds/Vimeo";
// import Wistia from "./embeds/Wistia"
// import DailyMotion from "./embeds/DailyMotion"
// import Sirv from "./embeds/Sirv"
// import ShapeDiver from "./embeds/ShapeDiver"
import InDesign from "./embeds/InDesign";

//https://helpx.adobe.com/uk/indesign/how-to/self-publishing-online.html

// import { Giphy } from "./embeds/Giphy";
import { Code } from "./embeds/Code";
import styles from "./MediaEmbed.module.css";
// import { Modelviewer } from "./embeds/Modelviewer";

const SERVICES = {
  INDESIGN: "indesign",
  INSTAGRAM: "instagram",
  ISSUU: "issuu",
  SPOTIFY: "spotify",
  SKETCHFAB: "sketchfab",
  YOUTUBE: "youtube",
  FACEBOOK: "facebook",
  TWITCH: "twitch",
  SOUNDCLOUD: "soundcloud",
  STREAMABLE: "streamable",
  VIMEO: "vimeo",
  WISTIA: "wistia",
  DAILYMOTION: "dailymotion",
  SIRV: "sirv",
  SHAPEDIVER: "shapediver",
  // GIPHY: "giphy",
  MEDIAGIPHY: "mediagiphy",
  MODELVIEWER: "modelviewer",
  CODE: "code",
  NOT_SUPPORTED: "Not Supported",
};

const MediaEmbed = ({
  mediaUrl,
  // width,
  // height,
  autoplay = false,
}: {
  mediaUrl: string;
  // width?: number | null;
  // height?: number | null;
  autoplay?: boolean | undefined;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // const mediaWidth = width ? width : null;
  // const mediaHeight = height ? height : null;

  /* InDesign */
  // https://indd.adobe.com/view/d0be3831-b056-4732-998c-20321c900c5e

  /* Instagram */
  // https://www.instagram.com/p
  // ://instagr.am/p
  // https://www.instagram.com/tv/CAakzJTgyvz/?utm_source=ig_web_button_share_sheet

  /* Issuu */
  // https://issuu.com/sweetpaulmagazine/docs/spm_su19_digital
  // https://issuu.com/sheilalawson/docs/1_reception_layout_34/s/10623336
  // issuu.com/sheilalawson/docs/1_reception_layout_34?fr=sNGRjOTE1MDA1NDU

  // <iframe allowfullscreen allow="fullscreen" style="border:none;width:100%;height:326px;" src="//e.issuu.com/embed.html?d=1_reception_layout_34&u=sheilalawson"></iframe>

  /* Spotify */
  // Track
  // https://open.spotify.com/track/2EqlS6tkEnglzr7tkKAAYD
  // spotify:track:2EqlS6tkEnglzr7tkKAAYD

  // ALBUM
  // https://open.spotify.com/album/4RuzGKLG99XctuBMBkFFOC
  // spotify:album:1DFixLWuPkv3KT3TnV35m3

  // PODCAST SHOW
  // https://open.spotify.com/show/1amnggjPO42W9l9R5xXodQ?si=gNbcAWmBRXiBCKbwnqKuOg
  // spotify:show:3vikAuFxKVNe2GBZC61IYD

  // PODCAST EPISODE
  // https://open.spotify.com/episode/7ID7aPKQWy5sKWBAviIwMD?si=-cchsVEwQYeuK4garVATEw
  // spotify:episode:5shxpdGkCaERVmZSjpbfbk

  // PLAYLIST
  // https://open.spotify.com/playlist/3ALgoNp8qNdvGq6kVC2n9x?si=OEAayxJbS92Y_Y7tutNvOg
  // spotify:playlist:3ALgoNp8qNdvGq6kVC2n9x

  /* Sketchfab */
  // https://sketchfab.com/3d-models/chair-eames-shell-replica-001-14ebab7928ba4299942f041375dd85c5
  // https://skfb.ly/6R8QV

  /* Youtube */
  // https://youtu.be/xNk7fAqYLiw

  /* Facebook */
  // https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/

  /* Twitch */
  // https://www.twitch.tv/videos/106400740

  /* Sound Cloud */
  // https://soundcloud.com/miami-nights-1984/accelerated

  /* Streamable */
  // https://streamable.com/ifjh

  /* Vimeo */
  // https://vimeo.com/90509568

  /* Wistia */
  // https://home.wistia.com/medias/e4a27b971d

  /* Daily Motion */
  // https://www.dailymotion.com/video/x5e9eog

  /* Giphy */
  // https://giphy.com/embed/OCX5xBU11mV6jGGnac

  const service = useMemo(() => {
    // InDesign
    if (mediaUrl.includes("://indd.adobe.com/view/")) return SERVICES.INDESIGN;

    // Instagram
    // if (
    //   mediaUrl.includes("://www.instagram.com/p") ||
    //   mediaUrl.includes("://instagr.am/p") ||
    //   mediaUrl.includes("://www.instagram.com/tv") ||
    //   mediaUrl.includes("://instagr.am.com/tv")
    // )
    //   return SERVICES.INSTAGRAM

    // Issuu
    if (
      mediaUrl.includes("://issuu.com/") ||
      mediaUrl.includes("://amp.issuu.com")
    )
      return SERVICES.ISSUU;

    // Spotify
    if (
      mediaUrl.includes("://open.spotify.com/track/") ||
      mediaUrl.includes("spotify:track:") ||
      mediaUrl.includes("://open.spotify.com/album/") ||
      mediaUrl.includes("spotify:album:") ||
      mediaUrl.includes("://open.spotify.com/show/") ||
      mediaUrl.includes("spotify:show:") ||
      mediaUrl.includes("://open.spotify.com/episode/") ||
      mediaUrl.includes("spotify:episode:") ||
      mediaUrl.includes("://open.spotify.com/playlist/") ||
      mediaUrl.includes("spotify:playlist:")
    )
      return SERVICES.SPOTIFY;

    // Sketchfab
    if (
      mediaUrl.includes("sketchfab.com/3d-models/") ||
      mediaUrl.includes("skfb.ly")
    )
      return SERVICES.SKETCHFAB;

    // Youtube
    if (
      mediaUrl.includes("://www.youtube.com/watch") ||
      mediaUrl.includes("://www.youtube.com/playlist") ||
      mediaUrl.includes("://www.youtube.com/shorts") ||
      mediaUrl.includes("://youtu.be") ||
      mediaUrl.includes("://www.youtube.com/embed/live_stream") ||
      (mediaUrl.includes("youtube.com/user/") && mediaUrl.includes("/live"))
    )
      return SERVICES.YOUTUBE;

    // Facebook
    // if (
    //   mediaUrl.includes("://www.facebook.com/") &&
    //   mediaUrl.includes("/videos/")
    // )
    //   return SERVICES.FACEBOOK

    // Twitch
    if (mediaUrl.includes("://www.twitch.tv/")) return SERVICES.TWITCH;

    // Sound Cloud
    if (mediaUrl.includes("://soundcloud.com/")) return SERVICES.SOUNDCLOUD;

    // Streamable
    // if (mediaUrl.includes("://streamable.com/")) return SERVICES.STREAMABLE

    // Vimeo
    if (mediaUrl.includes("://vimeo.com/")) return SERVICES.VIMEO;

    // Wistia
    // if (
    //   mediaUrl.includes(".wistia.com/medias/") ||
    //   (mediaUrl.includes(".wistia") && mediaUrl.includes("/embed/iframe/"))
    // )
    //   return SERVICES.WISTIA

    // Daily Motion
    // if (mediaUrl.includes("://www.dailymotion.com/video/"))
    //   return SERVICES.DAILYMOTION

    // Sirv
    if (mediaUrl.includes(".sirv.com/")) return SERVICES.SIRV;

    // ShapeDiver
    //   if (mediaUrl.includes("://viewer.shapediver.com/"))
    //     return SERVICES.SHAPEDIVER

    // CODE IFRAME
    if (mediaUrl.includes("://editor.p5js.org/")) return SERVICES.CODE;

    // GIPHY url
    // if (mediaUrl.includes("://giphy.com/") || mediaUrl.includes("://gph.is"))
    //   return SERVICES.GIPHY;
    // GIPHY IFRAME
    if (mediaUrl.includes("://media.giphy.com/")) return SERVICES.MEDIAGIPHY;

    // modelviewer
    if (mediaUrl.includes(".glb") || mediaUrl.includes(".gltf"))
      return SERVICES.MODELVIEWER;

    return SERVICES.NOT_SUPPORTED;
  }, [mediaUrl]);

  if (!isClient) return null;
  return (
    <div className={styles.mediaEmbed}>
      {service === SERVICES.INDESIGN && <InDesign urlUri={mediaUrl} />}
      {/* {service === SERVICES.INSTAGRAM && <Instagram urlUri={mediaUrl} />} */}
      {service === SERVICES.ISSUU && <Issuu urlUri={mediaUrl} />}
      {service === SERVICES.SPOTIFY && <Spotify urlUri={mediaUrl} />}
      {service === SERVICES.SKETCHFAB && <Sketchfab urlUri={mediaUrl} />}
      {service === SERVICES.YOUTUBE && (
        <Youtube url={mediaUrl} autoplay={autoplay} />
      )}
      {/* {service === SERVICES.FACEBOOK && <Facebook urlUri={mediaUrl} />} */}
      {service === SERVICES.TWITCH && <Twitch urlUri={mediaUrl} />}
      {service === SERVICES.SOUNDCLOUD && <SoundCloud urlUri={mediaUrl} />}
      {/* {service === SERVICES.STREAMABLE && <Streamable urlUri={mediaUrl} />} */}
      {service === SERVICES.VIMEO && (
        <Vimeo url={mediaUrl} autoplay={autoplay} />
      )}
      {/* {service === SERVICES.WISTIA && <Wistia urlUri={mediaUrl} />} */}
      {/* {service === SERVICES.DAILYMOTION && <DailyMotion urlUri={mediaUrl} />} */}
      {/* {service === SERVICES.SIRV && <Sirv urlUri={mediaUrl} />} */}
      {/* {service === SERVICES.SHAPEDIVER && <ShapeDiver urlUri={mediaUrl} />} */}
      {/* {service === SERVICES.GIPHY && (
        <Giphy url={mediaUrl} width={mediaWidth} height={mediaHeight} />
      )} */}
      {/* {service === SERVICES.MEDIAGIPHY && <MediaGiphy url={mediaUrl} />} */}
      {service === SERVICES.CODE && <Code url={mediaUrl} />}
      {/* {service === SERVICES.MODELVIEWER && <Modelviewer url={mediaUrl} />} */}
      {service === SERVICES.NOT_SUPPORTED && (
        <div>
          <p>
            <a href={mediaUrl}>{mediaUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
};

MediaEmbed.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
};

export { MediaEmbed };
