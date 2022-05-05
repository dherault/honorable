import { ReactElement, ReactNode, Ref, cloneElement, forwardRef, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import resolvePartProps from '../../resolvers/resolvePartProps'

import { Div, DivProps } from '../tags'

export type AdjacentLabelProps = DivProps & {
  control?: ReactElement
  label?: ReactNode
}

export const AdjacentLabelPropTypes = {
  control: PropTypes.element,
  label: PropTypes.node,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
}

// TODO Edit this
function AdjacentLabelRef(props: AdjacentLabelProps, ref: Ref<any>) {
  const {
    label,
    control,
    ...otherProps
  } = props
  const theme = useTheme()
  // Determine wether control is checked
  const isControlChecked = useCallback(() => {
    let checked = false
    if (typeof control?.props?.__honorableOverridenProps?.defaultChecked !== 'undefined') {
      checked = control.props.__honorableOverridenProps.defaultChecked
    }
    if (typeof control?.props?.__honorableOverridenProps?.checked !== 'undefined') {
      checked = control.props.__honorableOverridenProps.checked
    }

    return checked
  }, [control])

  const [uncontrolledChecked, setUncontrolledChecked] = useState(isControlChecked())

  // Override `checked` prop in defaultProps
  useOverridenProps(props, { checked: uncontrolledChecked })

  useEffect(() => {
    setUncontrolledChecked(isControlChecked())
  }, [isControlChecked])

  return (
    <Div
      ref={ref}
      xflex="x4"
      {...otherProps}
      onClick={event => {
        setUncontrolledChecked(x => !x)
        if (typeof props.onClick === 'function') props.onClick(event)
      }}
    >
      {cloneElement(control, {
        checked: uncontrolledChecked,
      })}
      <Div
        {...resolvePartProps('Label', props, theme)}
      >
        {label}
      </Div>
    </Div>
  )
}

AdjacentLabelRef.displayName = 'AdjacentLabel'

const ForwaredAdjacentLabel = forwardRef(AdjacentLabelRef)

ForwaredAdjacentLabel.propTypes = AdjacentLabelPropTypes

export const AdjacentLabel = withHonorable<AdjacentLabelProps>(ForwaredAdjacentLabel, 'AdjacentLabel')
