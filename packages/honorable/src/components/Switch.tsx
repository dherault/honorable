import { KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import resolvePartProps from '../utils/resolvePartProps'
import withHonorable from '../withHonorable'
import enhanceEventTarget from '../utils/enhanceEventTarget'
import useTheme from '../hooks/useTheme'

import { Div, DivProps, Span } from './tags'

export type SwitchProps = DivProps & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  checkedBackground?: ReactNode
  uncheckedBackground?: ReactNode
}

const propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checkedBackground: PropTypes.node,
  uncheckedBackground: PropTypes.node,
}

// TODO v1 decide weither to use actualChecked or uncontrolledChecked
function SwitchRef(props: SwitchProps, ref: Ref<any>) {
  const {
    defaultChecked,
    checked,
    disabled,
    onChange,
    checkedBackground = null,
    uncheckedBackground = null,
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const actualChecked = typeof checked === 'boolean' ? checked : uncontrolledChecked

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
      setUncontrolledChecked(!actualChecked)
    }
  }

  return (
    <Div
      ref={ref}
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
      role="button"
      tabIndex={0}
      {...otherProps}
      onClick={event => {
        if (disabled) return
        if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
        if (typeof props.onClick === 'function') props.onClick(event)
        setUncontrolledChecked(!actualChecked)
      }}
      onKeyDown={event => {
        if (disabled) return
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
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
        extend={resolvePartProps('switch', 'Handle', props, theme)}
      />
    </Div>
  )
}

SwitchRef.displayName = 'Switch'

const ForwaredSwitch = forwardRef(SwitchRef)

ForwaredSwitch.propTypes = propTypes

export const Switch = withHonorable<SwitchProps>(ForwaredSwitch, 'Switch')
