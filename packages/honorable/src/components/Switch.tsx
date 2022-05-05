import { KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import useOverridenProps from '../hooks/useOverridenProps'

import resolvePartProps from '../utils/resolvePartProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Div, DivProps, Span } from './tags'

export type SwitchProps = DivProps & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  checkedBackground?: ReactNode
  uncheckedBackground?: ReactNode
}

export const switchPropTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checkedBackground: PropTypes.node,
  uncheckedBackground: PropTypes.node,
}

// TODO v1 decide weither to use actualChecked or uncontrolledChecked
// TODO v1 move styles to theme
function SwitchRef(props: SwitchProps, ref: Ref<any>) {
  const {
    __honorableOrigin,
    __honorableOverridenProps,
    __honorableSetOverridenProps,
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

  useOverridenProps(__honorableSetOverridenProps, { checked: actualChecked })

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
        {...resolvePartProps(`${__honorableOrigin}.Handle`, props, __honorableOverridenProps, theme)}
      />
    </Div>
  )
}

SwitchRef.displayName = 'Switch'

const ForwaredSwitch = forwardRef(SwitchRef)

ForwaredSwitch.propTypes = switchPropTypes

export const Switch = withHonorable<SwitchProps>(ForwaredSwitch, 'Switch')
