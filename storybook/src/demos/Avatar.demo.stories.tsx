// Icons from https://icons.modulz.app/
import React from 'react'
import { Avatar, ExtendTheme, Flex } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Avatar',
  component: Avatar,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-avatar--basic&viewMode=story
// START-SOURCE
function AvatarDemo() {
  return (
    <>
      <Flex>
        <Avatar />
        <Avatar
          ml={0.5}
          name="Jane Smith"
        />
        <Avatar
          ml={0.5}
          name="Henry Doe"
        />
        <Avatar
          ml={0.5}
          name="Alexander Taze"
        />
        <Avatar
          ml={0.5}
          src="/profile-picture.jpeg"
        />
      </Flex>
      <ExtendTheme theme={{ Avatar: { Root: [{ borderRadius: 4 }] } }}>
        <Flex mt={0.5}>
          <Avatar />
          <Avatar
            ml={0.5}
            name="Jane Smith"
          />
          <Avatar
            ml={0.5}
            name="Henry Doe"
          />
          <Avatar
            ml={0.5}
            name="Alexander Taze"
          />
          <Avatar
            ml={0.5}
            src="/profile-picture.jpeg"
          />
        </Flex>
      </ExtendTheme>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = AvatarDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-avatar--parts&viewMode=story
export const Parts = createPartsTemplate(Avatar, 'Avatar', []).bind({})
Parts.args = {
  name: 'Jane Smith',
}
