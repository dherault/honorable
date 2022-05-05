import { Div, DropdownButton, ExtendTheme } from 'honorable'

export default {
  title: 'Theming',
}

const extendedTheme = {
  DropdownButton: {
    partProps: {
      Button: {
        Children: [
          ({ install }) => install && {
            color: 'red',
          },
        ],
      },
    },
  },
}

function Template() {
  return (
    <ExtendTheme theme={extendedTheme}>
      <Div xflex="y2">
        <DropdownButton
          install
          label="Install"
        />
      </Div>
    </ExtendTheme>
  )
}

export const Default = Template.bind({})
Default.args = {
}