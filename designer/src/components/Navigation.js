import { useState } from 'react'
import { Link } from 'react-router-dom'
import { A, Button, Div, H1, Img, Nav, Span, Switch, useTheme } from 'honorable'
import { AiFillGithub } from 'react-icons/ai'

import ExportModal from './ExportModal'

function Navigation({ mode, setMode, onReset }) {
  const theme = useTheme()
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  return (
    <Nav
      position="relative"
      elevation={2}
      px={2}
      py={1}
      xflex="x4"
      flexShrink={0}
      zIndex={100}
    >
      <Img
        src="/images/logo.png"
        width={32}
        marginTop={-4}
        userSelect="none"
      />
      <H1
        ml={1}
        userSelect="none"
      >
        Honorable Designer
      </H1>
      <A
        as={Link}
        to="/"
        ml={2}
      >
        Start
      </A>
      <A
        as={Link}
        to="/colors"
        ml={1}
      >
        Colors
      </A>
      <A
        as={Link}
        to="/typography"
        ml={1}
      >
        Typography
      </A>
      <A
        as={Link}
        to="/form"
        ml={1}
      >
        Form
      </A>
      <A
        as={Link}
        to="/dashboard"
        ml={1}
      >
        Dashboard
      </A>
      <Div flexGrow={1} />
      <Switch
        noBackgroundColor
        checkedBackground={(
          <Span
            paddingLeft={4}
            paddingTop={3}
            fontSize={18}
          >
            🌜
          </Span>
        )}
        uncheckedBackground={(
          <Span
            paddingRight={4}
            paddingTop={3}
            fontSize={18}
          >
            🌞
          </Span>
        )}
        checked={mode === 'dark'}
        onChange={event => setMode(event.target.checked ? 'dark' : 'light')}
      />
      <Button
        variant="outlined"
        ml={1}
        onClick={onReset}
      >
        Reset theme
      </Button>
      <Button
        onClick={() => setIsExportModalOpen(true)}
        ml={1}
      >
        Export theme
      </Button>
      <A
        href="https://github.com/dherault/honorable"
        target="_blank"
        rel="noopener noreferrer"
        xflex="x5"
        ml={1}
      >
        <AiFillGithub
          size={24}
          color={theme.utils.resolveColor('text')}
        />
      </A>
      <A
        ml={1}
        href="https://docs.honorable.design"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </A>
      <ExportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </Nav>
  )
}

export default Navigation
