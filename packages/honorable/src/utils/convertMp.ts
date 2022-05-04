import {
  HonorableTheme,
  StylesProps,
} from '../types'

import createMediaQuery from './createMediaQuery'

const mpConversion = {
  m: 'margin',
  p: 'padding',
}

const xConversion = {
  '': [''],
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
  t: ['Top'],
  b: ['Bottom'],
  l: ['Left'],
  r: ['Right'],
}

function convertMpValue(value: any) {
  if (typeof value === 'string') return value

  const parsedValue = parseFloat(value)

  if (parsedValue !== parsedValue) return value

  return parsedValue * 16
}

// Convert a series of mp props (whose keys are m, p, mx, ...) into a style object
function convertMp(mpProps: object, theme: HonorableTheme): StylesProps {
  const convertedStyle = {}

  Object.keys(mpProps).forEach(key => {

    const [code, mediaKey] = key.split('-')
    const [mp, x = ''] = code.split('')
    const property = mpConversion[mp]
    const value = convertMpValue(mpProps[key])

    const unmediatedConvertedStyle = {}

    xConversion[x]
    .map((x: string) => property + x)
    .forEach((property: string) => {
      unmediatedConvertedStyle[property] = value
    })

    if (!mediaKey) {
      Object.assign(convertedStyle, unmediatedConvertedStyle)

      return
    }

    const query = createMediaQuery(mediaKey, 'exact', theme)

    if (!query) {
      Object.assign(convertedStyle, unmediatedConvertedStyle)

      return
    }

    Object.assign(
      convertedStyle,
      {
        [query]: {
          ...convertedStyle[query],
          ...unmediatedConvertedStyle,
        },
      }
    )
  })

  return convertedStyle
}

export default convertMp
