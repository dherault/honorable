import { ChangeEvent, ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'
import usePreviousWithDefault from '../hooks/usePreviousWithDefault'
import useForkedRef from '../hooks/useForkedRef'
import usePartProps from '../hooks/usePartProps'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'
import pickProps from '../utils/pickProps'

import { Caret } from './Caret'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { Input, InputProps, inputPropTypes } from './Input'
import { Div, DivProps } from './tags'

export type AutocompleteOptionType = string | { label?: string; value?: string }

export type AutocompleteProps = InputProps & Omit<DivProps, 'onChange'> & {
  options?: AutocompleteOptionType[],
  autoComplete?: boolean
  autoHighlight?: boolean
  freeSolo?: boolean
  onOpen?: (open: boolean) => void
  renderOption?: (option: any) => ReactNode
  noOptionsNode?: ReactNode
}

const autocompletePropTypes = {
  ...inputPropTypes,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })])),
  autoComplete: PropTypes.bool,
  autoHighlight: PropTypes.bool,
  freeSolo: PropTypes.bool,
  onOpen: PropTypes.func,
  renderOption: PropTypes.func,
  noOptionsNode: PropTypes.node,
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

function AutocompleteRef(props: AutocompleteProps, ref: Ref<any>) {
  const {
    honorableId,
    options = [],
    endIcon,
    onOpen,
    onChange,
    renderOption = defaultRenderOption,
    noOptionsNode = 'No options',
  } = props
  const [inputProps, divProps]: [InputProps, DivProps] = pickProps(props, inputPropTypes)
  const autocompleteRef = useRef()
  const forkedRef = useForkedRef(autocompleteRef, ref)
  const [focused, setFocused] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const { value, event } = menuState
  const previousEvent = usePrevious(event)
  const previousSearch = usePreviousWithDefault(search)
  const filteredOptions = filterOptions(options, search)

  useRegisterProps('Autocomplete', { open, value, search }, honorableId)

  useOutsideClick(autocompleteRef, () => {
    setFocused(false)
    setOpen(false)
  })

  const extendInput = usePartProps('Autocomplete', 'Input', props)
  const extendMenu = usePartProps('Autocomplete', 'Menu', props)
  const extendMenuItem = usePartProps('Autocomplete', 'MenuItem', props)
  const extendNoOption = usePartProps('Autocomplete', 'NoOption', props)

  useEffect(() => {
    if (typeof onOpen === 'function') onOpen(open)
  }, [onOpen, open])

  useEffect(() => {
    if (!open && focused && (previousSearch || search)) setOpen(true)
  }, [open, focused, previousSearch, search])

  useEffect(() => {
    if (event && previousEvent !== event) {
      setOpen(false)
      setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    }
  }, [previousEvent, event])

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSearch(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }

  return (
    <Div
      ref={forkedRef}
      display="inline-block"
      position="relative"
      {...divProps}
    >
      <Input
        {...inputProps}
        onChange={handleChange}
        endIcon={endIcon || <Caret rotation={open ? 180 : 0} />}
        onFocus={event => {
          setFocused(true)
          setOpen(true)
          if (typeof inputProps.onFocus === 'function') inputProps.onFocus(event)
        }}
        extend={extendInput}
      />
      <Menu
        menuState={menuState}
        setMenuState={setMenuState}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        display={open ? 'block' : 'none'}
        extend={extendMenu}
      >
        {filteredOptions.length > 0 && filteredOptions.map(option => (
          <MenuItem
            key={typeof option === 'object' ? option.value : option}
            value={typeof option === 'object' ? option.value : option}
            extend={extendMenuItem}
          >
            {renderOption(option)}
          </MenuItem>
        ))}
        {filteredOptions.length === 0 && (
          <MenuItem
            value={honorableNoValue}
            extend={extendMenuItem}
          >
            {noOptionsNode}
          </MenuItem>
        )}
      </Menu>
    </Div>
  )
}

AutocompleteRef.displayName = 'Autocomplete'

const ForwardedInput = forwardRef(AutocompleteRef)

ForwardedInput.propTypes = autocompletePropTypes

export const Autocomplete = withHonorable<InputProps>(ForwardedInput, 'Autocomplete')
