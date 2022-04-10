import { Button, Div, P, Switch } from 'honorable'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

import ComponentsThemeEditor from './ComponentsThemeEditor'

const pathnameToEditorProps = {
  '/': {
    colors: ['brand'],
    tags: ['button'],
    title: "Welcome to Honorable's theme editor",
    infoStart: `🙏
You're about to implement your design system into workable React components.
Let's start simple by editing your brand color and the button.
Click on "customize" to start editing.`,
    infoEnd: `To see your customProps in action, enable "Component variations".
Once done, click continue.`,
  },
  '/typography': {
    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'pre'],
    title: "Let's customize your typography",
  },
  '/colors': {
    title: 'Time for some color theory',
    colors: ['brand', 'background', 'background-light', 'text', 'text-light', 'shadow', 'border'],
  },
}

function ThemeEditor() {
  const { pathname } = useLocation()
  const [areVariationsDisplayed, setAreVariationsDisplayed] = useContext(AreVariationsDisplayedContext)
  const props = pathnameToEditorProps[pathname]

  if (!props) return null

  return (
    <Div
      width={512 + 64 + 8}
      maxHeight="calc(100vh - 64px)"
      xflex="y2s"
      overflow="hidden"
      flexShrink={0}
      pt={1}
      px={2}
      pb={1.5}
      elevation={2}
    >
      <Div
        flexGrow={1}
        overflowY="scroll"
        pb={4}
      >
        <ComponentsThemeEditor {...props} />
      </Div>
      <Div
        flexShrink={0}
        xflex="x4"
        mt={0.5}
      >

        <Switch
          checked={areVariationsDisplayed}
          onChange={value => setAreVariationsDisplayed(value)}
        />
        <P
          color="text-light"
          ml={0.5}
        >
          Component variations
        </P>
        <Div flexGrow={1} />
        <Button>
          Continue
        </Button>
      </Div>
    </Div>
  )
}

export default ThemeEditor
