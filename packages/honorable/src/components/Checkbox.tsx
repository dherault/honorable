import { MouseEvent, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'

import enhanceEventTarget from '../utils/enhanceEventTarget'
import withHonorable from '../withHonorable'

import { Span } from './tags'

const Root = styled(Span)`
  &:hover {
    border: 1px solid ${({ theme }) => theme.utils.resolveColor('primary')};
  }
`
// https://icons.modulz.app/
const defaultIcon = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

function Checkbox({
  checked = null as boolean | null,
  icon = defaultIcon,
  onChange = (event: MouseEvent) => {},
  onClick = (event: MouseEvent) => {},
  ...props
}: InferProps<typeof Checkbox.propTypes>) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false)
  const actualChecked = typeof checked === 'boolean' ? checked : uncontrolledChecked

  return (
    <Root
      xflex="x5"
      display="inline-flex"
      color="white"
      backgroundColor={actualChecked ? 'primary' : 'transparent'}
      borderStyle="solid"
      borderWidth={1}
      borderRadius={2}
      borderColor={actualChecked ? 'primary' : 'border'}
      cursor="pointer"
      width={24}
      height={24}
      {...props}
      onClick={(event: MouseEvent) => {
        if (typeof onClick === 'function') onClick(event)
        if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !checked }))
        setUncontrolledChecked(!actualChecked)
      }}
    >
      {actualChecked && icon}
    </Root>
  )
}

Checkbox.propTypes = {
  ...Span.propTypes,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
}

export default withHonorable(Checkbox, 'checkbox')
