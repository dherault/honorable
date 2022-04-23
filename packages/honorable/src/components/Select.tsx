import { Children, KeyboardEvent, MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import usePrevious from '../hooks/usePrevious'
import useOutsideClick from '../hooks/useOutsideClick'
import useEscapeKey from '../hooks/useEscapeKey'
import enhanceEventTarget from '../utils/enhanceEventTarget'
import resolvePartProps from '../utils/resolvePartProps'

import withHonorable from '../withHonorable'

import { Div, Span, Svg } from './tags'
import Menu from './Menu'

type SelectProps = ElementProps<'div'> & {
  children: ReactNode
  value?: any
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  fade?: boolean
}

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  fade: PropTypes.bool,
}

const defaultMenuState: MenuStateType = {
  activeItemIndex: -1,
  shouldFocus: true,
}

function Select(props: SelectProps) {
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
  const [opened, setOpened] = useState(false)
  const [menuState, setMenuState] = useState<MenuStateType>(defaultMenuState)
  const { value: currentValue, renderedItem, event } = menuState
  const previousEvent = usePrevious(event)

  useOutsideClick(selectRef, () => setOpened(false))
  useEscapeKey(() => setOpened(false))

  useEffect(() => {
    // console.log(previousEvent !== event)
    if (previousEvent !== event && typeof onChange === 'function') {
      onChange(enhanceEventTarget(event, { value: currentValue }))
      setOpened(false)
      setMenuState(x => ({ ...x, ...defaultMenuState }))
    }
  }, [previousEvent, event, currentValue, value, onChange])

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
        <Svg
          width={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transition="transform 150ms ease"
          transform={`rotate(${opened ? 180 : 0}deg)`}
        >
          <path
            d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </Svg>
      </Span>
    )
  }

  function renderMenu() {
    if (!opened) return null

    return (
      <Menu
        fade={fade}
        menuState={menuState}
        setMenuState={setMenuState}
        setUpdated={() => setOpened(false)}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        extend={resolvePartProps('select', 'menu', props, theme)}
      >
        {children}
      </Menu>
    )
  }

  return (
    <Div
      ref={selectRef}
      minWidth={128 + 32 + 8 + 2}
      display="inline-block"
      border="1px solid border"
      borderRadius={4}
      position="relative"
      {...otherProps}
    >
      <Div
        xflex="x4"
        cursor="pointer"
        onClick={event => {
          setOpened(x => !x)
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
      {renderMenu()}
    </Div>
  )
}

Select.propTypes = propTypes

export default withHonorable<SelectProps>(Select, 'select')
