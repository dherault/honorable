import resolveMp from '../src/index'

describe('resolveMp', () => {

  test('it resolves mp props', () => {
    expect(resolveMp()({
      ml: 2,
      my: '2px',
      p: 1,
    })).toEqual({
      marginLeft: 32,
      marginTop: '2px',
      marginBottom: '2px',
      padding: 16,
      ml: null,
      my: null,
      p: null,
    })
  })

  test('it resolves any value', () => {
    expect(resolveMp()({
      ml: {},
    })).toEqual({
      marginLeft: {},
      ml: null,
    })
  })

  test('it mutes other arguments', () => {
    expect(resolveMp()({
      foo: 'bar',
      p: 1,
    })).toEqual({
      padding: 16,
      p: null,
    })
  })

})
