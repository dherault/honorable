import { Div, Pre } from 'honorable'
import { useContext } from 'react'

import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

function uncapitalize(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

function ComponentVariator({ Component, children }) {
  const [theme] = useContext(UserThemeContext)
  const [areVariationsDisplayed] = useContext(AreVariationsDisplayedContext)

  const { customProps = {} } = theme[uncapitalize(Component.displayName)] || {}

  const keys = Object.keys(customProps)

  const props = [{}]

  if (areVariationsDisplayed) {
    keys.forEach(key => {
      const map = customProps[key]

      if (!(map instanceof Map && map.size)) return

      [...map.keys()].forEach(mapKey => {
        const combination = { [key]: mapKey }

        props.push(combination)
      })
    })
  }

  function renderVariation(props = {}) {
    const propsJson = JSON.stringify(props, null, 2)

    return (
      <Div
        mb={2}
        xflex="x4"
        key={propsJson}
      >
        <Div>
          <Component {...props}>
            {children}
          </Component>
        </Div>
        {propsJson !== '{}' && (
          <Pre
            text="small"
            ml={1}
            my={0}
          >
            {propsJson.split('\n').filter(x => x !== '{' && x !== '}').map(x => x.trim()).join('\n')}
          </Pre>
        )}
      </Div>
    )
  }

  return props.map(props => renderVariation(props))
}

export default ComponentVariator
