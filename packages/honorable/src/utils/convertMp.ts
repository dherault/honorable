import { StyleProps } from '../types'

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
  if (value === 'auto') return value

  const parsedValue = parseFloat(value)

  if (parsedValue !== parsedValue) return value

  return `${parsedValue}rem`
}

// Convert a series of mp props (whose keys are m, p, mx, ...) into a style object
function convertMp(mpProps: object): StyleProps {
  const convertedStyle = {}

  Object.keys(mpProps).forEach(key => {
    const keyArray = key.split('')
    const mp = keyArray.shift()
    const x = keyArray.shift() || ''
    const property = mpConversion[mp]
    const value = convertMpValue(mpProps[key])

    xConversion[x]
    .map((x: string) => property + x)
    .forEach((property: string) => {
      convertedStyle[property] = value
    })
  })

  return convertedStyle
}

export default convertMp
