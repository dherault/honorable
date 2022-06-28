import { Link, Outlet } from 'react-router-dom'
import { Div } from 'honorable'

import components from '../../docs/components'
import pages from '../../docs/pages'

function Documentation() {
  const sidebarWidth = 256 + 64 + 16 + 4

  return (
    <Div xflex="x4s">
      <Div
        width={sidebarWidth}
        flexShrink={0}
        pt={2}
      >
        {pages.map(({ path, title }) => (
          <Link
            key={path}
            to={path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Div
              py={0.5}
              px={2}
              color="primary"
              _hover={{ textDecoration: 'underline' }}
            >
              {title}
            </Div>
          </Link>
        ))}
        {components.map(({ name, path }) => (
          <Link
            key={path}
            to={path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Div
              py={0.5}
              px={2}
              color="primary"
              _hover={{ textDecoration: 'underline' }}
            >
              {name}
            </Div>
          </Link>
        ))}
      </Div>
      <Div
        mb={4}
        p={2}
        pl={0}
        width={`calc(100% - ${sidebarWidth}px)`}
        flexGrow={1}
        flexShrink={1}
      >
        <Outlet />
      </Div>
    </Div>
  )
}

export default Documentation
