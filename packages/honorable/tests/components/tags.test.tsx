import renderer from 'react-test-renderer'

import '../test-utils'
import theme from '../themes/theme1'

import { Div } from '../../src/components/tags'
import { ThemeProvider } from '../../src/components/ThemeProvider/ThemeProvider'

describe('Div', () => {

  it('Renders as a <div />', () => {
    const component = renderer.create(
      <Div>Honorable</Div>,
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Renders as a <div /> with styles', () => {
    const component = renderer.create(
      <Div color="blue">Honorable</Div>,
    )

    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('color', 'blue')
  })

  it('Renders as a <div /> with styles on breakpoints', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Div color-mobile="blue">Honorable</Div>
      </ThemeProvider>
    )

    const tree = component.toJSON()

    expect(tree[0]).toMatchSnapshot()
    expect(tree[0]).toHaveStyleRule('color', 'blue', {
      media: '@media (max-width: 599px)',
    })
  })

  it('Renders as a <div /> with styles on theme colors', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Div color="primary">Honorable</Div>
      </ThemeProvider>
    )

    const tree = component.toJSON()

    expect(tree[0]).toMatchSnapshot()
    expect(tree[0]).toHaveStyleRule('color', '#0000ff')
  })
})
