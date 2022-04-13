# Quick Start

## Installation

In your current React app:

{% tabs %}
{% tab title="NPM" %}
```
npm install --save honorable
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn honorable
```
{% endtab %}
{% endtabs %}

## Usage

```jsx
import { ThemeProvider, CssBaseline } from 'honorable'

// Define a theme, see the theming section
const theme = {
  mode: 'light',
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your application lives here */}
    </ThemeProvider>
  )
}
```

{% hint style="info" %}
**Good to know:** Using ThemeProvider or CssBaseline is totally optional: most honorable components can work without it.
{% endhint %}

## Import and style components

Any valid HTML component can be imported, capitalised:

```jsx
import { Div, P, A, Button, Input } from 'honorable'
```

They can then be added CSS properties, directly to them

```jsx
<A
  marginLeft="2rem"
  textDecoration="underline"
  href="https://honorable.design"
/>
```

## Learn about the `xflex` and `mp` props

They compose the opinionated part of honorable, and are super useful to build application event faster.

* `xflex` documentation
* `mp` documentation
