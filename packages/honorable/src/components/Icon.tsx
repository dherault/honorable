import { IconProps } from '../types'

// @ts-ignore
import { Span } from './tags'

function Icon({ children, className, ...props }: IconProps) {
  return (
    <Span
      xflex="x5"
      className={className}
      {...props}
    >
      {children}
    </Span>
  )
}

export default Icon
