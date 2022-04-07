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

function convertMpValue(value) {
  if (value === 'auto') return value

  const parsedValue = parseFloat(value)

  if (parsedValue !== parsedValue) return value

  return `${parsedValue}rem`
}

function convertMp(mpProps) {
  const convertedStyle = {}

  Object.keys(mpProps).forEach(key => {
    const keyArray = key.split('')
    const mp = keyArray.shift()
    const x = keyArray.shift()
    const property = mpConversion[mp]
    const value = convertMpValue(mpProps[key])

    xConversion[x]
    .map(x => property + x)
    .forEach(property => {
      convertedStyle[property] = value
    })
  })

  return convertedStyle
}

export default convertMp
