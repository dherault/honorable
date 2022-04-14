import { useContext } from 'react'
import GoogleFontLoader from 'react-google-font'

import FontsContext from '../contexts/FontsContext'

function TypographyFont() {
  const [fonts] = useContext(FontsContext)

  return fonts.some(font => !!font) && (
    <GoogleFontLoader
      fonts={fonts.map(font => ({
        font,
        weigths: [400, 600, 700],
      }))}
    />
  )
}

export default TypographyFont
