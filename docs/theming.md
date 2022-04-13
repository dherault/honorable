# Theming

{% hint style="info" %}
**Did you know:** Honorable has its own [theme editor](https://designer.honorable.design). Try it out!
{% endhint %}

```javascript
export default {
  // Set the mode of your theme, either light or dark
  mode: 'light',
  font: {
    family: 'Roboto',
  },
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
  // Global props are applied to the <html /> element
  global: {
    defaultProps: {
      boxSizing: 'border-box',
    },
  },
  // These props are applied to the <A /> component
  a: {
    // defaultProps are applied to any instance of the component
    defaultProps: {
      color: 'primary',
      textDecoration: 'none',
      cursor: 'pointer',
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
        outline: 'none',
        borderColor: 'primary',
      },
    },
    // customProps are applied whenever the key function returns truthy
    customProps: new Map([
      [
        ({ variant }) => variant === 'underlined',
        {
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
}

```

## Using a preset

## Theme composition

### `mode`

### `font`

### `global`

### `[component]`
