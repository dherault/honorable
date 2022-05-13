import resolveAliases from '../../src/resolvers/resolveAliases'

import theme from '../themes/theme1'

describe('resolveAliases', () => {

  test('Resolves to identity when no alias is involved', () => {
    expect(resolveAliases({ width: 128 }, {})).toStrictEqual({ width: 128 })
    expect(resolveAliases({ width: 128 }, theme)).toStrictEqual({ width: 128 })
    expect(resolveAliases({ 'width-foo': 128 }, theme)).toStrictEqual({ 'width-foo': 128 })
  })

  test('Resolves aliases', () => {
    expect(resolveAliases({ w: 128 }, theme)).toStrictEqual({ width: 128 })
  })

  test('Resolves deeply nested aliases', () => {
    expect(resolveAliases({ '&:hover': { w: 128 } }, theme)).toStrictEqual({ '&:hover': { width: 128 } })
  })

})
