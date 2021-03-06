import resolveBreakpoints from '../../src/resolvers/resolveBreakpoints'

import theme from '../themes/theme1'

describe('resolveBreakpoints', () => {

  test('Resolves to identity when no breakpoint is involved', () => {
    expect(resolveBreakpoints({ width: 128 }, theme)).toStrictEqual({ width: 128 })
    expect(resolveBreakpoints({ 'width-foo': 128 }, theme)).toStrictEqual({ 'width-foo': 128 })
  })

  test('Resolves to media queries', () => {
    expect(resolveBreakpoints({ 'width-mobile': 128 }, theme)).toStrictEqual({
      '@media (max-width: 599px)': {
        width: 128,
      },
    })
    expect(resolveBreakpoints({ 'width-mobile-up': 128 }, theme)).toStrictEqual({
      '@media (min-width: 600px)': {
        width: 128,
      },
    })
    expect(resolveBreakpoints({ 'width-tablet-down': 128 }, theme)).toStrictEqual({
      '@media (max-width: 899px)': {
        width: 128,
      },
    })
  })

  test('Resolves to media queries with deeply nested objects', () => {
    expect(resolveBreakpoints(
      {
        '&:hover': {
          'width-mobile': 128,
        },
      },
      theme
    )).toStrictEqual({
      '&:hover': {
        '@media (max-width: 599px)': {
          width: 128,
        },
      },
    })
  })

  test('Resolves to media queries with multiple props', () => {
    expect(resolveBreakpoints({ 'width-mobile': 128, 'height-mobile': 128 }, theme)).toStrictEqual({
      '@media (max-width: 599px)': {
        width: 128,
        height: 128,
      },
    })
  })

  const theme1 = {
    breakpoints: {
      'tablet-foo': 600,
      desktop: 1000,
    },
  }

  test('Resolves to media queries with complex breakpoint names', () => {
    expect(resolveBreakpoints({ 'width-tablet-foo': 128 }, theme1)).toStrictEqual({
      '@media (max-width: 599px)': {
        width: 128,
      },
    })
    expect(resolveBreakpoints({ 'width-tablet-foo-up': 128 }, theme1)).toStrictEqual({
      '@media (min-width: 600px)': {
        width: 128,
      },
    })
    expect(resolveBreakpoints({ 'width-tablet-foo-only': 128 }, theme1)).toStrictEqual({
      '@media (min-width: 600px) and (max-width: 999px)': {
        width: 128,
      },
    })
  })

})
