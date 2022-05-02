import { Div, Spinner } from 'honorable'

export default {
  title: 'Spinner',
  component: Spinner,
}

function Template(args) {
  return (
    <Div xflex="y2">
      <Spinner
        {...args}
      />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Large = Template.bind({})
Large.args = {
  size: 64,
}
