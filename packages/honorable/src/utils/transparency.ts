import extendColorHex from './extendColorHex'

// Add transparency to a hex color by a given amount
function transparency(colorHex: string, value = 50) {
  if (!(typeof colorHex === 'string' && typeof value === 'number' && colorHex.startsWith('#'))) return colorHex

  let transparency = 0
  let colorHexWithoutPound = colorHex.slice(1)

  // Handle short hex
  if (colorHexWithoutPound.length === 3) colorHexWithoutPound = extendColorHex(colorHexWithoutPound)
  // Handle transparency hex
  else if (colorHexWithoutPound.length === 8) {
    transparency = parseInt(colorHexWithoutPound.slice(-2), 16)
    colorHexWithoutPound = colorHexWithoutPound.slice(0, 6)
  }
  // Handle invalid hex
  else if (colorHexWithoutPound.length !== 6) return colorHex

  const value16 = Math.max(0, Math.min(255, Math.round((1 - value / 100) * 255 - transparency)))

  return `#${colorHexWithoutPound}${value16.toString(16).padStart(2, '0')}`
}

export default transparency
