import { IBM_Plex_Sans } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Source_Serif_4 } from "next/font/google";

export const ibm_plex_sans_init = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "600"],
  style: ["normal", "italic"],
});

export const ibm_plex_mono_init = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["100", "200", "300", "400", "600"],
  style: ["normal", "italic"],
});

export const noto_sans_init = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "600"],
  style: ["normal", "italic"],
});

export const source_serif_init = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const ibm_plex_sans = ibm_plex_sans_init.variable;
export const ibm_plex_mono = ibm_plex_mono_init.variable;
export const noto_sans = noto_sans_init.variable;
export const source_serif = source_serif_init.variable;
