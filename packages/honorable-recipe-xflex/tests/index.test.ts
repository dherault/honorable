import resolveMp from '../src/index'

describe('resolveMp', () => {

  test('it resolves mp props', () => {
    expect(resolveMp()({
      gap: 2,
    })).toEqual({
      gap: 32,
    })
  })

  test('it resolves any value', () => {
    expect(resolveMp()({
      gap: '2px',
    })).toEqual({})
  })

  test('it mutes other arguments', () => {
    expect(resolveMp()({
      foo: 'bar',
      gap: 1,
    })).toEqual({
      gap: 16,
    })
  })

})
