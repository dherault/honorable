import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { ElementProps } from '../types'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import usePrevious from '../hooks/usePrevious'
import useForkedRef from '../hooks/useForkedRef'
import useEscapeKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'
import resolvePartProps from '../utils/resolvePartProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import withHonorable from '../withHonorable'

import { Div, Span } from './tags'
import Menu from './Menu'
import Caret from './Caret'

type SelectProps = ElementProps<'div'> & {
  value?: any
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  fade?: boolean
}

const propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  fade: PropTypes.bool,
}

// TODO what if value changes
function Select(props: SelectProps, ref: Ref<any>) {
  const {
    children,
    onChange,
    value,
    fade,
    onClick,
    ...otherProps
  } = props
  const theme = useTheme()
  const selectRef = useRef()
  const forkedRef = useForkedRef(ref, selectRef)
  const [opened, setOpened] = useState(false) // TODO actualOpen
  const [menuState, setMenuState] = useState<MenuStateType>({ value })
  const { value: currentValue, renderedItem, event } = menuState
  const previousEvent = usePrevious(event)

  useEscapeKey(() => setOpened(false))
  useOutsideClick(selectRef, () => setOpened(false))

  useEffect(() => {
    if (previousEvent !== event && typeof onChange === 'function') {
      onChange(enhanceEventTarget(event, { value: currentValue }))
      setOpened(false)
      setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    }
  }, [previousEvent, event, currentValue, onChange])

  function renderSelected() {
    if (!renderedItem) return '\u00a0'

    const nodes: ReactElement[] = []

    Children.forEach(renderedItem, (child: ReactElement) => {
      if (child?.type === Menu) return

      nodes.push(child)
    })

    return nodes
  }

  function renderCaret() {
    return (
      <Span
        p={0.5}
        xflex="x5"
        userSelect="none"
        extend={resolvePartProps('select', 'caret', props, theme)}
      >
        <Caret rotation={opened ? 180 : 0} />
      </Span>
    )
  }

  return (
    <Div
      ref={forkedRef}
      minWidth={128 + 32 + 8 + 2}
      display="inline-block"
      borderRadius={4}
      position="relative"
      {...otherProps}
    >
      <Div
        xflex="x4"
        cursor="pointer"
        onClick={event => {
          setOpened(x => !x)
          setMenuState(x => ({ ...x, shouldFocus: true }))
          if (typeof onClick === 'function') onClick(event)
        }}
        extend={resolvePartProps('select', 'inner', props, theme)}
      >
        <Div
          py={0.5}
          pl={0.5}
          extend={resolvePartProps('select', 'selected', props, theme)}
        >
          {renderSelected()}
        </Div>
        <Span flexGrow={1} />
        {renderCaret()}
      </Div>
      <Menu
        fade={fade}
        menuState={menuState}
        setMenuState={setMenuState}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        display={opened ? 'block' : 'none'}
        extend={resolvePartProps('select', 'menu', props, theme)}
      >
        {children}
      </Menu>
    </Div>
  )
}

const ForwardedSelect = forwardRef(Select)

ForwardedSelect.propTypes = propTypes

export default withHonorable<SelectProps>(ForwardedSelect, 'select')
