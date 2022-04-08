import { Button, Div, H3, useTheme } from 'honorable'
import { useContext, useState } from 'react'

import UserThemeContext from '../contexts/UserThemeContext'

function ColorEditor({ colorName }) {
  const enhancedUserTheme = useTheme()
  const [open, setOpen] = useState(false)
  const [userTheme, setUserTheme] = useContext(UserThemeContext)
  const [isModed, setIsModed] = useState(false)

  const colorValue = userTheme.colors[colorName]
  const currentColorValue = enhancedUserTheme.utils.resolveColor(colorName)

  return (
    <>
      <Div xflex="x4">
        <Div
          width={32 - 8 - 2}
          height={32 - 8 - 2}
          borderRadius={4}
          backgroundColor={currentColorValue}
        />
        <H3 ml={0.5}>
          Color {colorName}
        </H3>
        <Div flexGrow={1} />
        <Button
          ml={1}
          size="small"
          onClick={() => setOpen(open => !open)}
        >
          {open ? 'Hide' : 'Customize'}
        </Button>
      </Div>
      {open && (
        'open'
      )}
    </>
  )
}

export default ColorEditor
