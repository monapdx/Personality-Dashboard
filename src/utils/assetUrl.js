/** Resolve a public-folder path for dev and GitHub Pages base URLs. */
export function assetUrl(path) {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
