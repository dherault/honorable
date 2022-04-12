function transparencify(colorHex: string, value: number = 50) {
  if (!(typeof colorHex === 'string' && typeof value === 'number' && colorHex.startsWith('#'))) return colorHex

  const value16 = Math.round((1 - value / 100) * 255)

  return colorHex + value16.toString(16).padStart(2, '0')
}

export default transparencify
