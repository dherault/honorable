import { ChangeEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { MenuStateType } from '../../contexts/MenuContext'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext'

import useTheme from '../../hooks/useTheme'
import usePrevious from '../../hooks/usePrevious'
import useForkedRef from '../../hooks/useForkedRef'
import useOutsideClick from '../../hooks/useOutsideClick'
import useRootStyles from '../../hooks/useRootStyles'

import pickProps from '../../utils/pickProps'
import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Caret } from '../Caret/Caret'
import { Menu } from '../Menu/Menu'
import { MenuItem } from '../MenuItem/MenuItem'
import { Input, InputProps, inputPropTypes } from '../Input/Input'
import { Div, DivProps } from '../tags'

export type AutocompleteOptionType = string | { label?: string; value?: string }

export type AutocompleteBaseProps = {
  options?: AutocompleteOptionType[],
  autoComplete?: boolean
  autoHighlight?: boolean
  freeSolo?: boolean
  onOpen?: (open: boolean) => void
  renderOption?: (option: any) => ReactNode
  noOptionsNode?: ReactNode
  value?: string
  onChange?: (value: string) => void
}

export type AutocompleteProps = Omit<InputProps, 'onChange'> & Omit<DivProps, 'onChange'> & AutocompleteBaseProps

const autocompletePropTypes = {
  ...inputPropTypes,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })])),
  autoComplete: PropTypes.bool,
  autoHighlight: PropTypes.bool,
  freeSolo: PropTypes.bool,
  onOpen: PropTypes.func,
  renderOption: PropTypes.func,
  noOptionsNode: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

const honorableNoValue = `HONORABLE_NO_VALUE_${Math.random()}`

function defaultRenderOption(option: AutocompleteOptionType) {
  if (typeof option === 'string') return option
  if (typeof option === 'object') return option.label

  // @ts-expect-error
  return option.toString()
}

function filterOptions(options: AutocompleteOptionType[], search: string): AutocompleteOptionType[] {
  if (!Array.isArray(options)) return []

  const lowerCaseSearch = search.toLowerCase()

  return options.filter(option => {
    if (typeof option === 'string') return option.toLowerCase().includes(lowerCaseSearch)
    if (typeof option === 'object') return option.label.toLowerCase().includes(lowerCaseSearch)

    // @ts-expect-error
    return option.toString().toLowerCase().includes(lowerCaseSearch)
  })
}

function findInOptions(options: AutocompleteOptionType[], value: string): AutocompleteOptionType {
  if (!Array.isArray(options)) return null

  return options.find(option => {
    if (typeof option === 'string') return option === value
    if (typeof option === 'object') return option.value === value

    // @ts-expect-error
    return option.toString() === value
  })
}

function AutocompleteRef(props: AutocompleteProps, ref: Ref<any>) {
  const {
    options = [],
    endIcon,
    onOpen,
    value,
    onChange,
    renderOption = defaultRenderOption,
    noOptionsNode = 'No options',
    autoHighlight = true,
    ...otherProps
  } = props
  const theme = useTheme()
  const [inputProps, divProps]: [InputProps, DivProps] = pickProps(otherProps, inputPropTypes)
  const autocompleteRef = useRef()
  const forkedRef = useForkedRef(autocompleteRef, ref)
  const [focused, setFocused] = useState(false)
  const [search, setSearch] = useState('')
  const [menuState, setMenuState] = useState<MenuStateType>({ defaultActiveItemIndex: autoHighlight ? 0 : -1 })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState])
  const { value: currentOptionValue, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const filteredOptions = useMemo(() => filterOptions(options, search), [options, search])
  const workingProps = { ...props }
  const rootStyles = useRootStyles('Autocomplete', workingProps, theme)

  useOutsideClick(autocompleteRef, () => {
    setFocused(false)
  })

  useEffect(() => {
    if (typeof onOpen === 'function') onOpen(focused)
  }, [onOpen, focused])

  useEffect(() => {
    if (event && previousEvent !== event) {
      setFocused(false)
      setMenuState(x => ({ ...x, defaultActiveItemIndex: autoHighlight ? 0 : -1 }))

      const option = findInOptions(options, currentOptionValue)
      const optionLabel = typeof option === 'string'
        ? option
        : typeof option === 'object'
          ? option.label
          // @ts-expect-error
          : option.toString()

      setSearch(optionLabel)
    }
  }, [previousEvent, event, options, currentOptionValue, autoHighlight])

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSearch(event.target.value)

    if (typeof onChange === 'function') onChange(event.target.value)
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    switch (event.key) {
      case 'ArrowUp': {
        const nextDefaultActiveItemIndex = Math.max(0, menuState.defaultActiveItemIndex - 1)

        if (menuState.defaultActiveItemIndex !== nextDefaultActiveItemIndex) {
          setMenuState(x => ({ ...x, defaultActiveItemIndex: nextDefaultActiveItemIndex }))
        }

        break
      }
      case 'ArrowDown': {
        const nextDefaultActiveItemIndex = Math.min(filteredOptions.length - 1, menuState.defaultActiveItemIndex + 1)

        if (menuState.defaultActiveItemIndex !== nextDefaultActiveItemIndex) {
          setMenuState(x => ({ ...x, defaultActiveItemIndex: nextDefaultActiveItemIndex }))
        }

        break
      }
      case 'Enter':
      case 'Tab': {
        event.preventDefault()

        const itemIndex = menuState.activeItemIndex === -1 ? menuState.defaultActiveItemIndex : menuState.activeItemIndex

        const item = filteredOptions[itemIndex]

        if (item) {
          const optionValue = typeof item === 'string'
            ? item
            : typeof item === 'object'
              ? item.value
              // @ts-expect-error
              : item.toString()

          setSearch(optionValue)
          setMenuState(x => ({ ...x, defaultActiveItemIndex: 0 }))

          if (typeof onChange === 'function') onChange(optionValue)
        }
      }
    }
  }

  return (
    <Div
      ref={forkedRef}
      display="inline-block"
      position="relative"
      {...rootStyles}
      {...divProps}
    >
      <Input
        {...inputProps}
        value={search}
        onChange={handleInputChange}
        endIcon={endIcon || <Caret rotation={focused ? 180 : 0} />}
        onFocus={event => {
          setFocused(true)
          if (typeof inputProps.onFocus === 'function') inputProps.onFocus(event)
        }}
        onKeyDown={handleInputKeyDown}
        {...resolvePartStyles('Autocomplete.Input', props, theme)}
      />
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          noFocus
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top="100%"
          right={0}
          left={0}
          zIndex={100}
          display={focused ? 'block' : 'none'}
          maxHeight={256}
          overflowY="auto"
          {...resolvePartStyles('Menu', props, theme)}
        >
          {filteredOptions.length > 0 && filteredOptions.map(option => (
            <MenuItem
              key={typeof option === 'object' ? option.value : option}
              value={typeof option === 'object' ? option.value : option}
              {...resolvePartStyles('Autocomplete.MenuItem', props, theme)}
            >
              {renderOption(option)}
            </MenuItem>
          ))}
          {filteredOptions.length === 0 && (
            <MenuItem
              disabled
              value={honorableNoValue}
              {...resolvePartStyles('Autocomplete.NoOption', props, theme)}
            >
              {noOptionsNode}
            </MenuItem>
          )}
        </Menu>
      </MenuUsageContext.Provider>
    </Div>
  )
}

export const Autocomplete = forwardRef(AutocompleteRef)

Autocomplete.displayName = 'Autocomplete'
Autocomplete.propTypes = autocompletePropTypes
