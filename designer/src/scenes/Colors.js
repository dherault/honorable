import { Div, H1, P, useTheme } from 'honorable'

function Colors() {
  const theme = useTheme()

  return (
    <Div mp="py-6 px-12">
      <H1>
        Colors
      </H1>
      {Object.keys(theme.colors || {}).map(colorName => (
        <Div
          key={colorName}
          flexpad="x4"
          mp="mt-6"
        >
          <Div
            backgroundColor={colorName}
            width={64}
            height={64}
            borderRadius={4}
            elevation={6}
          />
          <P mp="ml-6">
            {colorName}
          </P>
        </Div>
      ))}
    </Div>
  )
}

export default Colors
