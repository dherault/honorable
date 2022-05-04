import reduceDeep from '../../src/utils/reduceDeep'

describe('reduceDeep', () => {

  const givenObject = {
    a: 1,
    b: 2,
  }

  const reducer = (acc: object, key: string, value: any) => ({
    ...acc,
    [key]: value + 1,
  })

  const expectedObject = {
    a: 2,
    b: 3,
  }

  test('Reduces simple objects', () => {
    expect(reduceDeep(givenObject, reducer)).toStrictEqual(expectedObject)
  })

  const givenObject1 = {
    a: 1,
    b: 2,
    c: {
      d: 3,
    },
  }

  const expectedObject1 = {
    a: 2,
    b: 3,
    c: {
      d: 4,
    },
  }

  test('Reduces deeply nested objects', () => {
    expect(reduceDeep(givenObject1, reducer)).toStrictEqual(expectedObject1)
  })

})
