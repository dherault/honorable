import resolveGap from '../src/index'

describe('resolveGap', () => {

  test('it resolves gap props', () => {
    expect(resolveGap()({
      gap: 2,
    })).toEqual({
      gap: 32,
    })
  })

  test('it resolves any value', () => {
    expect(resolveGap()({
      gap: '2px',
    })).toEqual(false)
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
