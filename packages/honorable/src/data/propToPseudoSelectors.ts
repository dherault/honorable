export default {
  _hover: [
    '&:hover',
  ],
  _active: [
    '&:active',
  ],
  _focus: [
    '&:focus',
  ],
  _focusWithin: [
    '&:focus-within',
  ],
  _focusVisible: [
    '&:focus-visible',
  ],
  _disabled: [
    '&[disabled]',
    '&[aria-disabled=true]',
  ],
  _readOnly: [
    '&[aria-readonly=true]',
    '&[readonly]',
  ],
  _before: [
    '&::before',
  ],
  _after: [
    '&::after',
  ],
  _empty: [
    '&:empty',
  ],
  _expanded: [
    '&[aria-expanded=true]',
  ],
  _checked: [
    '&[aria-checked=true]',
  ],
  _grabbed: [
    '&[aria-grabbed=true]',
  ],
  _pressed: [
    '&[aria-pressed=true]',
  ],
  _invalid: [
    '&[aria-invalid=true]',
  ],
  _busy: [
    '&[aria-busy=true]',
  ],
  _selected: [
    '&[aria-selected=true]',
  ],
  _hidden: [
    '&[hidden]',
  ],
  _webkitAutofill: [
    '&:-webkit-autofill',
  ],
  _even: [
    '&:nth-of-type(even)',
  ],
  _odd: [
    '&:nth-of-type(odd)',
  ],
  _first: [
    '&:first-of-type',
  ],
  _last: [
    '&:last-of-type',
  ],
  _notFirst: [
    '&:not(:first-of-type)',
  ],
  _notLast: [
    '&:not(:last-of-type)',
  ],
  _visited: [
    '&:visited',
  ],
  _indeterminate: [
    '&:indeterminate',
    '&[aria-checked=mixed]',
  ],
  _placeholder: [
    '&::placeholder',
  ],
  _placeholderShown: [
    '&:placeholder-shown',
  ],
  _fullScreen: [
    '&:fullscreen',
  ],
  _selection: [
    '&::selection',
  ],
  _rtl: [
    '[dir=rtl] &',
    '&[dir=rtl]',
  ],
  _ltr: [
    '[dir=ltr] &',
    '&[dir=ltr]',
  ],
} as const
