# Quick Start

## Installation

In your current React app:

```bash
npm install --save honorable honorable-theme-default @emotion/react @emotion/styled
```

or:

```bash
yarn honorable honorable-theme-default @emotion/react @emotion/styled
```

## Usage

In your main `App` file:

```jsx
import { ThemeProvider, CssBaseline, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // Define a theme, see the theming section
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

**Good to know:** Using ThemeProvider or CssBaseline is totally optional, most honorable components can work without it.

## Import and style components

Any valid HTML component can be imported, capitalised:

```jsx
import { A, Button, Div, Input, P } from 'honorable'
```

They can then be added CSS properties, directly to them

```jsx
<A
  marginLeft="2rem"
  textDecoration="underline"
  href="https://honorable.design"
/>
```

Any other component can be also be styled this way:

```jsx
import { Accordion } from 'honorable'

<Accordion
  marginLeft="2rem"
  backgroundColor="blue"
  title="An accordion"
>
  Some content
</Accordion>
```

## Customize your theme

Give a look and feel to your application by editing your theme. This is also where you declare your conventions.

```jsx
const theme = mergeTheme(defaultTheme, {
  mode: 'dark',
  colors: {
    primary: '#0070f3',
  },
  // ...
})
```

For more info, see [theming.md](theming.md).

## Learn about the `mp` props

TODO make this a separate component

They are opinionated aliases that ship by default with Honorable.

* `xflex` allow for super quick flexbox layouts.
* `mp` props set margins and paddings.

```jsx
<Div
  mt={1}      // margin-top: 1rem
  p={2}       // padding: 2rem
/>
```

For more info, see [mp-properties.md](mp-properties.md)
