import resolvePseudoSelectors from '../../src/resolvers/resolvePseudoSelectors'

describe('resolvePseudoSelectors', () => {

  test('Resolves to identity when no pseudo selector is involved', () => {
    expect(resolvePseudoSelectors({ width: 128 })).toStrictEqual({ width: 128 })
    expect(resolvePseudoSelectors({ '&:hover': { width: 128 } })).toStrictEqual({ '&:hover': { width: 128 } })
  })

  test('Resolves pseudo selectors', () => {
    expect(resolvePseudoSelectors({ _hover: { width: 128 } })).toStrictEqual({
      '&:hover': {
        width: 128,
      },
    })
  })

  test('Resolves deeply nested pseudo selectors', () => {
    expect(resolvePseudoSelectors({ _hover: { _before: { width: 128 } } })).toStrictEqual({
      '&:hover': {
        '&::before': {
          width: 128,
        },
      },
    })
  })
})
