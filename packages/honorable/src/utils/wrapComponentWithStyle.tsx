import React, { ComponentType, HTMLAttributes, Ref, forwardRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
// @ts-ignore
import fp from 'flexpad'

import {
  AnyProps,
  ExtendProps,
  HonorableStyleProps,
  RefProps,
  StyleProps,
  StylePropsValue,
} from '../types'

import useTheme from '../hooks/useTheme'

import { stylePropTypes, styleProperties } from '../data/styleProperties'
import { mpPropTypes, mpProperties } from '../data/mpProperties'

import resolveColor from './resolveColor'
import filterObject from './filterObject'
import capitalize from './capitalize'
import isSelector from './isSelector'
import convertMp from './convertMp'
import resolveCustomProps from './resolveCustomProps'
import resolveWebkitProperties from './resolveWebkitProperties'

// React HOC to support style props
function wrapComponentWithStyle(ComponentOrTag: string | ComponentType, name = 'Honorable') {
  const componentPropsTypes = typeof ComponentOrTag === 'string' ? {} : ComponentOrTag.propTypes
  const propTypeKeys = Object.keys(componentPropsTypes)
  const propTypes = {
    // TODO add standard props
    // https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/possibleStandardNames.js
    // IN case HTMLAttributes<HTMLElement> is not enough
    ...componentPropsTypes,
    ...stylePropTypes,
    ...mpPropTypes,
    xflex: PropTypes.string,
  }

  const HonorableStyle = styled(
    ComponentOrTag as ComponentType,
    {
      shouldForwardProp: prop => isPropValid(prop) || propTypeKeys.includes(prop as string),
    }
  )((props: HonorableStyleProps) => props.honorable)

  function Honorable(props: InferProps<typeof propTypes> & HTMLAttributes<HTMLElement> & ExtendProps & RefProps) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const { honorableRef, xflex, extend = {}, ...nextProps } = props
    const stylePropsFromProps: StyleProps = {}
    const mpProps: StyleProps = {}
    const otherProps: AnyProps = {}
    const workingProps = { ...filterObject(defaultProps), ...props }
    const resolvedCustomProps = resolveCustomProps(customProps, workingProps, theme)

    Object.entries(nextProps).forEach(([key, value]) => {
      if (mpProperties.includes(key)) {
        mpProps[key] = value as StylePropsValue
      }
      else if (styleProperties.includes(key) || isSelector(key)) {
        stylePropsFromProps[key] = value as StylePropsValue
      }
      else {
        otherProps[key] = value
      }
    })

    return (
      <HonorableStyle
        ref={honorableRef}
        honorable={resolveColor(
          null,
          resolveWebkitProperties({
            /* eslint-disable no-multi-spaces */
            ...resolveCustomProps(theme.global?.customProps, { ...workingProps, ...resolvedCustomProps }, theme),  // Global customProps
            ...filterObject(defaultProps),                                      // Component defaultProps
            ...resolvedCustomProps,                // Component customProps
            ...convertMp(mpProps),                                              // "mp" prop
            ...(xflex ? fp(xflex) : {}),                                        // "xflex" prop
            ...stylePropsFromProps,                                             // Actual style from props
            ...filterObject(extend),                                            // "extend" prop
            /* eslint-enable no-multi-spaces */
          }),
          theme
        ) as StyleProps}
        {...otherProps}
      />
    )
  }

  const displayName = capitalize(name)

  Honorable.displayName = `Honorable(Honorable${displayName})`

  Honorable.propTypes = propTypes

  const forwardHonorableRef = (props: AnyProps, ref: Ref<any>) => (
    <Honorable
      {...props}
      honorableRef={ref}
    />
  )

  forwardHonorableRef.displayName = `Honorable(${displayName})`

  const ForwardedHonorable = forwardRef(forwardHonorableRef)

  ForwardedHonorable.displayName = forwardHonorableRef.displayName
  ForwardedHonorable.propTypes = propTypes

  return ForwardedHonorable
}

export default wrapComponentWithStyle
