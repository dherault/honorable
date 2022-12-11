import resolveAll from '../../src/resolvers/resolveAll'

import theme1 from '../themes/theme1'
// import theme2 from '../themes/theme2'

describe('resolveAll', () => {

  test('Resolves to identity when no breakpoints nor alias nor Webkit property nor color is involved', () => {
    expect(resolveAll({ width: 128 }, {})).toStrictEqual({ width: 128 })
    expect(resolveAll({ width: 128 }, theme1)).toStrictEqual({ width: 128 })
    expect(resolveAll({ 'width-foo': 128 }, theme1)).toStrictEqual({ 'width-foo': 128 })
  })

  test('Resolves complex objects', () => {
    expect(
      resolveAll({
        width: 128,
        backgroundColor: 'primary',
        '&:hover': {
          'width-mobile': 64,
          'backgroundColor-tablet-only': 'secondary',
          WebkitOpacity: 0.5,
        },
        '& > div': {
          color: 'blue',
        },
      }, theme1)
    )
    .toStrictEqual(
      {
        width: 128,
        backgroundColor: '#0000ff',
        '&:hover': {
          '@media (max-width: 599px)': {
            width: 64,
          },
          '@media (min-width: 900px) and (max-width: 1199px)': {
            backgroundColor: '#ff0000',
          },
          WebkitOpacity: 0.5,
        },
        '& > div': {
          color: 'blue',
        },
      }
    )
  })

})
