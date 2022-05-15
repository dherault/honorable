import filterObject from '../utils/filterObject'

import useTheme from './useTheme'

function useBreakpointProps(prop: object) {
  const theme = useTheme()
  const breakpointNames = Object.keys(filterObject(theme.breakpoints))

}
