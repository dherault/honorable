import fp from 'flexpad'

import {
  HonorableTheme,
  StylesProps,
} from '../types'

import createMediaQuery from './createMediaQuery'

type ConverXFlexArgs = {
  xflex?: string
  xflexMobile?: string
  xflexTablet?: string
  xflexDesktop?: string
}

function createXflexMediaQuery(xflex: string, breakpointName: string, theme: HonorableTheme) {
  if (!xflex) return {}

  return {
    [createMediaQuery(breakpointName, theme)]: {
      ...fp(xflex),
    },
  }
}

function convertXflex(
  { xflex, xflexMobile, xflexTablet, xflexDesktop }: ConverXFlexArgs,
  theme: HonorableTheme
): StylesProps {
  return {
    ...(xflex ? fp(xflex) : null),
    ...createXflexMediaQuery(xflexMobile, 'mobile', theme),
    ...createXflexMediaQuery(xflexTablet, 'tablet', theme),
    ...createXflexMediaQuery(xflexDesktop, 'desktop', theme),
  }
}

export default convertXflex
