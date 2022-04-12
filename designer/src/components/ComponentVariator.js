import { useContext, useState } from 'react'
import { Div, Pre } from 'honorable'

import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

function uncapitalize(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

const honorablePrefix = 'Honorable('

function removeHonorablePrefix(string) {
  if (string.startsWith(honorablePrefix)) {
    return string.slice(honorablePrefix.length, -1)
  }

  return string
}

function ComponentVariator({ Component, componentProps = {}, additionalVariations = {}, children }) {
  const [minWidth, setMinWidth] = useState(0)
  const [theme] = useContext(UserThemeContext)
  const [areVariationsDisplayed] = useContext(AreVariationsDisplayedContext)

  const { customProps = new Map() } = theme[uncapitalize(removeHonorablePrefix(Component.displayName || Component.name || 'Component'))] || {}

  const variations = {
    '': {},
  }

  if (areVariationsDisplayed) {
    customProps.forEach((value, key) => {
      if (typeof key === 'function' && typeof value === 'object') variations[key?.stringValue || key] = value
    })

    Object.assign(variations, additionalVariations)
  }

  function handleRef(ref) {
    if (ref) {
      setMinWidth(minWidth => Math.max(minWidth, ref.clientWidth))
    }
  }

  function renderVariation(fnString = '', props = {}, noMargin = false) {
    return (
      <Div
        mb={noMargin ? 0 : 2}
        xflex="x4"
        key={fnString}
      >
        <Div
          ref={handleRef}
          minWidth={minWidth}
        >
          <Component
            {...componentProps}
            {...props}
          >
            {children}
          </Component>
        </Div>
        {!!fnString && (
          <Pre
            text="small"
            ml={2}
            my={0}
          >
            {fnString}
          </Pre>
        )}
      </Div>
    )
  }

  return Object.entries(variations).map(([key, value], i, a) => renderVariation(key, value, i === a.length - 1))
}

export default ComponentVariator
