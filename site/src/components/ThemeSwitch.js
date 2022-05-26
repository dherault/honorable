import { useContext } from 'react'
import { Span, Switch } from 'honorable'

import ThemeModeContext from '../contexts/ThemeModeContext'

function ThemeSwitch({ ...props }) {
  const [themeMode, setThemeMode] = useContext(ThemeModeContext)

  return (
    <Switch
      checkedBackground={(
        <Span
          paddingLeft={4}
          paddingTop={1}
          fontSize={18}
        >
          🌜
        </Span>
      )}
      uncheckedBackground={(
        <Span
          paddingRight={4}
          paddingTop={1}
          fontSize={18}
        >
          🌞
        </Span>
      )}
      checked={themeMode === 'dark'}
      onChange={event => setThemeMode(event.target.checked ? 'dark' : 'light')}
      backgroundColor="primary"
      {...props}
    />
  )
}

export default ThemeSwitch
