/**
 * @file contrast.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Constrast ratio calculator for WCAG 2.
 *
 * @description
 * Constrast ratio calculator for WCAG 2.1 compliance, supporting hex and rgba colour formats.
 *
 * @since 24/05/2026
 * @updated 27/05/2026
 */
// ---------- INTERFACE
/**
 * WCAG 2.1 contrast ratio utility.
 *
 * Supports:
 *  - Hex colours: #RGB, #RRGGBB (case-insensitive)
 *  - rgba strings: rgba(r, g, b, a)
 *
 * For rgba colours with alpha < 1, the foreground is blended onto the
 * background before computing luminance (standard alpha compositing).
 */
interface Rgb {
  r: number
  g: number
  b: number
}

// ---------- FUNCTIONS
/**
 * Parse a hex colour string (#RGB or #RRGGBB) into an {r, g, b} object
 * with channel values in [0, 255].
 */
function parseHex(hex: string): Rgb {
  const clean = hex.replace(/^#/, '')

  let r: number
  let g: number
  let b: number

  if (clean.length === 3) {
    const r1 = clean[0] ?? '0'
    const g1 = clean[1] ?? '0'
    const b1 = clean[2] ?? '0'
    r = parseInt(r1 + r1, 16)
    g = parseInt(g1 + g1, 16)
    b = parseInt(b1 + b1, 16)
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16)
    g = parseInt(clean.slice(2, 4), 16)
    b = parseInt(clean.slice(4, 6), 16)
  } else {
    throw new Error(`Invalid hex colour: ${hex}`)
  }

  return { r, g, b }
}

/**
 * Parse an rgba(r, g, b, a) string.
 * Returns {r, g, b} in [0, 255] and alpha in [0, 1].
 */
function parseRgba(rgba: string): Rgb & { a: number } {
  const match = rgba.match(
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/i
  )
  if (!match) {
    throw new Error(`Invalid rgba colour: ${rgba}`)
  }
  return {
    r: parseFloat(match[1] ?? '0'),
    g: parseFloat(match[2] ?? '0'),
    b: parseFloat(match[3] ?? '0'),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  }
}

/**
 * Parse any supported colour string into {r, g, b} in [0, 255].
 * rgba colours are returned with their alpha value; hex colours get alpha = 1.
 */
function parseColour(colour: string): Rgb & { a: number } {
  const trimmed = colour.trim()
  if (trimmed.startsWith('#')) {
    return { ...parseHex(trimmed), a: 1 }
  }
  if (/^rgba?\(/i.test(trimmed)) {
    return parseRgba(trimmed)
  }
  throw new Error(`Unsupported colour format: ${colour}`)
}

/**
 * Alpha-composite a foreground colour over a background colour.
 * Uses the standard "over" compositing formula:
 *   out = fg * alpha + bg * (1 - alpha)
 */
function blendOver(fg: Rgb, alpha: number, bg: Rgb): Rgb {
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
  }
}

/**
 * Convert a single 8-bit channel value to its linearised sRGB component,
 * as specified by WCAG 2.1 / IEC 61966-2-1.
 */
function linearise(channel: number): number {
  const sRGB = channel / 255
  return sRGB <= 0.04045 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
}

/**
 * Compute the relative luminance of an RGB colour (WCAG 2.1 definition).
 * Result is in [0, 1] where 0 = black and 1 = white.
 */
function relativeLuminance(rgb: Rgb): number {
  return 0.2126 * linearise(rgb.r) + 0.7152 * linearise(rgb.g) + 0.0722 * linearise(rgb.b)
}

// ---------- API
/**
 * Compute the WCAG 2.1 contrast ratio between a foreground and background colour.
 *
 * Both colours may be hex strings (`#0A0A0F`) or rgba strings
 * (`rgba(0, 212, 255, 0.15)`).  When the foreground has alpha < 1 it is
 * blended onto the background before the ratio is calculated.
 *
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter luminance and L2 is the darker luminance.
 *
 * @returns Contrast ratio ≥ 1.0 (1:1 = no contrast, 21:1 = maximum contrast)
 */
export function getContrastRatio(fg: string, bg: string): number {
  const bgParsed = parseColour(bg)
  const fgParsed = parseColour(fg)

  // Resolve the background to a fully-opaque RGB colour by blending it over white if necessary
  const bgRgb: Rgb =
    bgParsed.a < 1 ? blendOver(bgParsed, bgParsed.a, { r: 255, g: 255, b: 255 }) : bgParsed

  // Blend semi-transparent foreground over the resolved background
  const fgRgb: Rgb = fgParsed.a < 1 ? blendOver(fgParsed, fgParsed.a, bgRgb) : fgParsed
  const L1 = relativeLuminance(fgRgb)
  const L2 = relativeLuminance(bgRgb)

  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)

  return (lighter + 0.05) / (darker + 0.05)
}
