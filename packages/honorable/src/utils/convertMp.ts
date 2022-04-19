import {
  HonorableTheme,
  StyleProps,
} from '../types'

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

  return `${parsedValue}rem`
}

// Convert a series of mp props (whose keys are m, p, mx, ...) into a style object
function convertMp(mpProps: object, theme: HonorableTheme): StyleProps {
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

    const breakpoint = mediaKey ? theme.breakpoints?.[mediaKey] : null

    if (typeof breakpoint !== 'number') {
      Object.assign(convertedStyle, unmediatedConvertedStyle)

      return
    }

    const query = `@media (max-width: ${breakpoint}px)`

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
