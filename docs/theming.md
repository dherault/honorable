# Theming

{% hint style="info" %}
**Did you know:** Honorable has its own [theme editor](https://designer.honorable.design). Try it out!
{% endhint %}

Here is what a theme should look like:

```javascript
const theme = {
  // Set the mode of your theme, either light or dark or any other string
  mode: 'light',
  // Describe your own conventions
  aliases: {
    w: 'width',
    bg: 'background',
  },
  // Set the breakpoints
  breakpoints: {
    mobile: 600,
    tablet: 900,
    desktop: 1200,
  },
  // Give some colors to your theme
  colors: {
    primary: '#2196f3', // Directly
    background: {       // According to the mode
      light: 'white',
      dark: '#333',
    },
    focus: 'primary'    // Reference other colors anywhere
    text: {
      light: 'lighten(black, 10)', // Use some color helpers along the way
      dark: 'darken(white, 10)',
    },
  },
  // Global props are applied to the every component
  global: {
    boxSizing: 'border-box',
  },
  // html props are passed to the HTML tag by CssBaseline
  html: {
    fontFamily: 'Roboto',
    color: 'text',
  },
  // These props are applied to the <A /> component
  A: {
    // defaultProps are applied to any instance of the component
    defaultProps: {
      color: 'primary',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  Input: {
    // defaultProps can be an array of style props
    // or functions that return style props
    defaultProps: [
      ({ variant }) => variant === 'underlined' && {
        // This applies to <Input variant="underlined" />
        borderWidth: 0,
        borderBottom: '1px solid border',
      },
    ],
  },
  Modal: {
    // partProps allow you to customize any inner part of a component
    // See the component's documentation for naming conventions
    partProps: {
      Backdrop: {
        defaultProps: {
          backgroundColor: 'transparency(black, 80)',
        },
      },
    },
  },
  // And so on
}

```

## Using a preset

You can either start a theme from scratch, or start with the [theme editor](https://design.honorable.design), or use a preferably use a  preset.

Available presets are:

* ``[`honorable-theme-default`](https://www.npmjs.com/package/honorable-theme-default) for a mainstream look and feel
* ``[`honorable-theme-material`](https://www.npmjs.com/package/honorable-theme-material) for a Material design approach

If you create your own, feel free to add it to the list.

## Theme inheritance

Your can inherit any other theme with `mergeTheme`

```javascript
import { mergeTheme } from  'honorable'

const theme = mergeTheme(theme1, theme2, ...)
```

See the following documentation for more:

{% content-ref url="api-reference/theme-helpers/mergetheme.md" %}
[mergetheme.md](api-reference/theme-helpers/mergetheme.md)
{% endcontent-ref %}

## Theme composition

### `mode`

Can be any string, typically `light` or `dark`. Corresponds to any global variation you want to express on your theme.

### `breakpoints`

For the v1 three breakpoints are available:

* `mobile`
* `tablet`
* `desktop`

You can set the values of these keys to any number.

### `colors`

An object of color objects or strings.

Here are valid examples:

```javascript
const theme = {
  colors: {
    primary: '#0070f3',   // Direct color strings
    text: {
      light: '#000',      // Color object are resolved against the mode
      dark: '#fff',
    },
    focus: {
      light: 'primary',   // References to other colors
      dark: 'chartreuse', // CSS named colors
    },
    // You can use color helpers, see the corresponding section in the docs
    'primary-light': 'lighten(primary)',
  },
}
```

If you use the `CssBaseline` component in your app, your colors will be added as variables in your `:root` CSS with the prefix `--color-`:

![Resolved on the light theme](<.gitbook/assets/Screenshot 2022-04-13 at 14.48.49.png>)

See also:

{% content-ref url="api-reference/color-helpers.md" %}
[color-helpers.md](api-reference/color-helpers.md)
{% endcontent-ref %}

### `global`

These props follow the `defaultProps` pattern. \
They are applied to any component.  See `[Component]` for more info.

### `html`

These props are applied to the `<html>` tag by `CssBaseline`. They follow the `defaultProps` pattern. See `[Component]` for more info.

### `[Component]`

Components theme keys are always capitalized and are applied to the corresponding component. For example props under `Accordion` are passed to your `<Accordion />` components.

They comprise three keys:

* `defaultProps`: accepts a `DefaultProps` object that will eventually be styles, conventions and props that are applied to every instance of the component.
* `partProps`: accepts an object of inner parts names as keys and `defaultProps` values. see the component's documentation for a list of the available part names.

```typescript
type DefaultPropsFunction = (props: object, theme: HonorableTheme) => StylesProps
type DefaultProps = StylesProps | DefaultPropsFunction | Array<StylesProps | DefaultPropsFunction>
```

Here's a complete example:

```javascript
Accordion: {
  defaultProps: [
    {
      backgroundColor: 'background', // Style props
      radius: 0,                     // Conventions
      expandIcon: ...                // Props
    },
    ({ disabled }) => disabled && {
      // Style, conventions, or props
      cursor: 'not-allowed',
    },
    ({ variant }, theme) => variant === 'contrast' && {
      // Style, conventions, or props
      backgroundColor: theme.mode === 'light'
        ? 'background-light'
        : 'background-dark',
    },
  ],
  partProps: {
    // Style the title of the Accordion
    Title: [
      {
        // Style, conventions, or props
        color: 'primary',
      },
      ({ disabled }) => disabled && {
        // Style, conventions, or props
        color: 'text-light',
      },
    ],
  },
},
```

## Theme serialization

You can serialize a theme into a string using the `serializeTheme` and `deserializeTheme` helpers:

```javascript
import { serializeTheme, deserializeTheme } from 'honorable'

const serializedTheme = serializeTheme(theme)               // type: string
const deserializedTheme = deserializeTheme(serializedTheme) // type: Theme
```

See the following documentation for more:

{% content-ref url="api-reference/theme-helpers/serializetheme.md" %}
[serializetheme.md](api-reference/theme-helpers/serializetheme.md)
{% endcontent-ref %}

{% content-ref url="api-reference/theme-helpers/deserializetheme.md" %}
[deserializetheme.md](api-reference/theme-helpers/deserializetheme.md)
{% endcontent-ref %}
