import { useContext, useEffect, useRef, useState } from 'react'
import { Div, H1, H2, H3, H4, H5, H6, P, Pre } from 'honorable'

import UserThemeContext from '../contexts/UserThemeContext'

function Typography() {

  return (
    <Div mp="py-6 px-12">
      <TypographyItem Component={H1}>
        Heading H1 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={H2}>
        Heading H2 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={H3}>
        Heading H3 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={H4}>
        Heading H4 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={H5}>
        Heading H5 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={H6}>
        Heading H6 Lorem Ipsum
      </TypographyItem>
      <TypographyItem Component={P}>
        Paragraph P Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </TypographyItem>
      <TypographyItem Component={Pre}>
        console.log('Pre')
      </TypographyItem>
    </Div>
  )
}

function TypographyItem({ Component, children }) {
  const ref = useRef()
  const [theme] = useContext(UserThemeContext)
  const [textSize, setTextSize] = useState(null)

  const { customProps = {} } = theme[Component.displayName] || {}

  useEffect(() => {
    setTextSize(getComputedStyle(ref.current).fontSize)
  }, [])

  function renderVariant(props) {
    return (
      <Div flexpad="x4">
        <Div
          text="small"
          color="text-light"
          mp="mr-6"
          minWidth={64}
        >
          {textSize}
        </Div>
        <Component {...props}>
          <span ref={ref}>
            {children}
          </span>
        </Component>
      </Div>
    )
  }

  return (
    <>
      {renderVariant({})}
      {Object.keys(customProps).map(propName => null)}
    </>
  )
}

export default Typography
