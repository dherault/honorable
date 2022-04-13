---
description: A fully extensible React UI library for 2022 and beyond.
---

# Honorable

Built with speed and developer experience in mind, \
Honorable offers a non-opinionated API for creating React apps with ease.&#x20;

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

Intrigued by the simplicity? Asking yourself why not just use the `style` prop?\
Take a look a the [motivation](motivation.md) or the [theming](theming.md) sections.

### Features

* Any HTML tag is an extensible component + other components such as Modal
* end-to-end theming solution
* Nothing to very little to learn and remember, great for team work
* Made for design systems creators

{% hint style="info" %}
Honorable just released its v1 :tada:\
If you find any bug or want to improve something, please open an issue or a pull request.
{% endhint %}

## Where to start?

Follow the guides:

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

## License

MIT
