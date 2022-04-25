# Color helpers

Color helpers are available for any CSS property that accepts a color. They can also be found in `theme.utils`.

## `lighten(color, amount = 25)`

Lightens a color by the given percentage amount (between 0 and 100).

```javascript
{
  color: 'lighten(primary)'
  backgroundColor: 'lighten(background, 12)',
}
```

## `darken(color, amount = 25)`

Darkens a color by the given percentage amount (between 0 and 100).

```javascript
{
  color: 'darken(primary)'
  backgroundColor: 'darken(background, 12)',
}
```

## `transparency(color, amount = 50)`

Applies transparency to a color by the given percentage amount (between 0 and 100).

```javascript
{
  color: 'transparency(primary)'
  backgroundColor: 'transparency(background, 12)',
}
```
