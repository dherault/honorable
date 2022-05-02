import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { Div, DivProps, Img, ImgProps } from './tags'

export type AvatarProps = ImgProps & DivProps & {
  size?: number | string
}

export const AvatarPropTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

function AvatarRef(props: AvatarProps, ref: Ref<any>) {
  const { size = 40, src, children } = props

  if (children || !src) {
    return (
      <Div
        ref={ref}
        xflex="x5"
        width={size}
        height={size}
        {...props}
      />
    )
  }

  return (
    <Img
      ref={ref}
      width={size}
      height={size}
      objectFit="cover"
      {...props}
    />
  )
}

AvatarRef.displayName = 'Avatar'

const ForwardedAvatar = forwardRef(AvatarRef)

ForwardedAvatar.propTypes = AvatarPropTypes

export const Avatar = withHonorable<AvatarProps>(ForwardedAvatar, 'Avatar')
