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
  anyOption?: AutocompleteOptionType
  value?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOptionType) => void
  inputProps?: Record<string, any>
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
  anyOption: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  inputProps: PropTypes.object,
}

const honorableNoValue = `HONORABLE_NO_VALUE_${Math.random()}`

function defaultRenderOption(option: AutocompleteOptionType) {
  if (typeof option === 'string') return option
  if (typeof option === 'object') return option.label

  // @ts-expect-error
  return option.toString()
}

function filterOptions(options: AutocompleteOptionType[], search: string, anyOption?: AutocompleteOptionType): AutocompleteOptionType[] {
  if (!Array.isArray(options)) return []

  const lowerCaseSearch = search?.toLowerCase() ?? ''

  return options.filter(option => {
    if (anyOption && option === anyOption) return true
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
    anyOption,
    autoHighlight = true,
    inputProps = {},
    ...otherProps
  } = props
  const theme = useTheme()
  const [baseInputProps, divProps]: [InputProps, DivProps] = pickProps(otherProps, inputPropTypes)
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(autocompleteRef, ref)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [hasFound, setHasFound] = useState(false)
  const [search, setSearch] = useState('')
  const [uncontrolledValue, setUncontrolledValue] = useState('')
  const [menuState, setMenuState] = useState<MenuStateType>({ activeItemIndex: autoHighlight ? 0 : -1 })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState])
  const { value: currentOptionValue, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const allOptions = useMemo(() => anyOption ? [...options, anyOption] : options, [anyOption, options])
  const filteredOptions = useMemo(() => filterOptions(allOptions, uncontrolledValue, anyOption), [allOptions, uncontrolledValue, anyOption])
  const actualValue = value ?? uncontrolledValue

  const workingProps = { ...props, value: actualValue }
  const rootStyles = useRootStyles('Autocomplete', workingProps, theme)

  const handleUnfocus = useCallback(() => {
    setFocused(false)
    setHasFound(false)
  }, [])

  const handleMenuFocus = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputClick = useCallback(() => {
    setFocused(true)
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
        event.preventDefault()

        const nextActiveItemIndex = Math.max(0, menuState.activeItemIndex - 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex }))
        }

        break
      }
      case 'ArrowDown': {
        event.preventDefault()

        const nextActiveItemIndex = Math.min(filteredOptions.length - 1, menuState.activeItemIndex + 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex }))
        }

        break
      }
      case 'Enter':
      case 'Tab': {
        event.preventDefault()

        const option = filteredOptions[menuState.activeItemIndex]

        if (option) {
          const { value, label } = getOptionValueAndLabel(option)

          setSearch(option === anyOption ? '' : label)
          setUncontrolledValue(value)
          setMenuState(x => ({ ...x, activeItemIndex: 0 }))
          setFocused(false)
          setHasFound(true)

          if (typeof onChange === 'function') onChange(value)
          if (typeof onSelect === 'function') onSelect(value)
        }
      }
    }
  }, [filteredOptions, anyOption, menuState, onChange, onSelect])

  const handleInputFocus = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setFocused(true)

    if (typeof baseInputProps.onFocus === 'function') baseInputProps.onFocus(event)
  }, [baseInputProps])

  const handleEndIconClick = useCallback(() => {
    setFocused(x => !x)
    setHasFound(false)
  }, [])

  useOutsideClick(autocompleteRef, handleUnfocus)

  useEffect(() => {
    const option = findInOptions(allOptions, value)

    if (option) {
      const { label } = getOptionValueAndLabel(option)

      setSearch(label)
    }
    else {
      setSearch(value)
    }

    setUncontrolledValue(value)
  }, [value, allOptions])

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
      setMenuState(x => ({ ...x, activeItemIndex: autoHighlight ? 0 : -1 }))

      const option = findInOptions(allOptions, currentOptionValue)

      if (!option) return

      const { value, label } = getOptionValueAndLabel(option)

      setSearch(label)
      setUncontrolledValue(value)

      if (typeof onChange === 'function') onChange(value)
      if (typeof onSelect === 'function') onSelect(value)
    }
  }, [previousEvent, event, allOptions, currentOptionValue, autoHighlight, onSelect, onChange])

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
        {...baseInputProps}
        inputProps={{ ref: inputRef, ...inputProps }}
        value={search}
        onClick={handleInputClick}
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
          noOutsideClick
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
          onFocus={handleMenuFocus}
          {...resolvePartStyles('Autocomplete.Menu', props, theme)}
        >
          {filteredOptions.length > 0 && filteredOptions.map(option => (
            <MenuItem
              key={typeof option === 'object' ? option.value : option}
              value={typeof option === 'object' ? option.value : option}
              onFocus={handleMenuFocus}
              {...resolvePartStyles('Autocomplete.MenuItem', props, theme)}
            >
              {renderOption(option)}
            </MenuItem>
          ))}
          {!!noOptionsNode && filteredOptions.length === 0 && (
            <MenuItem
              disabled
              value={honorableNoValue}
              onFocus={handleMenuFocus}
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
