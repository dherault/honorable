import { KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import { TargetWithChecked } from '../../types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Div, DivProps, Span } from '../tags'

export type SwitchBaseProps = {
  /**
   * Weither the Switch is checked or not
   */
  checked?: boolean
  /**
   * Weither the Switch is checked by default or not
   */
  defaultChecked?: boolean
  /**
   * Weither the Switch is disabled or not
   */
  disabled?: boolean
  /**
   * Callback function called when the Switch checked state changes
   */
  onChange?: (event: TargetWithChecked<MouseEvent | KeyboardEvent>) => void
  /**
   * The background react node of the Switch when it is checked.
   * Useful to place an emoji like 🌜
   */
  checkedBackground?: ReactNode
  /**
   * The background react node of the Switch when it not checked
   * Useful to place an emoji like 🌞
   */
  uncheckedBackground?: ReactNode
}

export type SwitchProps = Omit<DivProps, 'onChange'> & SwitchBaseProps

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

  useOverridenProps(props, { checked: actualChecked })

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
      setUncontrolledChecked(!actualChecked)
    }
  }

  return (
    <Div
      ref={ref}
      display="inline-flex"
      flexDirection="column"
      flexShrink={0}
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
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexGrow={1}
        >
          {checkedBackground}
        </Div>
      )}
      {!actualChecked && !!uncheckedBackground && (
        <Div
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
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
        {...resolvePartStyles('Handle', props, theme)}
      />
    </Div>
  )
}

SwitchRef.displayName = 'Switch'

const ForwaredSwitch = forwardRef(SwitchRef)

ForwaredSwitch.propTypes = switchPropTypes

export const Switch = withHonorable<SwitchProps>(ForwaredSwitch, 'Switch')
