export function getPosterUrl(poster?: string | null) {
  if (!poster) return "/no-image.png";

  // اگر کامل URL بود
  if (poster.startsWith("http")) return poster;

  // TMDB حالت پیش‌فرض
  return `https://image.tmdb.org/t/p/w200${poster}`;
}