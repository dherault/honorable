// Icons from https://icons.modulz.app/
import React from 'react'
import { Div, Skeleton } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Skeleton',
  component: Skeleton,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-skeleton--basic&viewMode=story
// START-SOURCE
function SkeletonBasic() {
  return (
    <Div>
      <Skeleton
        width={256}
        height={256}
      />
      <Skeleton
        mt={2}
        variant="line"
      />
      <Skeleton
        mt={2}
        variant="circular"
        width={256}
        height={256}
      />
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = SkeletonBasic.bind({})

// START-DEMO
// @name WaveAnimation
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-skeleton--wave-animation&viewMode=story
// START-SOURCE
function SkeletonWaveAnimation() {
  return (
    <Div>
      <Skeleton
        width={256}
        height={256}
        animation="wave"
      />
      <Skeleton
        mt={2}
        variant="line"
        animation="wave"
      />
      <Skeleton
        mt={2}
        variant="circular"
        width={64}
        height={64}
        animation="wave"
      />
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const WaveAnimation = SkeletonWaveAnimation.bind({})

// START-DEMO
// @name NoAmination
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-skeleton--no-animation&viewMode=story
// START-SOURCE
function SkeletonNoAmination() {
  return (
    <Div>
      <Skeleton
        width={256}
        height={256}
        animation={false}
      />
      <Skeleton
        mt={2}
        variant="line"
        animation={false}
      />
      <Skeleton
        mt={2}
        variant="circular"
        width={64}
        height={64}
        animation={false}
      />
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const NoAmination = SkeletonNoAmination.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-skeleton--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Skeleton {...args} />
  ),
  'Skeleton',
  []
).bind({})
Parts.args = {
  width: 256,
  height: 256, 
}
