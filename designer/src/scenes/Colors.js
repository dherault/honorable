import { Div, H1, useTheme } from 'honorable'

import ColorBox from '../components/ColorBox'

function Colors() {
  const theme = useTheme()

  return (
    <Div
      py={3}
      px={6}
    >
      <H1>
        Colors
      </H1>
      {Object.keys(theme.colors || {}).map(colorName => (
        <Div
          key={colorName}
          mt={3}
        >
          <ColorBox color={colorName} />
        </Div>
      ))}
    </Div>
  )
}

export default Colors
