import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import { MenuStateType } from '../../contexts/MenuContext.js'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext.js'

import useTheme from '../../hooks/useTheme.js'
import usePrevious from '../../hooks/usePrevious.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useOutsideClick from '../../hooks/useOutsideClick.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import pickProps from '../../utils/pickProps.js'
import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Caret } from '../Caret/Caret.js'
import { Menu } from '../Menu/Menu.js'
import { MenuItem } from '../MenuItem/MenuItem.js'
import { Input, InputBaseProps, inputPropTypes } from '../Input/Input.js'
import { Div, DivProps } from '../tags.js'

export const autocompleteParts = ['Input', 'Menu', 'MenuItem', 'NoOption'] as const

const autocompletePropTypes = {
  ...inputPropTypes,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })])),
  autoComplete: PropTypes.bool,
  freeSolo: PropTypes.bool,
  onOpen: PropTypes.func,
  renderOption: PropTypes.func,
  noOptionsNode: PropTypes.node,
  anyOption: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  inputProps: PropTypes.object,
  forceOpen: PropTypes.bool,
  onForceOpen: PropTypes.func,
}

export type AutocompleteOptionType = string | { label: string; value: string }

export type AutocompleteBaseProps = InputBaseProps & {
  options?: AutocompleteOptionType[],
  autoComplete?: boolean
  freeSolo?: boolean
  onOpen?: (open: boolean) => void
  renderOption?: (option: any) => ReactNode
  noOptionsNode?: ReactNode
  anyOption?: AutocompleteOptionType
  value?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOptionType) => void
  inputProps?: Record<string, any>
  forceOpen?: boolean
  onForceOpen?: () => void
}

export type AutocompleteProps = ComponentProps<AutocompleteBaseProps, 'div', typeof autocompleteParts[number]>

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

  if (!lowerCaseSearch) return options

  return options.filter(option => {
    if (anyOption && option === anyOption) return true
    if (typeof option === 'string') return option.toLowerCase().includes(lowerCaseSearch)
    if (typeof option === 'object') return option.label.toLowerCase().includes(lowerCaseSearch)

    // @ts-expect-error
    return option.toString().toLowerCase().includes(lowerCaseSearch)
  })
}

function findInOptions(options: AutocompleteOptionType[], value: string): AutocompleteOptionType | null {
  if (!Array.isArray(options)) return null

  return options.find(option => {
    if (typeof option === 'string') return option === value
    if (typeof option === 'object') return option.value === value

    // @ts-expect-error
    return option.toString() === value
  }) ?? null
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
    inputProps = {},
    forceOpen,
    onForceOpen,
    ...otherProps
  } = props
  const theme = useTheme()
  const [baseInputProps, divProps] = pickProps<InputBaseProps, DivProps>(otherProps, inputPropTypes)
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(autocompleteRef, ref)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [hasFound, setHasFound] = useState(false)
  const [search, setSearch] = useState('')
  const [uncontrolledValue, setUncontrolledValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuStateType>({ activeItemIndex: 0 })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState])
  const { value: currentOptionValue, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const allOptions = useMemo(() => anyOption ? [...options, anyOption] : options, [anyOption, options])
  const filteredOptions = useMemo(() => filterOptions(allOptions, search, anyOption), [allOptions, search, anyOption])
  const actualValue = value ?? uncontrolledValue

  const workingProps = { ...props, value: actualValue }
  const rootStyles = useRootStyles('Autocomplete', workingProps, theme)

  const handleUnfocus = useCallback(() => {
    if (forceOpen) return

    setFocused(false)
    setIsMenuOpen(false)
    setHasFound(false)
  }, [forceOpen])

  const handleMenuFocus = useCallback(() => {
    inputRef.current?.focus()
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

        const nextActiveItemIndex = Math.max(0, (menuState.activeItemIndex ?? -1) - 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex }))
        }

        break
      }
      case 'ArrowDown': {
        event.preventDefault()

        const nextActiveItemIndex = Math.min(filteredOptions.length - 1, (menuState.activeItemIndex ?? -1) + 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex }))
        }

        break
      }
      case 'Enter':
      case 'Tab': {
        event.preventDefault()

        const option = filteredOptions[(menuState.activeItemIndex ?? -1)]

        if (option) {
          const { value, label } = getOptionValueAndLabel(option)

          setSearch(label)
          setUncontrolledValue(value)
          setMenuState(x => ({ ...x, activeItemIndex: 0 }))
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
    setIsMenuOpen(true)

    if (typeof baseInputProps.onFocus === 'function') baseInputProps.onFocus(event)
  }, [baseInputProps])

  const handleEndIconClick = useCallback(() => {
    setFocused(x => !x)
    setIsMenuOpen(x => !x)
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
    if (typeof onOpen === 'function') onOpen(isMenuOpen && focused && !hasFound)
  }, [onOpen, isMenuOpen, focused, hasFound])

  useEffect(() => {
    if (event && previousEvent !== event) {
      setFocused(false)
      setHasFound(true)
      setMenuState(x => ({ ...x, activeItemIndex: 0 }))

      const option = findInOptions(allOptions, currentOptionValue)

      if (!option) return

      const { value, label } = getOptionValueAndLabel(option)

      setSearch(option === anyOption ? '' : label)
      setUncontrolledValue(value)

      if (typeof onChange === 'function') onChange(value)
      if (typeof onSelect === 'function') onSelect(value)
    }
  }, [previousEvent, event, allOptions, anyOption, currentOptionValue, onSelect, onChange])

  useEffect(() => {
    if (hasFound) {
      setHasFound(false)
    }
  }, [hasFound, uncontrolledValue]) // !

  useEffect(() => {
    if (!forceOpen) return

    setFocused(true)
    setIsMenuOpen(true)
    setHasFound(false)

    if (typeof onForceOpen === 'function') onForceOpen()
  }, [forceOpen, onForceOpen])

  return (
    <Div
      ref={forkedRef}
      display="inline-block"
      position="relative"
      {...rootStyles}
      {...filterUndefinedValues(divProps)}
    >
      <Input
        {...baseInputProps}
        value={search}
        inputProps={{ ref: inputRef, ...inputProps }}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        endIcon={(
          typeof endIcon !== 'undefined'
            ? endIcon
            : (
              <Caret
                onClick={handleEndIconClick}
                rotation={focused ? 180 : 0}
              />
            )
        )}
        width="100%"
        {...resolvePartStyles('Autocomplete.Input', props, theme)}
      />
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          noFocus
          noFocusLoss
          noOutsideClick
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top="100%"
          right={1}
          left={1}
          zIndex={100}
          display={isMenuOpen && focused && !hasFound ? 'block' : 'none'}
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

const BaseAutocomplete = forwardRef(AutocompleteRef)

BaseAutocomplete.displayName = 'Autocomplete'
BaseAutocomplete.propTypes = autocompletePropTypes

export const Autocomplete = memo(BaseAutocomplete)
