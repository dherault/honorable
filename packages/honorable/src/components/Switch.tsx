import React, { MouseEvent } from 'react'
import styled from '@emotion/styled'
import PropTypes, { InferProps } from 'prop-types'

import extractComponentThemeStyle from '../utils/extractComponentThemeStyle'
import wrapComponentWithStyle from '../utils/wrapComponentWithStyle'
import useTheme from '../hooks/useTheme'

// @ts-ignore
import { Div, Span } from './tags'

const Handle = styled(Span)`
  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.utils.resolveColor('shadow')};
  }
`

function Switch({ checked, onChange, checkedBackground, uncheckedBackground, className, ...props }: InferProps<typeof Switch.propTypes>) {
  const theme = useTheme()
  const extendProps = { checked, checkedBackground, uncheckedBackground, ...props }

  return (
    <Div
      className={className}
      xflex="y2s"
      display="inline-flex"
      position="relative"
      width={50}
      height={24}
      borderRadius={24 / 2}
      backgroundColor="background-light"
      userSelect="none"
      cursor="pointer"
      extend={extractComponentThemeStyle(theme.switch, 'root', extendProps)}
      onClick={(event: MouseEvent) => onChange(!checked, event)}
      role="button"
    >
      {checked && !!checkedBackground && (
        <Div
          xflex="x4"
          flexGrow={1}
        >
          {checkedBackground}
        </Div>
      )}
      {!checked && !!uncheckedBackground && (
        <Div
          xflex="x6"
          flexGrow={1}
        >
          {uncheckedBackground}
        </Div>
      )}
      <Handle
        position="absolute"
        width={20}
        height={20}
        borderRadius={20 / 2}
        backgroundColor="white"
        top={2}
        left={checked ? 'calc(100% - 22px)' : 2}
        transition="left 150ms ease"
        extend={extractComponentThemeStyle(theme.switch, 'handle', extendProps)}
      />
    </Div>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  checkedBackground: PropTypes.node,
  uncheckedBackground: PropTypes.node,
  className: PropTypes.string,
}

Switch.defaultProps = {
  checked: false,
  onChange: () => {},
  checkedBackground: null,
  uncheckedBackground: null,
  className: '',
}

export default wrapComponentWithStyle(Switch, 'switch')
