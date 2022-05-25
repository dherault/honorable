import resolvePartStyles from '../../src/resolvers/resolvePartStyles'

import theme1 from '../themes/theme1'

describe('resolvePartStyles', () => {

  test('Rejects bad inputs', () => {
    expect(
      resolvePartStyles('Children', { __honorableOrigin: 'Accordion' }, {})
    )
    .toStrictEqual({
      __honorableOrigin: 'Accordion.Children',
      __honorableOriginProps: {},
    })

    expect(
      // @ts-expect-error
      resolvePartStyles('Children', { __honorableOrigin: 'Accordion' }, { Accordion: { Children: 'foo' } })
    )
    .toStrictEqual({
      __honorableOrigin: 'Accordion.Children',
      __honorableOriginProps: {},
    })

    expect(
      resolvePartStyles('DoNotExist', { __honorableOrigin: 'Accordion' }, theme1)
    )
    .toStrictEqual({
      __honorableOrigin: 'Accordion.DoNotExist',
      __honorableOriginProps: {},
    })
  })

  test('Resolves part styles according to props', () => {
    expect(
      resolvePartStyles('Children', { __honorableOrigin: 'Checkbox', checked: true }, theme1)
    )
    .toStrictEqual({
      color: theme1.colors.primary,
      __honorableOrigin: 'Checkbox.Children',
      __honorableOriginProps: {
        checked: true,
      },
    })

    expect(
      resolvePartStyles('Children', { __honorableOrigin: 'Checkbox', checked: false }, theme1)
    )
    .toStrictEqual({
      color: theme1.colors.secondary,
      __honorableOrigin: 'Checkbox.Children',
      __honorableOriginProps: {
        checked: false,
      },
    })
  })

  test('Resolves part styles with global props', () => {
    expect(
      resolvePartStyles('Children', { __honorableOrigin: 'Accordion' }, theme1)
    )
    .toStrictEqual({
      width: 128,
      __honorableOrigin: 'Accordion.Children',
      __honorableOriginProps: {},
    })
  })

})
