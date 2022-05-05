import resolveWebkitProperties from '../../src/resolvers/resolveWebkitProperties'

describe('resolveWebkitProperties', () => {

  test('Resolves to identity when no webkit property is involved', () => {
    expect(resolveWebkitProperties({ width: 128 })).toStrictEqual({ width: 128 })
    expect(resolveWebkitProperties({ 'width-foo': 128 })).toStrictEqual({ 'width-foo': 128 })
  })

  test('Resolves webkit properties', () => {
    expect(resolveWebkitProperties({ webkitOpacity: 1 })).toStrictEqual({ WebkitOpacity: 1 })
    expect(resolveWebkitProperties({ mozAppearance: 'none' })).toStrictEqual({ MozAppearance: 'none' })
  })

  test('Resolves deeply nested webkit properties', () => {
    expect(resolveWebkitProperties({ '&:hover': { webkitOpacity: 1 } })).toStrictEqual({ '&:hover': { WebkitOpacity: 1 } })
  })

})
