import { useContext } from 'react'

import { Button, Div, H1, Modal, Pre } from 'honorable'

import UserThemeContext from '../contexts/UserThemeContext'

import stringify from '../utils/stringify'

function stringifyTheme(theme) {
  try {
    const clonedTheme = { ...theme }

    delete clonedTheme.rehydrated

    return `export default ${stringify(clonedTheme)}`
  }
  catch (error) {
    return 'An error occured'
  }
}

// TODO use Monaco
function ExportModal({ open, onClose }) {
  const [userTheme] = useContext(UserThemeContext)

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          {stringifyTheme(userTheme)}
        </Pre>
      </Div>
      <Div
        flexShrink={0}
        xflex="x6"
        p={1}
      >
        <Button
          variant="outlined"
          onClick={onClose}
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

export default ExportModal
