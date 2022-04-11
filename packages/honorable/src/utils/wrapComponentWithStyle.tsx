import React, { ComponentType, FC, HTMLAttributes } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'
// @ts-ignore
import fp from 'flexpad'

import useTheme from '../hooks/useTheme'

import {
  AnyProps,
  ExtendProps,
  HonorableStyleProps,
  StyleProps,
  StylePropsValue,
} from '../types'

import resolveColor from './resolveColor'
import filterObject from './filterObject'
import isSelector from './isSelector'
import convertMp from './convertMp'
import resolveCustomProps from './resolveCustomProps'
import { stylePropTypes, styleProperties } from './styleProperties'
import { mpPropTypes, mpProperties } from './mpProperties'

function wrapComponentWithStyle(ComponentOrTag: string | ComponentType, name = 'Honorable') {
  const HonorableStyle: FC<HonorableStyleProps> = styled(ComponentOrTag as ComponentType)(props => props.honorable)

  function Honorable(props: InferProps<typeof Honorable.propTypes> & HTMLAttributes<HTMLElement> & ExtendProps) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const { xflex, extend = {}, ...nextProps } = props
    const stylePropsFromProps: StyleProps = {}
    const mpProps: StyleProps = {}
    const otherProps: AnyProps = {}

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
        honorable={resolveColor(
          null,
          {
            /* eslint-disable no-multi-spaces */
            ...resolveCustomProps(theme.global?.customProps, props, theme),   // Global customProps
            ...filterObject(defaultProps),                                    // Component defaultProps
            ...resolveCustomProps(customProps, props, theme),                 // Component customProps
            ...convertMp(mpProps),                                            // "mp" prop
            ...(xflex ? fp(xflex) : {}),                                      // "xflex" prop
            ...stylePropsFromProps,                                           // Actual style from props
            ...filterObject(extend),                                          // "extend" prop
            /* eslint-enable no-multi-spaces */
          },
          theme
        ) as StyleProps}
        {...otherProps}
      />
    )
  }

  Honorable.displayName = name

  Honorable.propTypes = {
    // TODO add standard props
    // https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/possibleStandardNames.js
    // IN case HTMLAttributes<HTMLElement> is not enough
    ...(typeof ComponentOrTag === 'string' ? {} : ComponentOrTag.propTypes),
    ...stylePropTypes,
    ...mpPropTypes,
    xflex: PropTypes.string,
  }

  return Honorable
}

export default wrapComponentWithStyle
