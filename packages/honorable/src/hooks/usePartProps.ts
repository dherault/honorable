import { useContext } from 'react'
import merge from 'lodash.merge'

import { StylesProps } from '../types'

import resolveCustomProps from '../utils/resolveCustomProps'
import filterObject from '../utils/filterObject'
import RegisterPropsContext from '../contexts/RegisterPropsContext'

import useTheme from './useTheme'

// Return the style object of applied partProps
function usePartProps(name: string, partKey: string, props: object, id = 0): StylesProps {
  const theme = useTheme()
  const [registeredProps] = useContext(RegisterPropsContext)

  const overridenProps = registeredProps[name]?.[id] || {}
  const componentTheme = theme[name]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  const partTheme = componentTheme.partProps?.[partKey]

  if (!(partTheme && typeof partTheme === 'object')) return {}

  return merge(
    {},
    filterObject(partTheme.defaultProps),
    resolveCustomProps(partTheme.customProps, { ...props, ...overridenProps }, theme),
  )
}

export default usePartProps
