/**
 * Extracts and trims meta description from Sanity block content
 * @param descriptionBlocks Array of Sanity block objects
 * @param maxLength Maximum length for meta description
 * @param fallback Fallback description if none found
 * @returns Meta description
 */
export function getMetaDescription(
  descriptionBlocks: unknown[],
  maxLength: number = 160,
  fallback: string = "Visual creativity means that you design, draw, iterate and test using visual means."
): string {
  let allText = "";
  if (Array.isArray(descriptionBlocks)) {
    for (const block of descriptionBlocks) {
      if (
        typeof block === "object" &&
        block !== null &&
        "_type" in block &&
        (block as { _type: string })._type === "block" &&
        "children" in block &&
        Array.isArray((block as { children: unknown[] }).children)
      ) {
        const children = (block as { children: unknown[] }).children;
        for (const child of children) {
          if (
            typeof child === "object" &&
            child !== null &&
            "text" in child &&
            typeof (child as { text: unknown }).text === "string" &&
            (child as { text: string }).text.trim().length > 0
          ) {
            allText += (child as { text: string }).text.trim() + " ";
          }
        }
      }
    }
  }
  allText = allText.trim();
  if (allText.length > 0) {
    if (allText.length > maxLength) {
      const trimmed = allText.slice(0, maxLength);
      const lastSpace = trimmed.lastIndexOf(" ");
      return (
        (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed).trim() + "..."
      );
    } else {
      return allText;
    }
  }
  return fallback;
}

import util from "util";

export function log(...args: unknown[]): void {
  args.map((arg) =>
    console.log(
      util.inspect(arg, { showHidden: false, depth: null, colors: true })
    )
  );
}

/**
 * Format a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date or empty string
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date or empty string
 */
export const dateYear = (dateString: string | null): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
  });
};

/**
 * Format a date range from start and end dates
 * @param startDate ISO start date string
 * @param endDate ISO end date string
 * @returns Formatted date range
 */
export const formatDateRange = (
  startDate: string | null,
  endDate: string | null
): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start && end) {
    return `${start} – ${end}`;
  } else if (start) {
    return `${start}`;
  }
  return "";
};

export const exhibitionsTitle = (
  current: unknown[],
  upcoming: unknown[]
): string | null => {
  if (current && current?.length > 0 && upcoming?.length === 0) {
    return "Current Exhibitions";
  }
  if (upcoming && upcoming?.length > 0 && current?.length === 0) {
    return "Upcoming Exhibitions";
  }
  if (upcoming?.length === 0 && current?.length === 0) {
    return null;
  }
  return "Current and Upcoming Exhibitions";
};
