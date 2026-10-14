/**
 * Dev-mode detection that is safe in every target.
 *
 * The build used to replace `process.env.NODE_ENV` with a literal `'production'`
 * at bundle time. That fixed a real `ReferenceError: process is not defined`
 * on CDN / native-ESM consumers, but it also turned every
 * `if (process.env.NODE_ENV === 'development')` branch into `if (false)` — so
 * the dev warnings the README advertises were stripped from every shipped
 * build and could never fire.
 *
 * Guarding at runtime instead keeps both properties: no bare `process`
 * reference is evaluated where it does not exist, and the warnings survive
 * into the bundle for bundlers that do define it.
 */
export function isDevEnvironment(): boolean {
  try {
    if (typeof process === 'undefined') return false
    const env = process.env?.NODE_ENV
    return env !== 'production' && env !== undefined
  } catch {
    return false
  }
}
