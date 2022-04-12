// Lighten a hex color by a given amount
export function lighten(colorHex: string, value = 25) {
  if (!(typeof colorHex === 'string' && typeof value === 'number' && colorHex.startsWith('#'))) return colorHex

  const value16 = Math.round(value / 100 * 255)

  colorHex = colorHex.slice(1)

  const num = parseInt(colorHex, 16)

  let r = (num >> 16) + value16

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + value16

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + value16

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`
}

export const darken = (colorHex: string, amount = 12) => lighten(colorHex, -amount)
