import { useEffect, useState } from 'react'
import { A, Div, H1, H2, H3, H4, H5, H6, P } from 'honorable'
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
    <Div paddingRight={256 + 64 + 16 + 4}>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: H1,
              props: {
                mt: -1,
                mb: 1,
              },
            },
            h2: {
              component: H2,
              props: {
                mt: 2,
                mb: 1,
              },
            },
            h3: {
              component: H3,
              props: {
                mt: 2,
                mb: 1,
              },
            },
            h4: {
              component: H4,
              props: {
                mt: 1,
                mb: 0.5,
              },
            },
            h5: {
              component: H5,
              props: {
                mt: 1,
                mb: 0.5,
              },
            },
            h6: {
              component: H6,
              props: {
                mt: 1,
                mb: 0.5,
                fontWeight: 700,
              },
            },
            a: {
              component: A,
            },
            p: {
              component: P,
            },
            code: {
              component: CodeBlock,
              // props: {
              //   p: 1,
              //   border: '1px solid border',
              //   borderRadius: 4,
              // },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </Div>
  )
}

export default DocumentationPage
