import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import useImageLoad from '../../hooks/useImageLoad'

import { Div, DivProps, Img, ImgProps } from '../tags'

export type AvatarBaseProps = {
  /**
   * The source of the Avatar's image
   */
  src?: string
  /**
   * The size of the Avatar
   */
  size?: number
  /**
   * The name of that will be transformed into the Avatar's initials
   */
  name?: string
}

export type AvatarProps = HonorableProps<ImgProps & DivProps & AvatarBaseProps>

export const AvatarPropTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
}

// https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
function nameToColor(name: string, s = 95, l = 60) {
  let hash = 0

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360

  return `hsl(${h}, ${s}%, ${l}%)`
}

function extractInitials(name: string) {
  const words = name.split(' ')

  // Pick the first and last initials if any
  return words.map(word => word[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('').toUpperCase()
}

// Icon from https://icons.modulz.app/
function PersonIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

function AvatarRef(props: AvatarProps, ref: Ref<any>) {
  const { size = 40, src, name, ...otherProps } = props
  const [loaded, error] = useImageLoad(src)

  if (src && loaded && !error) {
    return (
      <Img
        ref={ref}
        src={src}
        alt={name || 'Avatar'}
        width={size}
        height={size}
        objectFit="cover"
        {...otherProps}
      />
    )
  }

  return (
    <Div
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      backgroundColor={name ? `${nameToColor(name)} !important` : null}
      {...otherProps}
    >
      {name ? extractInitials(name) : <PersonIcon size={size * 3 / 5} />}
    </Div>
  )
}

AvatarRef.displayName = 'Avatar'

const ForwardedAvatar = forwardRef(AvatarRef)

ForwardedAvatar.propTypes = AvatarPropTypes

export const Avatar = withHonorable<AvatarProps>(ForwardedAvatar, 'Avatar')
