import type { Metadata } from "next";

/**
 * Build per-route metadata for a (mostly client-rendered) page.
 *
 * Client components cannot export `metadata`, so each route adds a tiny server
 * `layout.tsx` that calls `pageMeta(...)`. Titles are written absolute (they
 * already carry the program/college branding) so they are not run through the
 * root title template.
 */
export function pageMeta(
  title: string,
  description: string,
  extra?: Partial<Metadata>,
): Metadata {
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    ...extra,
  };
}
