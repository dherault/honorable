import createMediaQuery from '../../src/utils/createMediaQuery'

import theme from '../themes/theme1'

describe('createMediaQuery', () => {

  test('Creates `up` media queries', () => {
    expect(createMediaQuery(theme, 'up', 'mobile')).toBe('(min-width: 600px)')
    expect(createMediaQuery(theme, 'up', 'tablet')).toBe('(min-width: 900px)')
    expect(createMediaQuery(theme, 'up', 'desktop')).toBe('(min-width: 1200px)')
  })

  test('Creates `down` media queries', () => {
    expect(createMediaQuery(theme, 'down', 'mobile')).toBe('(max-width: 599px)')
    expect(createMediaQuery(theme, 'down', 'tablet')).toBe('(max-width: 899px)')
    expect(createMediaQuery(theme, 'down', 'desktop')).toBe('(max-width: 1199px)')
  })

  test('Creates `between` media queries', () => {
    expect(createMediaQuery(theme, 'between', 'mobile', 'desktop')).toBe('(min-width: 600px) and (max-width: 1199px)')
    expect(createMediaQuery(theme, 'between', 'tablet')).toBe('(min-width: 900px) and (max-width: 1199px)')
    expect(createMediaQuery(theme, 'between', 'desktop')).toBe('(min-width: 1200px)')
  })

  test('Creates `only` media queries', () => {
    expect(createMediaQuery(theme, 'only', 'mobile')).toBe('(min-width: 600px) and (max-width: 899px)')
    expect(createMediaQuery(theme, 'only', 'tablet')).toBe('(min-width: 900px) and (max-width: 1199px)')
    expect(createMediaQuery(theme, 'only', 'desktop')).toBe('(min-width: 1200px)')
  })

  test('Creates `not` media queries', () => {
    expect(createMediaQuery(theme, 'not', 'mobile')).toBe('not (min-width: 600px) and (max-width: 899px)')
    expect(createMediaQuery(theme, 'not', 'tablet')).toBe('not (min-width: 900px) and (max-width: 1199px)')
    expect(createMediaQuery(theme, 'not', 'desktop')).toBe('not (min-width: 1200px)')
  })

  test('Returns null on error', () => {
    expect(createMediaQuery(theme, 'up', 'foo')).toBe(null)
    expect(createMediaQuery(theme, 'foo', 'mobile')).toBe('foo')
  })

})
