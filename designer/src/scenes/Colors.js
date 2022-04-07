import { Div, H1, P, useTheme } from 'honorable'

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
          xflex="x4"
          mt={3}
        >
          <Div
            backgroundColor={colorName}
            width={64}
            height={64}
            borderRadius={4}
            elevation={6}
          />
          <P ml={3}>
            {colorName}
          </P>
        </Div>
      ))}
    </Div>
  )
}

export default Colors
