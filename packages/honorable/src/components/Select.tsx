import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import enhanceEventTarget from '../utils/enhanceEventTarget'
import resolvePartProps from '../utils/resolvePartProps'

import withHonorable from '../withHonorable'

import { Div, Span, Svg } from './tags'
import Menu from './Menu'

type SelectProps = ElementProps<'div'> & {
  children: ReactNode
  value?: any
  onChange?: (event: MouseEvent) => void
}

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

function Select(props: SelectProps) {
  const { children, onChange, value, onClick, ...otherProps } = props
  const theme = useTheme()
  const [opened, setOpened] = useState(false)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const { value: currentValue, renderedItem, event } = menuState

  useEffect(() => {
    if (event && currentValue !== value) {
      onChange(enhanceEventTarget(event, { value: currentValue }))
    }
  }, [event, currentValue, value, onChange])

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

  function renderMenu(hidden = false) {
    return (
      <Menu
        menuState={menuState}
        setMenuState={setMenuState}
        setUpdated={() => setOpened(false)}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        display={hidden ? 'none' : 'block'}
        extend={resolvePartProps('select', 'menu', props, theme)}
      >
        {children}
      </Menu>
    )
  }

  return (
    <Div
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
          {renderedItem || '\u00a0'}
        </Div>
        <Span flexGrow={1} />
        {renderCaret()}
      </Div>
      {renderMenu(!opened)}
    </Div>
  )
}

Select.propTypes = propTypes

export default withHonorable<SelectProps>(Select, 'select')
