import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

function HonorableDecorator(Story) {
  return (
    <ThemeProvider theme={mergeTheme(defaultTheme, {
      aliases: {
        w: 'width',
      },
      div: {
        customProps: new Map([
          [
            ({ fill }) => fill,
            {
              width: '100%',
            },
          ],
          [
            ({ direction }) => direction === 'row',
            {
              display: 'flex',
            },
          ],
          [
            ({ focusIndicator }) => focusIndicator,
            ({ focusIndicator }) => ({
              '&:hover': {
                backgroundColor: focusIndicator,
              },
            }),
          ],
        ]),
      },
    })}
    >
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
}

export default HonorableDecorator
