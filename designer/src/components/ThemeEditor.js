import { Div, P, Switch } from 'honorable'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

import ComponentsThemeEditor from './ComponentsThemeEditor'

const pathnameToEditorProps = {
  '/': {
    tags: ['button'],
    title: "Welcome to Honorable's theme editor",
    info: `🙏
You're about to implement your design system into workable React components.
Let's start simple by editing your brand color and the button.
Click on "customize" to start editing.`,
  },
  '/typography': {
    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
    title: "Let's customize your typography",
  },
}

function ThemeEditor() {
  const [areVariationsDisplayed, setAreVariationsDisplayed] = useContext(AreVariationsDisplayedContext)
  const props = pathnameToEditorProps[useLocation().pathname]

  if (!props) return null

  return (
    <Div
      width={512}
      maxHeight="calc(100vh - 64px)"
      overflowY="auto"
      flexShrink={0}
      pt={1}
      px={2}
      pb={3}
      elevation={2}
    >
      <Div
        xflex="x6"
        mt={0.5}
      >
        <P color="text-light">
          Component variations
        </P>
        <Switch
          ml={0.5}
          checked={areVariationsDisplayed}
          onChange={(event, value) => setAreVariationsDisplayed(value)}
        />
      </Div>
      <ComponentsThemeEditor {...props} />
    </Div>
  )
}

export default ThemeEditor
