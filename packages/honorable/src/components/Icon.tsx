import PropTypes, { InferProps } from 'prop-types'

import wrapComponentWithStyle from '../utils/wrapComponentWithStyle'

// @ts-ignore
import { Span } from './tags'

function Icon({ children, className, ...props }: InferProps<typeof Icon.propTypes>) {
  return (
    <Span
      className={className}
      xflex="x5"
      {...props}
    >
      {children}
    </Span>
  )
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Icon.defaultProps = {
  className: '',
}

export default wrapComponentWithStyle(Icon, 'icon')
