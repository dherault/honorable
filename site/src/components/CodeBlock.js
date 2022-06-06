import { Pre } from 'honorable'

import JsxCodeBlock from './JsxCodeBlock'

function CodeBlock({ children, ...props }) {
  if (props.className !== 'lang-jsx') {
    return (
      <Pre {...props}>
        {children}
      </Pre>
    )
  }

  return (
    <JsxCodeBlock {...props}>
      {children}
    </JsxCodeBlock>
  )
}

export default CodeBlock
