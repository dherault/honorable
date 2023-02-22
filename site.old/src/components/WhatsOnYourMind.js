import { ExtendTheme, Input } from 'honorable'

const inputTheme = {
  input: {
    defaultStyles: {
      borderRadius: 1000,
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
}

function WhatsOnYourMind(props) {

  return (
    <ExtendTheme theme={inputTheme}>
      <Input
        {...props}
        display="inline-block"
        placeholder="What's on your mind?"
      />
    </ExtendTheme>
  )
}

export default WhatsOnYourMind
