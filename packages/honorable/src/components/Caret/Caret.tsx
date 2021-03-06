import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import { Svg, SvgProps } from '../tags'

export type CaretBaseProps = {
  /**
   * The rotation of the Caret
   */
  rotation?: number
}

export type CaretProps = SvgProps & CaretBaseProps

export const caretPropTypes = {
  rotation: PropTypes.number,
}

function CaretRef(props: CaretProps, ref: Ref<any>) {
  const { rotation = 0, ...otherProps } = props
  const theme = useTheme()
  const workingProps = { ...props, rotation }
  const rootStyles = useRootStyles('Caret', workingProps, theme)

  return (
    <Svg
      ref={ref}
      width={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transition="transform 150ms ease"
      transform={`rotate(${rotation}deg)`}
      {...rootStyles}
      {...otherProps}
    >
      <path
        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  )
}

export const Caret = forwardRef(CaretRef)

Caret.displayName = 'Caret'
Caret.propTypes = caretPropTypes
