import resolveGap from '../src/index'

describe('resolveGap', () => {

  test('it resolves gap props', () => {
    expect(resolveGap()({
      gap: 2,
    })).toEqual({
      gap: 32,
    })
  })

  test('it resolves column-gap props', () => {
    expect(resolveGap()({
      columnGap: 2,
    })).toEqual({
      columnGap: 32,
    })
  })

  test('it resolves row-gap props', () => {
    expect(resolveGap()({
      rowGap: 2,
    })).toEqual({
      rowGap: 32,
    })
  })

  test('it multiplies', () => {
    expect(resolveGap(52)({
      gap: 100,
    })).toEqual({
      gap: 5200,
    })
  })

  test('it resolves any value', () => {
    expect(resolveGap()({
      gap: '2px',
    })).toEqual({})
  })

  test('it mutes other arguments', () => {
    expect(resolveGap()({
      foo: 'bar',
      gap: 1,
    })).toEqual({
      gap: 16,
    })
  })

})
