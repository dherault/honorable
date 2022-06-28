// Icons from https://icons.modulz.app/
import React from 'react'
import { Avatar, ExtendTheme, Flex } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Avatar Demo',
  component: Avatar,
}

// START-DEMO
// @name Demo
// @url https://storybook.honorable.design/iframe.html?args=&id=avatar-demo--demo&viewMode=story
// START-SOURCE
function AvatarDemo(args: any) {
  return (
    <>
      <Flex>
        <Avatar {...args} />
        <Avatar
          ml={0.5}
          name="Jane Smith"
          {...args}
        />
        <Avatar
          ml={0.5}
          name="Henry Doe"
          {...args}
        />
        <Avatar
          ml={0.5}
          name="Alexander Taze"
          {...args}
        />
        <Avatar
          ml={0.5}
          src="/profile-picture.jpeg"
          {...args}
        />
      </Flex>
      <ExtendTheme theme={{ Avatar: { Root: [{ borderRadius: 4 }] } }}>
        <Flex mt={0.5}>
          <Avatar {...args} />
          <Avatar
            ml={0.5}
            name="Jane Smith"
            {...args}
          />
          <Avatar
            ml={0.5}
            name="Henry Doe"
            {...args}
          />
          <Avatar
            ml={0.5}
            name="Alexander Taze"
            {...args}
          />
          <Avatar
            ml={0.5}
            src="/profile-picture.jpeg"
            {...args}
          />
        </Flex>
      </ExtendTheme>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Demo = AvatarDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=avatar-demo--parts&viewMode=story
export const Parts = createPartsTemplate(
  Avatar,
  'Avatar',
  [],
).bind({})
Parts.args = {
  name: 'Jane Smith',
}
