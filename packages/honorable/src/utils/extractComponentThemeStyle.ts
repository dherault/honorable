import {
  AnyProps,
  ComponentProps,
  StyleProps,
} from '../types'

function extractComponentThemeStyle(componentTheme: ComponentProps, partKey: string, props: AnyProps) {
  if (componentTheme === null || typeof componentTheme !== 'object') return null

  const { defaultProps = {}, customProps = {} } = componentTheme
  const styleProps = { ...(defaultProps[partKey] || {}) }

  if (typeof customProps === 'object') {
    if (customProps[partKey]) {
      if (typeof customProps[partKey] === 'object') {
        Object.assign(styleProps, customProps[partKey])
      }
      else if (typeof customProps[partKey] === 'function') {
        Object.assign(styleProps, (customProps[partKey] as (x:AnyProps) => StyleProps)(props))
      }
    }
  }
  else if (typeof customProps === 'function') {
    const customPropsObject = customProps(props)

    if (typeof customPropsObject === 'object') {
      Object.assign(styleProps, customPropsObject[partKey])
    }
    else {
      console.warn(`Invalid customProps return value. Expected object  but got ${typeof customPropsObject}.`)
    }
  }

  return styleProps
}

export default extractComponentThemeStyle
