import { KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, CssProps, TargetWithChecked } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyle from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import enhanceEventTarget from '../../utils/enhanceEventTarget'
import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div, Span } from '../tags'

export const switchParts = ['Control', 'CheckedBackground', 'UncheckedBackground', 'Handle', 'Children'] as const

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
  /**
   * The position of the label relative to the Checkbox
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom' | string
}

export type SwitchProps = ComponentProps<SwitchBaseProps, 'div', typeof switchParts[number]>

export const switchPropTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checkedBackground: PropTypes.node,
  uncheckedBackground: PropTypes.node,
  labelPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
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
    labelPosition = 'right',
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const actualChecked = typeof checked === 'boolean' ? checked : uncontrolledChecked
  const workingProps = { ...props, checked: actualChecked }
  const rootStyles = useRootStyle('Switch', workingProps, theme)

  const flexProps: CssProps = labelPosition === 'left'
    ? { justifyContent: 'flex-start', flexDirection: 'row-reverse' }
    : labelPosition === 'top'
      ? { justifyContent: 'flex-end', flexDirection: 'column-reverse' }
      : labelPosition === 'bottom'
        ? { justifyContent: 'flex-start', flexDirection: 'column' }
        : { justifyContent: 'flex-start' }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
      setUncontrolledChecked(!actualChecked)
    }
  }

  return (
    <Div
      ref={ref}
      display="flex"
      alignItems="center"
      tabIndex={0}
      userSelect="none"
      cursor="pointer"
      {...flexProps}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
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
      <Div
        display="flex"
        flexDirection="column"
        flexShrink={0}
        position="relative"
        width={50}
        height={24}
        borderRadius={24 / 2}
        role="button"
        {...resolvePartStyles('Switch.Control', workingProps, theme)}
      >
        {actualChecked && !!checkedBackground && (
          <Div
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexGrow={1}
            {...resolvePartStyles('Switch.CheckedBackground', workingProps, theme)}
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
            {...resolvePartStyles('Switch.UncheckedBackground', workingProps, theme)}
          >
            {uncheckedBackground}
          </Div>
        )}
        <Span
          position="absolute"
          width={20}
          height={20}
          borderRadius="50%"
          backgroundColor="white"
          top={2}
          left={actualChecked ? 'calc(100% - 22px)' : 2}
          transition="left 150ms ease"
          {...resolvePartStyles('Switch.Handle', workingProps, theme)}
        />
      </Div>
      {!!children && (
        <Div {...resolvePartStyles('Switch.Children', workingProps, theme)}>
          {children}
        </Div>
      )}
    </Div>
  )
}

export const Switch = forwardRef(SwitchRef)

Switch.displayName = 'Switch'
Switch.propTypes = switchPropTypes
