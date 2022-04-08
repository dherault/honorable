import { Div, P } from 'honorable'

function ColorBox({ color }) {
  return (
    <Div xflex="x4">
      <Div
        backgroundColor={color}
        width={64}
        height={64}
        borderRadius={4}
        elevation={6}
      />
      <P ml={3}>
        {color}
      </P>
    </Div>

  )
}

export default ColorBox
