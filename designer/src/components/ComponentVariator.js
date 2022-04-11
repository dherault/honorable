import { Div, Pre } from 'honorable'
import { useContext } from 'react'

import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

function uncapitalize(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

function ComponentVariator({ Component, componentProps = {}, additionalVariations = {}, children }) {
  const [theme] = useContext(UserThemeContext)
  const [areVariationsDisplayed] = useContext(AreVariationsDisplayedContext)

  const { customProps = new Map() } = theme[uncapitalize(Component.displayName)] || {}

  const variations = {
    '': {},
  }

  if (areVariationsDisplayed) {
    customProps.forEach((value, key) => {
      if (key && value) variations[key.toString()] = value
    })

    Object.assign(variations, additionalVariations)
  }

  function renderVariation(fnString = '', props = {}, noMargin = false) {
    return (
      <Div
        mb={noMargin ? 0 : 2}
        xflex="x4"
        key={fnString}
      >
        <Div>
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
            ml={1}
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
