import { ChangeEvent, Ref, forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'
import useRegisterProps from '../hooks/useRegisterProps'
import pickProps from '../utils/pickProps'

import { Caret } from './Caret'
import { Input, InputProps, inputPropTypes } from './Input'
import { Div, DivProps } from './tags'

export type AutocompleteProps = InputProps & Omit<DivProps, 'onChange'> & {
  options?: any[],
  autoComplete?: boolean
  autoHighlight?: boolean
  freeSolo?: boolean
  onOpen?: (open: boolean) => void
}

const autocompletePropTypes = {
  ...inputPropTypes,
  options: PropTypes.array,
  autoComplete: PropTypes.bool,
  autoHighlight: PropTypes.bool,
  freeSolo: PropTypes.bool,
  onOpen: PropTypes.func,
}

function AutocompleteRef(props: AutocompleteProps, ref: Ref<any>) {
  const {
    honorableId,
    endIcon,
    onOpen,
    onChange,
  } = props
  const [inputProps, divProps]: [InputProps, DivProps] = pickProps(props, inputPropTypes)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useRegisterProps('Autocomplete', { open, value: search }, honorableId)

  const extendInput = usePartProps('Autocomplete', 'Input', props)
  const extendEndIcon = usePartProps('Autocomplete', 'EndIcon', props)

  useEffect(() => {
    if (typeof onOpen === 'function') onOpen(open)
  }, [onOpen, open])

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSearch(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }

  return (
    <Div
      ref={ref}
      display="inline-flex"
      {...divProps}
    >
      <Input
        {...inputProps}
        onChange={handleChange}
        endIcon={(
          <Div
            xflex="x5"
            extend={extendEndIcon}
          >
            {endIcon || <Caret />}
          </Div>
        )}
        onFocus={event => {
          setOpen(true)
          if (typeof inputProps.onFocus === 'function') inputProps.onFocus(event)
        }}
        onBlur={event => {
          setOpen(false)
          if (typeof inputProps.onBlur === 'function') inputProps.onBlur(event)
        }}
        extend={extendInput}
      />
    </Div>
  )
}

AutocompleteRef.displayName = 'Autocomplete'

const ForwardedInput = forwardRef(AutocompleteRef)

ForwardedInput.propTypes = autocompletePropTypes

export const Autocomplete = withHonorable<InputProps>(ForwardedInput, 'Input')
