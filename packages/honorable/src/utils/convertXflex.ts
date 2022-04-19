import fp from 'flexpad'

import {
  HonorableTheme,
  StyleProps,
} from '../types'

type ConverXFlexArgs = {
  xflex?: string
  xflexMobile?: string
  xflexTablet?: string
  xflexDesktop?: string
}

function createXflexMediaQuery(xflex: string, breakpoint: number) {
  if (!(xflex && breakpoint)) return {}

  return {
    [`@media (max-width: ${breakpoint}px)`]: {
      ...fp(xflex),
    },
  }
}

function convertXflex(
  { xflex, xflexMobile, xflexTablet, xflexDesktop }: ConverXFlexArgs,
  theme: HonorableTheme
): StyleProps {
  const { mobile, tablet, desktop } = theme.breakpoints || {}

  return {
    ...(xflex ? fp(xflex) : null),
    ...createXflexMediaQuery(xflexMobile, mobile),
    ...createXflexMediaQuery(xflexTablet, tablet),
    ...createXflexMediaQuery(xflexDesktop, desktop),
  }
}

export default convertXflex
