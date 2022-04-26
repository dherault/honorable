// Turn #fff into #ffffff
function extendColorHex(colorHexWithoutPound: string) {
  return colorHexWithoutPound[0] + colorHexWithoutPound[0] + colorHexWithoutPound[1] + colorHexWithoutPound[1] + colorHexWithoutPound[2] + colorHexWithoutPound[2]
}

export default extendColorHex
