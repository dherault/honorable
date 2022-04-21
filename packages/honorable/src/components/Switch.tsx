import { MouseEvent, ReactNode, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import resolvePartProps from '../utils/resolvePartProps'
import withHonorable from '../withHonorable'
import enhanceEventTarget from '../utils/enhanceEventTarget'
import useTheme from '../hooks/useTheme'

import { Div, Span } from './tags'

type SwitchProps = ElementProps<'div'> & {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onChange?: (event: MouseEvent) => void
  onClick?: (event: MouseEvent) => void
  checkedBackground?: ReactNode
  uncheckedBackground?: ReactNode
}

const propTypes = {
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  checkedBackground: PropTypes.node,
  uncheckedBackground: PropTypes.node,
}

function Switch(props: SwitchProps) {
  const {
    defaultChecked,
    checked,
    disabled,
    onChange,
    onClick,
    checkedBackground = null,
    uncheckedBackground = null,
    ...otherProps
  } = props

  const theme = useTheme()
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const actualChecked = typeof checked === 'boolean' ? checked : uncontrolledChecked

  return (
    <Div
      xflex="y2s"
      flexShrink={0}
      display="inline-flex"
      position="relative"
      width={50}
      height={24}
      borderRadius={24 / 2}
      backgroundColor="background-light"
      userSelect="none"
      cursor="pointer"
      onClick={event => {
        if (typeof onClick === 'function') onClick(event)
        if (disabled) return
        if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
        setUncontrolledChecked(!actualChecked)
      }}
      role="button"
      {...otherProps}
    >
      {actualChecked && !!checkedBackground && (
        <Div
          xflex="x4"
          flexGrow={1}
        >
          {checkedBackground}
        </Div>
      )}
      {!actualChecked && !!uncheckedBackground && (
        <Div
          xflex="x6"
          flexGrow={1}
        >
          {uncheckedBackground}
        </Div>
      )}
      <Span
        position="absolute"
        width={20}
        height={20}
        borderRadius={20 / 2}
        backgroundColor="white"
        top={2}
        left={actualChecked ? 'calc(100% - 22px)' : 2}
        transition="left 150ms ease"
        extend={resolvePartProps('switch', 'handle', props, theme)}
      />
    </Div>
  )
}

Switch.propTypes = propTypes

export default withHonorable<SwitchProps>(Switch, 'switch')
