import React from 'react'
import styled from 'styled-components'

import useTheme from '../hooks/useTheme'

import { Div, Span } from './tags'

function extend(componentTheme, key, props) {
  return null
}

const Handle = styled(Span)`
  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.utils.resolveColor('shadow')};
  }
`

function Switch({ checked, onChange, ...props }) {
  const theme = useTheme()
  const componentTheme = theme.switch || {}
  const extendProps = { checked, ...props }

  return (
    <Div
      flexpad="x4"
      display="inline-flex"
      position="relative"
      width={50}
      height={24}
      borderRadius={24 / 2}
      backgroundColor="background-light"
      userSelect="none"
      cursor="pointer"
      extend={extend(componentTheme, 'root', extendProps)}
      onClick={event => onChange(event, !checked)}
    >
      <Handle
        position="relative"
        width={22}
        height={22}
        borderRadius={22 / 2}
        backgroundColor="white"
        left={checked ? 'calc(100% - 24px)' : 2}
        transition="left 150ms ease"
        extend={extend(componentTheme, 'handle', extendProps)}
      />
    </Div>
  )
}

export default Switch
