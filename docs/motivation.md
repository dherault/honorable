# Motivation

## A need for 0 CSS UI framework

So far, no React component library offered a 0 CSS standard, i.e. components without styling that give the developer full control on their looks. Choosing a React UI library was therefore also choosing a default theme to work with, which means that implementing design systems equated to modding down existing components.

With Honorable, this is what a `<Button />` component looks like out of the box:

![A simple button, without CSS](<.gitbook/assets/Screenshot 2022-04-13 at 03.12.11.png>)

Hence, the developer can start from zero to implement their/the designer's vision.

## Extensible to its core

In Honorable, any component can be extended with a clean extension API. You can spend time tweaking components to your delight or extend a preexisting theme. Its like applying CSS to HTML tags, with the added bonus of on-the-spot extendability inside your functions.

## (almost) No obscure props

The library was designed with almost zero learning curve required for the developer.

This means no obscure `margin={{ left: 'small' }}` or `weight="bold"` props is needed where you have to remember what a margin object is, what small stands for, and that `weight` is the alias for `fontWeight`.

Instead, it uses common CSS in JS props, with the added bonus of the [`xflex`](xflex-property.md) and [`mp`](mp-properties.md) props, to solve the three most common props in a modern web app: flexbox, margin and padding.

## default and custom props over `style`

...
