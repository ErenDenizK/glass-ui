/**
 * Resolve a public asset path against the deployment base URL.
 *
 * Root-absolute paths ('/backgrounds/field.png') break on GitHub project Pages,
 * which serve the site from '/<repo-name>/'. Vite exposes the configured base
 * as import.meta.env.BASE_URL, so every public asset goes through here.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
