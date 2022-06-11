import { Link, Outlet } from 'react-router-dom'
import { Div } from 'honorable'

import pages from '../../docs/pages'

function Documentation() {
  return (
    <Div xflex="x4s">
      <Div
        width={512 - 256 + 128 - 64 + 32 - 16 + 8 - 4 + 2}
      >
        {pages.map(({ path, title }) => (
          <Link
            to={path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Div
              p={1}
              color="primary"
              _hover={{ textDecoration: 'underline' }}
              key={path}
            >
              {title}
            </Div>
          </Link>
        ))}
      </Div>
      <Div mb={4}>
        <Outlet />
      </Div>
    </Div>
  )
}

export default Documentation
