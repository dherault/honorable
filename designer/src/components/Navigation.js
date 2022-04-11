import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { A, Button, Div, H1, Img, Modal, Nav, Pre, Span, Switch, useTheme } from 'honorable'
import { AiFillGithub } from 'react-icons/ai'

import UserThemeContext from '../contexts/UserThemeContext'

import stringify from '../utils/stringify'

function Navigation({ mode, setMode, onReset }) {
  const theme = useTheme()
  const [userTheme] = useContext(UserThemeContext)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  function renderExportModal() {
    return (
      <Modal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        xflex="y2s"
        overflow="hidden"
      >
        <Div
          p={1}
          flexGrow={1}
          overflowY="auto"
        >
          <H1>
            Your theme:
          </H1>
          <Pre mt={1}>
            {JSON.stringify(userTheme, null, 2)}
          </Pre>
        </Div>
        <Div
          flexShrink={0}
          xflex="x6"
          p={1}
        >
          <Button
            variant="outlined"
            onClick={() => setIsExportModalOpen(false)}
          >
            Close
          </Button>
          <Button ml={1}>
            Copy to clipboard
          </Button>
        </Div>
      </Modal>
    )
  }

  return (
    <Nav
      position="relative"
      elevation={2}
      height={64}
      px={1}
      xflex="x4"
      flexShrink={0}
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
        onChange={checked => setMode(checked ? 'dark' : 'light')}
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
        cursor="pointer"
      >
        <AiFillGithub
          size={24}
          color={theme.utils.resolveColor('text')}
        />
      </A>
      {renderExportModal()}
    </Nav>
  )
}

export default Navigation
