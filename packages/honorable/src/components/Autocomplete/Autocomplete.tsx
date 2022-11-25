import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  onSelect?: (option: AutocompleteOptionType) => void
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
  onSelect: PropTypes.func,
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

  const lowerCaseSearch = search?.toLowerCase() ?? ''

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

function getOptionValueAndLabel(option: AutocompleteOptionType) {
  if (typeof option === 'string') return { value: option, label: option }
  if (typeof option === 'object') return { value: option.value, label: option.label }

  // @ts-expect-error
  return { value: option.toString(), label: option.toString() }
}

function AutocompleteRef(props: AutocompleteProps, ref: Ref<any>) {
  const {
    options = [],
    endIcon,
    value,
    onOpen,
    onChange,
    onSelect,
    renderOption = defaultRenderOption,
    noOptionsNode = 'No options',
    autoHighlight = true,
    ...otherProps
  } = props
  const theme = useTheme()
  const [inputProps, divProps]: [InputProps, DivProps] = pickProps(otherProps, inputPropTypes)
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(autocompleteRef, ref)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [hasFound, setHasFound] = useState(false)
  const [search, setSearch] = useState('')
  const [uncontrolledValue, setUncontrolledValue] = useState('')
  const [menuState, setMenuState] = useState<MenuStateType>({ defaultActiveItemIndex: autoHighlight ? 0 : -1 })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState])
  const { value: currentOptionValue, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const filteredOptions = useMemo(() => filterOptions(options, uncontrolledValue), [options, uncontrolledValue])
  const actualValue = value ?? uncontrolledValue

  const workingProps = { ...props, value: actualValue }
  const rootStyles = useRootStyles('Autocomplete', workingProps, theme)

  const handleUnfocus = useCallback(() => {
    setFocused(false)
    setHasFound(false)
  }, [])

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    setUncontrolledValue(event.target.value)

    if (typeof onChange === 'function') onChange(event.target.value)

    if (!hasFound) {
      setFocused(true)
    }
  }, [onChange, hasFound])

  const handleInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        const optionIndex = menuState.activeItemIndex === -1 ? menuState.defaultActiveItemIndex : menuState.activeItemIndex

        const option = filteredOptions[optionIndex]

        if (option) {
          const { value, label } = getOptionValueAndLabel(option)

          setSearch(label)
          setUncontrolledValue(value)
          setMenuState(x => ({ ...x, defaultActiveItemIndex: 0 }))
          setFocused(false)
          setHasFound(true)

          if (typeof onChange === 'function') onChange(value)
          if (typeof onSelect === 'function') onSelect(value)
        }
      }
    }
  }, [filteredOptions, menuState, onChange, onSelect])

  const handleInputFocus = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setFocused(true)

    if (typeof inputProps.onFocus === 'function') inputProps.onFocus(event)
  }, [inputProps])

  const handleEndIconClick = useCallback(() => {
    setFocused(x => !x)
    setHasFound(false)
  }, [])

  useOutsideClick(autocompleteRef, handleUnfocus)

  useEffect(() => {
    const option = findInOptions(options, value)

    if (option) {
      const { label } = getOptionValueAndLabel(option)

      setSearch(label)
    }
    else {
      setSearch(value)
    }

    setUncontrolledValue(value)

  }, [value, options])

  useEffect(() => {
    if (!(focused && inputRef.current)) return

    inputRef.current.focus()
  }, [focused])

  useEffect(() => {
    if (typeof onOpen === 'function') onOpen(focused)
  }, [onOpen, focused])

  useEffect(() => {
    if (event && previousEvent !== event) {
      setFocused(false)
      setHasFound(true)
      setMenuState(x => ({ ...x, defaultActiveItemIndex: autoHighlight ? 0 : -1 }))

      const option = findInOptions(options, currentOptionValue)
      const { value, label } = getOptionValueAndLabel(option)

      setSearch(label)
      setUncontrolledValue(value)

      if (typeof onChange === 'function') onChange(value)
      if (typeof onSelect === 'function') onSelect(value)
    }
  }, [previousEvent, event, options, currentOptionValue, autoHighlight, onSelect, onChange])

  useEffect(() => {
    if (hasFound) {
      setHasFound(false)
    }
  }, [hasFound, uncontrolledValue]) // !

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
        inputProps={{ ref: inputRef }}
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        endIcon={(
          <Div
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleEndIconClick}
          >
            {endIcon || <Caret rotation={focused ? 180 : 0} />}
          </Div>
        )}
        width="100%"
        {...resolvePartStyles('Autocomplete.Input', props, theme)}
      />
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          noFocus
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top="100%"
          right={1}
          left={1}
          zIndex={100}
          display={focused && !hasFound ? 'block' : 'none'}
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
