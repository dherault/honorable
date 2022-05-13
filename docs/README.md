---
description: A fully extensible React UI library for 2022 and beyond.
---

# Honorable

Built with speed and developer experience in mind, \
Honorable offers a **non-opinionated API** yet extensible with **your own conventions**, for creating React apps with ease. It comes with x+ components that are entirely and easily **themable**.

```jsx
// Import any HTML tag, capitalized
import { Div } from 'honorable'

function Component() {
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

### Features

* Any HTML tag is an extensible component + other components such as Dropdown, etc...
* End-to-end theming solution
* **Nothing to very little to learn and remember**, great for team work
* Made for design systems creators

{% hint style="info" %}
Honorable just released its v1 :tada:\
If you find any bug or want to improve something, please open an issue or a pull request.
{% endhint %}

## Getting started

Follow the guide:

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

## License

MIT
