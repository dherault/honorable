import { Button, Div, H1, Pre } from 'honorable'
import { useContext } from 'react'

import ColorBox from '../components/ColorBox'
import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

function Start() {
  return (
    <Div
      py={3}
      px={6}
    >
      <H1>Introduction to theming</H1>
      <ColorBox color="brand" />
      <Div mt={2}>
        <ComponentVariator Component={Button}>
          A cool button
        </ComponentVariator>
      </Div>
    </Div>
  )
}

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
    console.log('props', props)
    const propsJson = JSON.stringify(props, null, 2)

    return (
      <Div
        mb={2}
        xflex="x1"
        key={propsJson}
      >
        <Div minWidth={128 + 64}>
          <Component {...props}>
            {children}
          </Component>
        </Div>
        {propsJson !== '{}' && (
          <Pre
            text="small"
            margin={0}
          >
            {propsJson.split('\n').filter(x => x !== '{' && x !== '}').map(x => x.trim()).join('\n')}
          </Pre>
        )}
      </Div>
    )
  }

  return props.map(props => renderVariation(props))
}

export default Start
