/** Resolve a public-folder path for dev and GitHub Pages base URLs. */
export function assetUrl(path) {
  const clean = path.replace(/^\//, '');
  const encoded = clean
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${import.meta.env.BASE_URL}${encoded}`;
}
