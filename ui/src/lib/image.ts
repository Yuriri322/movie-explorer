const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getImageUrl(
  path: string | null | undefined,
  size: "w200" | "w300" | "w500" | "original" = "w500",
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
