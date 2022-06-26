import { Div, H4, Iframe } from 'honorable'

import JsxCodeBlock from './JsxCodeBlock'

function DemoContainer({ demoSource, demoName, demoUrl, ...props }) {

  return (
    <Div
      width="100%"
      {...props}
    >
      <H4>{demoName}</H4>
      <Iframe
        src={demoUrl}
        width="100%"
        height={512}
      />
      <JsxCodeBlock>{demoSource}</JsxCodeBlock>
    </Div>
  )
}

export default DemoContainer
