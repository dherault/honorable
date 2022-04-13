import { useContext, useEffect } from 'react'
import { A, H3, Input, P } from 'honorable'

import FontsContext from '../contexts/FontsContext'
import UserThemeContext from '../contexts/UserThemeContext'

function quote(string) {
  if (string.includes(' ')) return `"${string}"`

  return string
}

function TypographyFontSelector() {
  const [fonts, setFonts] = useContext(FontsContext)
  const [userTheme, setUserTheme] = useContext(UserThemeContext)

  function renderFont(font, i) {
    return (
      <Input
        key={i}
        mt={0.5}
        placeholder="eg: Roboto"
        value={font}
        onChange={event => setFonts(fonts => {
          const nextFonts = fonts.slice()

          nextFonts[i] = event.target.value

          return nextFonts
        })}
      />
    )
  }

  useEffect(() => {
    const family = fonts[0] ? quote(fonts[0]) : null

    if ((userTheme.font?.family || null) === family) return

    setUserTheme({
      ...userTheme,
      font: {
        ...userTheme.font,
        family,
      },
    })
  }, [fonts, userTheme, setUserTheme])

  return (
    <>
      <H3>
        Typeface
      </H3>
      <P>
        Select a typeface from
        <A
          href="https://fonts.google.com/"
          target="_blank"
          rel="norefferer noopener"
          mx={0.25}
        >
          Google fonts
        </A>
        to use in your application.
        <br />
        Or leave blank to use system fonts.
      </P>
      {fonts.map(renderFont)}
    </>
  )
}

export default TypographyFontSelector
