import { useContext } from 'react'
import { Span, Switch } from 'honorable'

import ThemeModeContext from '../../contexts/ThemeModeContext'

function ThemeSwitch({ ...props }) {
  const [themeMode, setThemeMode] = useContext(ThemeModeContext)

  return (
    <Switch
      checkedBackground="🌜"
      uncheckedBackground="🌞"
      checked={themeMode === 'dark'}
      onChange={event => setThemeMode(event.target.checked ? 'dark' : 'light')}
      {...props}
    />
  )
}

export default ThemeSwitch
