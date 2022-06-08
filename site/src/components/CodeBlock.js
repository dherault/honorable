import { Pre } from 'honorable'

import JsxCodeBlock from './JsxCodeBlock'

function CodeBlock({ children, ...props }) {
  if (!props.className?.startsWith('lang')) {
    return (
      <Pre {...props}>
        {children}
      </Pre>
    )
  }

  if (props.className?.startsWith('lang-jsx')) {
    return (
      <JsxCodeBlock {...props}>
        {children}
      </JsxCodeBlock>
    )
  }

  return (
    <Pre
      {...props}
      color="text-light"
      border="1px solid border"
    >
      {children}
    </Pre>
  )
}

export default CodeBlock
