import { useEffect, useState } from "react";

// type Breakpoints =
//   | "largeMobile"
//   | "tablet"
//   | "desktop"
//   | "widescreen"
//   | { customMediaQuery: string };

// // Convert breakpoints to actual CSS media query string
// export const getMediaQuery = (breakpoint: Breakpoints): string => {
//   if (typeof breakpoint === "string") {
//     switch (breakpoint) {
//       case "largeMobile":
//         return `(min-width: ${useLargeMobileSize()})`;
//       case "tablet":
//         return `(min-width: ${useTabletSize()})`;
//       case "desktop":
//         return `(min-width: ${useDesktopSize()})`;
//       case "widescreen":
//         return `(min-width: ${useWidescreenSize()})`;
//       default:
//         throw new Error(`Unknown breakpoint: ${breakpoint}`);
//     }
//   } else {
//     return breakpoint.customMediaQuery;
//   }
// };

// export const useMediaQueryMatch = (breakpoint: Breakpoints): boolean => {
//   const [isMediaMatch, setIsMediaMatch] = useState<boolean>(
//     () =>
//       typeof window !== "undefined" &&
//       window.matchMedia(getMediaQuery(breakpoint)).matches
//   );

//   useEffect(() => {
//     if (typeof window === "undefined") {
//       return;
//     }
//     const mediaQueryList = window.matchMedia(getMediaQuery(breakpoint));
//     const handleMediaQueryChange = (e: MediaQueryListEvent): void => {
//       setIsMediaMatch(e.matches);
//     };

//     setIsMediaMatch(mediaQueryList.matches);

//     mediaQueryList.addEventListener("change", handleMediaQueryChange);
//     return () => {
//       mediaQueryList.removeEventListener("change", handleMediaQueryChange);
//     };
//   }, [breakpoint]);

//   return isMediaMatch;
// };

export const useLargeMobileSize = (): string => {
  const [largeMobileSize, setLargeMobileSize] = useState<string>("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const size = rootStyle.getPropertyValue("--large-mobile-size").trim();
    setLargeMobileSize(size);
  }, []);

  return largeMobileSize;
};
export const useTabletSize = (): string => {
  const [tabletSize, setTabletSize] = useState<string>("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const size = rootStyle.getPropertyValue("--tablet-size").trim();
    setTabletSize(size);
  }, []);

  return tabletSize;
};
export const useDesktopSize = (): string => {
  const [desktopSize, setDesktopSize] = useState<string>("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const size = rootStyle.getPropertyValue("--desktop-size").trim();
    setDesktopSize(size);
  }, []);

  return desktopSize;
};

export const useWidescreenSize = (): string => {
  const [widescreenSize, setWidescreenSize] = useState<string>("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const size = rootStyle.getPropertyValue("--widescreen-size").trim();
    setWidescreenSize(size);
  }, []);

  return widescreenSize;
};
