import { Spinner } from 'honorable'

export default {
  title: 'Components/Spinner',
  component: Spinner,
}

function Template(args: any) {
  return (
    <Spinner {...args} />
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}

export const Large = Template.bind({}) as any
Large.args = {
  size: 64,
}
