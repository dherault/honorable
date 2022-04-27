# Honorable

A React UI library for 2022 and beyond.

- [Honorable](https://honorable.design)
- [Documentation](https://docs.honorable.design)
- [Storybook](https://storybook.honorable.design)
- [Theme Designer](https://design.honorable.design)

## Installation

`npm i --save honorable honorable-theme-default @emotion/react @emotion/styled`

## Usage

```jsx
import { Button, CssBaseline, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // your theme goes here
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button>
        Click me!
      </Button>
    </ThemeProvider>
  )
}
```

## Contributing

Yes, thank you. You can contribute to this project by making a pull request or opening an issue.

## License

MIT
