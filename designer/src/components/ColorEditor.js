import { useContext, useEffect, useState } from 'react'
import { A, Button, Div, H3, Icon, Input, P } from 'honorable'
import { ChromePicker } from 'react-color'
import { IoCloseOutline } from 'react-icons/io5'

import UserThemeContext from '../contexts/UserThemeContext'
import capitalize from '../utils/capitalize'

function convertToRgbString({ r, g, b, a }) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function ColorEditor({ colorName }) {
  const [open, setOpen] = useState(false)
  const [userTheme, setUserTheme] = useContext(UserThemeContext)
  const colorValue = userTheme.colors[colorName]
  const currentColorValue = colorValue[userTheme.mode] || colorValue
  const [colorPickerPlacement, setColorPickerPlacement] = useState('')
  const [isRenaming, setIsRenaming] = useState(false)

  useEffect(() => {
    setIsRenaming(false)
  }, [open])

  function getColor(mode) {
    return typeof userTheme.colors[colorName][mode] !== 'undefined'
      ? userTheme.colors[colorName][mode]
      : typeof userTheme.colors[colorName] === 'string'
        ? userTheme.colors[colorName]
        : ''
  }

  function setFactory(key, otherKey) {
    return value => {
      const workingValue = value || ''
      const otherValue = getColor(otherKey)

      setUserTheme({
        ...userTheme,
        colors: {
          ...userTheme.colors,
          [colorName]: value === otherValue ? value : {
            [key]: workingValue,
            [otherKey]: otherValue,
          },
        },
      })
    }
  }

  function renderColorPicker(mode, otherMode) {
    const color = getColor(mode)
    const otherColor = getColor(otherMode)
    const setColor = setFactory(mode, otherMode)

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
              {mode !== 'light' && color !== otherColor && (
                <A
                  ml={0.5}
                  text="small"
                  userSelect="none"
                  onClick={() => setColor(colorValue.light)}
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
              onChange={color => setColor(convertToRgbString(color.rgb))}
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

  function handleNameChange(event) {
    const keys = Object.keys(userTheme.colors)
    const index = keys.indexOf(colorName)
    const newName = event.target.value

    keys.splice(index, 1, newName)

    const nextColors = keys.reduce((acc, key) => ({
      ...acc,
      [key]: key === newName ? colorValue : userTheme.colors[key],
    }), {})

    setUserTheme({
      ...userTheme,
      colors: nextColors,
    })
  }

  function handleDelete() {
    if (window.confirm(`Are you certain you want to delete the color "${colorName}"?`)) {
      const nextColors = { ...userTheme.colors }

      delete nextColors[colorName]

      setUserTheme({
        ...userTheme,
        colors: nextColors,
      })
    }
  }

  return (
    <>
      <Div xflex="x4">
        <Div
          width={32 - 8 - 2}
          height={32 - 8 - 2}
          borderRadius={4}
          backgroundColor={currentColorValue}
          elevation={2}
        />
        <H3 ml={0.5}>
          {!isRenaming && colorName}
          {isRenaming && (
            <Input
              variant="underlined"
              fontWeight="bold"
              marginLeft="-0.5rem"
              marginTop="-0.5rem"
              marginBottom="calc(-0.5rem - 1px)"
              value={colorName}
              onChange={handleNameChange}
            />
          )}
        </H3>
        {open && (
          <>
            <A
              text="small"
              userSelect="none"
              ml={0.5}
              onClick={() => setIsRenaming(x => !x)}
            >
              {isRenaming ? 'Done' : 'Rename'}
            </A>
            {!isRenaming && (
              <A
                text="small"
                userSelect="none"
                ml={0.5}
                onClick={handleDelete}
              >
                Delete
              </A>
            )}
          </>
        )}
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
          {renderColorPicker('light', 'dark')}
          {renderColorPicker('dark', 'light')}
        </>
      )}
    </>
  )
}

export default ColorEditor
