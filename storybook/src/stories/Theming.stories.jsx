import { Checkbox, Div, DropdownButton, ExtendTheme } from 'honorable'

export default {
  title: 'Theming',
}

const extendedTheme1 = {
  DropdownButton: {
    partStyles: {
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

function Template1() {
  return (
    <ExtendTheme theme={extendedTheme1}>
      <Div xflex="y2">
        <DropdownButton
          install
          label="Install"
        />
      </Div>
    </ExtendTheme>
  )
}

export const Theming1 = Template1.bind({})
Theming1.args = {
}
