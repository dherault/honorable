import mpProperties from '../data/mpProperties'

import reduceDeep from './reduceDeep'

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

function decodeMp(key: string, value: any) {
  const [mp, x = ''] = key.split('')
  const property = mpConversion[mp]
  const decodedValue = convertMpValue(value)

  const decoded = {}

  xConversion[x]
    .map((x: string) => property + x)
    .forEach((property: string) => {
      decoded[property] = decodedValue
    })

  return decoded
}

function resolveMp(props: object) {
  return reduceDeep(props, (accumulator, key, value) => ({
    ...accumulator,
    ...(mpProperties.includes(key as typeof mpProperties[number]) ? decodeMp(key, value) : { [key]: value }),
  }))
}

export default resolveMp
