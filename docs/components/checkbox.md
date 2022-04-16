# Checkbox

A handy replacement for `input[type=checkbox]` that can be difficult to style.

## Usage

```jsx
import { Checkbox } from 'honorable'

<Checkbox
  checked={checked}
  onChange={event => setChecked(event.target.checked)}
  {...styleProps}
/>
```

## Props

### `checked`

type: boolean | null

default: null
