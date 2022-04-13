# Theming

{% hint style="info" %}
**Did you know:** Honorable has its own [theme editor](https://designer.honorable.design). Try it out!
{% endhint %}

Here is what a theme should look like:

```javascript
const theme = {
  // Set the mode of your theme, either light or dark
  mode: 'light',
  // Give some colors to your theme, according to the mode
  colors: {
    primary: '#2196f3',
    background: {
      light: 'white',
      dark: '#333',
    },
    text: {
      light: '#111',
      dark: 'white',
    },
    border: {
      light: '#ddd',
      dark: '#222',
    },
  },
  // Global props are applied to the * selector
  global: {
    defaultProps: {
      fontFamily: 'Roboto',
      boxSizing: 'border-box',
    },
  },
  // These props are applied to the <A /> component
  a: {
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
  input: {
    defaultProps: {
      padding: '0.5rem',
      border: '1px solid border',
      borderRadius: 4,
      '&:focus': {
        borderColor: 'primary',
      },
    },
    // customProps are applied whenever the key function on props returns truthy
    customProps: new Map([
      [
        ({ variant }) => variant === 'underlined',
        {
          // Applies to <Input variant="underlined" />
          borderWidth: 0,
          borderRadius: 0,
          borderBottom: '1px solid border',
          backgroundColor: 'transparent',
          color: 'text',
        },
      ],
    ]),
  },
  // These props are applied to the <Modal /> component
  modal: {
    defaultProps: {
      borderRadius: 4,
    },
  },
  // And so on
}

```

## Using a preset

You can either start a theme from scratch, or start with the [theme editor](https://design.honorable.design), or use a preset.

Available presets are:

* ``[`honorable-theme-default`](https://www.npmjs.com/package/honorable-theme-default) for a mainstream look and feel
* ``[`honorable-theme-material`](https://www.npmjs.com/package/honorable-theme-material) for a Material design approach

If you create your own, feel free to add it to the list.

## Theme composition

### `mode`

Can be any string, typically `light` or `dark`. Corresponds to any global variation you want to express on your theme.

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

### `[component]`

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

