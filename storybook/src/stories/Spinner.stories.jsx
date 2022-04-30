import { Spinner } from 'honorable'

export default {
  title: 'Spinner',
  component: Spinner,
}

function Template(args) {
  return (
    <Spinner
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Large = Template.bind({})
Large.args = {
  size: 64,
}
