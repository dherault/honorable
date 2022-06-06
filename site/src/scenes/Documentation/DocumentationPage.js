import { useEffect, useState } from 'react'
import { Div, H2, H3, H4, H5, H6, P } from 'honorable'
import Markdown from 'markdown-to-jsx'

import CodeBlock from '../../components/CodeBlock'

function DocumentationPage({ contentUrl }) {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(contentUrl)
      .then(response => response.text())
      .then(setContent)
  }, [contentUrl])

  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: H2,
          },
          h2: {
            component: H3,
          },
          h3: {
            component: H4,
          },
          h4: {
            component: H5,
          },
          h5: {
            component: H6,
          },
          h6: {
            component: Div,
            props: {
              fontWeight: 700,
            },
          },
          p: {
            component: P,
          },
          code: {
            component: CodeBlock,
          },
        },
      }}
    >
      {content}
    </Markdown>
  )
}

export default DocumentationPage
