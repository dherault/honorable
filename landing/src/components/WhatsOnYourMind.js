import { Input, ThemeProvider } from 'honorable'

const inputTheme = {
  input: {
    defaultProps: {
      borderRadius: 1000,
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
}

function WhatsOnYourMind(props) {

  return (
    <ThemeProvider.Extend theme={inputTheme}>
      <Input
        {...props}
        display="inline-block"
        placeholder="What's on your mind?"
      />
    </ThemeProvider.Extend>
  )
}

export default WhatsOnYourMind
