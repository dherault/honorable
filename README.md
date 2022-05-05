# Honorable

🙏 Implement any design system in React

- [Website](https://honorable.design)
- [Documentation](https://docs.honorable.design)
- [Storybook](https://storybook.honorable.design)
- [Theme Designer](https://design.honorable.design)

## Motivation

Built with speed and developer experience in mind, \
Honorable offers a **non-opinionated API** yet extensible with **your own conventions**, for creating React apps with ease. It comes with x+ components that are entirely and easily **themable**.

```jsx
// Import any HTML tag, capitalized
import { Div } from 'honorable'

function App() {
  // Apply styles directly to the component
  // Nothing to remember, appart from good old CSS
  return (
    <Div
      width="2rem"
      height="2rem"
      backgroundColor="success"
    />
  )
}
```

The point is to create a front-end library that fits to your coding style by extending it your way:

```jsx
// You can declare your own conventions to create your own style:
return (
  <Div
    size="2rem"
    bg="success"
  />
)
```

## Installation

`npm i --save honorable honorable-theme-default @emotion/react @emotion/styled`

## Usage

```jsx
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // your theme goes here
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your application lives here */}
    </ThemeProvider>
  )
}
```

## Contributing

Yes, thank you. You can contribute to this project by making a pull request or opening an issue.

## License

MIT
