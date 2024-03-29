// Inspired from https://mui.com/material-ui/react-skeleton
import { Ref, forwardRef, memo } from 'react'
import { css, keyframes } from '@emotion/react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div } from '../tags.js'

export const skeletonParts = ['Inner', 'Children'] as const

export const SkeletonPropTypes = {
  animation: PropTypes.oneOfType([
    PropTypes.oneOf(['wave']),
    PropTypes.bool,
  ]),
}

export type SkeletonBaseProps = {
  animation?: 'wave' | boolean | string
}

export type SkeletonProps = ComponentProps<SkeletonBaseProps, 'div', typeof skeletonParts[number]>

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`

function SkeletonRef(props: SkeletonProps, ref: Ref<any>) {
  const {
    children,
    animation = true,
    ...otherProps
  } = props
  const theme = useTheme()
  const rootStyles = useRootStyles('Skeleton', props, theme)

  let styles = {}

  if (animation === 'wave') {
    styles = {
      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      webkitMaskImage: '-webkit-radial-gradient(white, black)',
      '&::after': {
        animation: `${waveKeyframe} 1.6s linear 0.5s infinite`,
        background: `linear-gradient(90deg, transparent, ${theme.utils?.resolveColorString(theme.mode === 'light' ? 'transparency(white, 66)' : 'lighten(background-light, 5)')}, transparent)`,
        content: '""',
        position: 'absolute',
        transform: 'translateX(-100%)', /* Avoid flash during server-side hydration */
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    }
  }
  else if (animation) {
    styles = {
      animation: `${pulseKeyframe} 1.5s ease-in-out 0.5s infinite`,
    }
  }

  return (
    <Div
      ref={ref}
      position="relative"
      width={children ? undefined : '100%'}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
    >
      <Div
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        css={css(styles)}
        {...resolvePartStyles('Skeleton.Inner', props, theme)}
      />
      <Div
        visibility="hidden"
        {...resolvePartStyles('Skeleton.Children', props, theme)}
      >
        {children}
      </Div>
    </Div>
  )
}

const BaseSkeleton = forwardRef(SkeletonRef)

BaseSkeleton.displayName = 'Skeleton'
BaseSkeleton.propTypes = SkeletonPropTypes

export const Skeleton = memo(BaseSkeleton)
