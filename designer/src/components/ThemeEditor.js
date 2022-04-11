import { Button, Div, P, Sub, Switch } from 'honorable'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

import ComponentsThemeEditor from './ComponentsThemeEditor'

function ThemeEditor() {
  const { pathname } = useLocation()
  const [userTheme, setUserTheme] = useContext(UserThemeContext)
  const [areVariationsDisplayed, setAreVariationsDisplayed] = useContext(AreVariationsDisplayedContext)

  const colorNames = Object.keys(userTheme.colors || {})

  const pathnameToEditorProps = {
    '/': {
      colors: ['primary'],
      tags: ['button'],
      title: "Welcome to Honorable's theme editor",
      infoStart: (
        <Sub>
          {`You're about to implement your design system into workable React components.
Let's start simple by editing your primary color and the button.
Click on "customize" to start editing.`}
        </Sub>
      ),
      infoEnd: (
        <Sub mt={4}>
          {`To see your customProps in action, enable "Component variations".
Once done, click continue.`}
        </Sub>
      ),
      next: '/colors',
    },
    '/colors': {
      title: 'Time for some color theory',
      infoStart: (
        <Sub>
          Pick your colors wisely.
        </Sub>
      ),
      colors: colorNames,
      infoEnd: (
        <Div
          xflex="x6"
          mt={2.25}
        >
          <Button
            onClick={handleAddColor}
            disabled={colorNames.includes('unnamed-color')}
          >
            Add new color
          </Button>
        </Div>
      ),
      previous: '/',
      next: '/typography',
    },
    '/typography': {
      tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'pre'],
      title: "Let's customize your typography",
      previous: '/colors',
      next: '/form',
    },
    '/form': {
      title: 'Forms are the butter and bread of UI design',
      tags: ['label', 'input', 'button'],
      previous: '/typography',
      next: '/dashboard',
    },
    '/dashboard': {
      title: 'A dashboard, the final look and feel of your app',
      previous: '/typography',
    },
  }

  function handleAddColor() {
    setUserTheme({
      ...userTheme,
      colors: {
        ...userTheme.colors,
        'unnamed-color': '#ffffff',
      },
    })
  }

  const props = pathnameToEditorProps[pathname]

  if (!props) return null

  const { previous, next } = props

  return (
    <Div
      width={512 + 64 + 8}
      maxHeight="calc(100vh - 64px)"
      xflex="y2s"
      overflow="hidden"
      flexShrink={0}
      pt={1}
      pl={2}
      pb={1.5}
      elevation={2}
    >
      <Div
        flexGrow={1}
        overflowY="scroll"
        pb={4}
        pr={2}
      >
        <ComponentsThemeEditor {...props} />
      </Div>
      <Div
        flexShrink={0}
        xflex="x4"
        mt={0.5}
        pr={2}
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
        {!!previous && (
          <Button
            as={Link}
            to={previous}
          >
            Previous
          </Button>
        )}
        {!!next && (
          <Button
            as={Link}
            to={next}
            ml={0.5}
          >
            Continue
          </Button>
        )}
      </Div>
    </Div>
  )
}

export default ThemeEditor
