import { Path, Svg } from 'honorable'

export default {
  title: 'Components/Svg',
  component: Svg,
}

function Template(args: any) {
  const borderSize = 25

  return (
    <Svg viewBox="0 0 100 100">
      <Path
        d={`M 0 0 L ${borderSize} ${borderSize} L ${borderSize} ${100 - borderSize} L 0 100 Z`}
        fill="lighten(primary, 8)"
      />
      <Path
        d={`M 0 0 L ${borderSize} ${borderSize} L ${100 - borderSize} ${borderSize} L 100 0 Z`}
        fill="primary"
      />
      <Path
        d={`M 100 0 L ${100 - borderSize} ${borderSize} L ${100 - borderSize} ${100 - borderSize} L 100 100 Z`}
        fill="lighten(primary, 8)"
      />
      <Path
        d={`M 100 100 L ${100 - borderSize} ${100 - borderSize} L ${borderSize} ${100 - borderSize} L 0 100 Z`}
        fill="primary"
      />
    </Svg>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}
