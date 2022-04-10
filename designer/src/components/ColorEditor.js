import { useContext, useEffect, useState } from 'react'
import { A, Button, Div, H3, Icon, Input, P } from 'honorable'
import { ChromePicker } from 'react-color'
import { IoCloseOutline } from 'react-icons/io5'

import UserThemeContext from '../contexts/UserThemeContext'
import capitalize from '../utils/capitalize'

function ColorEditor({ colorName }) {
  const [open, setOpen] = useState(true)
  const [userTheme, setUserTheme] = useContext(UserThemeContext)
  const colorValue = userTheme.colors[colorName]
  const currentColorValue = colorValue[userTheme.mode] || colorValue
  const [light, setLight] = useState(colorValue.light || colorValue)
  const [dark, setDark] = useState(colorValue.dark || colorValue)
  const [colorPickerPlacement, setColorPickerPlacement] = useState('')

  useEffect(() => {
    setUserTheme({
      ...userTheme,
      colors: {
        ...userTheme.colors,
        [colorName]: light === dark ? light : { light, dark },
      },
    })
  }, [light, dark, colorName]) // eslint-disable-line react-hooks/exhaustive-deps

  function renderColorPicker(mode, color, setColor) {
    return (
      <Div
        mt={0.5}
        xflex="x1"
      >
        <Div xflex="x4">
          <P minWidth={64}>
            {capitalize(mode)}:
          </P>
          {colorPickerPlacement !== mode && (
            <>
              <Input
                ml={0.5}
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
              <A
                ml={1}
                text="small"
                userSelect="none"
                onClick={() => setColorPickerPlacement(x => x === mode ? '' : mode)}
              >
                Show color picker
              </A>
              {color !== light && (
                <A
                  ml={0.5}
                  text="small"
                  userSelect="none"
                  onClick={() => setColor(light)}
                >
                  Set same as light
                </A>
              )}
            </>
          )}
        </Div>
        {colorPickerPlacement === mode && (
          <Div
            ml={0.5}
            xflex="x1"
          >
            <ChromePicker
              elevation={0}
              color={color}
              onChange={color => setColor(color.hex)}
            />
            <Icon
              mt={-0.5}
              p={0.5}
              cursor="pointer"
              onClick={() => setColorPickerPlacement('')}
            >
              <IoCloseOutline />
            </Icon>
          </Div>
        )}

      </Div>
    )
  }

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
        <>
          {renderColorPicker('light', light, setLight)}
          {renderColorPicker('dark', dark, setDark)}
        </>
      )}
    </>
  )
}

export default ColorEditor
