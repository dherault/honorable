import { ComponentType, Ref, forwardRef } from 'react'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
// @ts-ignore
import fp from 'flexpad'

import {
  HonorableProps,
  InnerHonorableProps,
  MpProperties,
  MpProps,
  StyleProperties,
  StyleProps,
  StyledHonorableProps,
} from './types'

import styleProperties from './data/styleProperties'
import mpProperties from './data/mpProperties'

import useTheme from './hooks/useTheme'

import filterObject from './utils/filterObject'
import capitalize from './utils/capitalize'
import isSelector from './utils/isSelector'
import convertMp from './utils/convertMp'
import resolveAll from './utils/resolveAll'
import resolveAliases from './utils/resolveAliases'
import resolveCustomProps from './utils/resolveCustomProps'

// React HOC to support style props
function withHonorable<P>(ComponentOrTag: string | ComponentType, name: string) {
  const componentPropsTypes = typeof ComponentOrTag === 'string' ? {} : ComponentOrTag.propTypes || {}
  const propTypeKeys = Object.keys(componentPropsTypes)

  const HonorableStyle = styled(
    ComponentOrTag as ComponentType<StyledHonorableProps & P>,
    {
      shouldForwardProp: prop => isPropValid(prop) || propTypeKeys.includes(prop as string),
    }
  )(props => props.honorable)

  function Honorable(props: InnerHonorableProps<P>) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const { honorableRef, xflex, extend = {}, ...nextProps } = props
    const styleProps: StyleProps = {}
    const mpProps: MpProps = {}
    const otherProps = {} as P
    const resolvedProps = resolveAliases(nextProps as StyleProps, theme)
    const resolvedDefaultProps = resolveAliases(filterObject(defaultProps) as StyleProps, theme)
    const resolvedWorkingProps = { ...resolvedDefaultProps, ...resolvedProps }
    const resolvedCustomProps = resolveAliases(resolveCustomProps(customProps, resolvedWorkingProps, theme), theme)

    Object.entries(resolvedProps).forEach(([key, value]) => {
      if (mpProperties.includes(key as MpProperties)) {
        mpProps[key] = value
      }
      else if (styleProperties.includes(key as StyleProperties) || isSelector(key)) {
        styleProps[key] = value
      }
      else {
        otherProps[key] = value
      }
    })

    return (
      <HonorableStyle
        ref={honorableRef}
        theme={theme}
        honorable={(
          resolveAll(
            {
              /* eslint-disable no-multi-spaces */
              ...resolveCustomProps(                  // Global customProps
                theme.global?.customProps,
                { ...resolvedWorkingProps, ...resolvedCustomProps },
                theme
              ),
              ...filterObject(resolvedDefaultProps),  // Component defaultProps
              ...resolvedCustomProps,                 // Component customProps
              ...convertMp(mpProps, theme),                  // "mp" prop
              ...(xflex ? fp(xflex) : {}),            // "xflex" prop
              ...styleProps,                          // Actual style from props
              ...filterObject(extend),                // "extend" prop
              /* eslint-enable no-multi-spaces */
            },
            theme
          )
        )}
        {...otherProps}
      />
    )
  }

  const displayName = capitalize(name)

  Honorable.displayName = `Honorable(Honorable${displayName})`

  const forwardHonorableRef = (props: HonorableProps<P>, ref: Ref<any>) => (
    <Honorable
      {...props}
      honorableRef={ref}
    />
  )

  forwardHonorableRef.displayName = `Honorable(${displayName})`

  const ForwardedHonorable = forwardRef<any, HonorableProps<P>>(forwardHonorableRef)

  ForwardedHonorable.displayName = forwardHonorableRef.displayName

  return ForwardedHonorable
}

export default withHonorable
