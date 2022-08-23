// Icons from https://icons.modulz.app/
import React from 'react'
import { Card } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
	title: 'Demos/Card',
	component: Card,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-card--basic&viewMode=story
// START-SOURCE
function CardBasic() {
	return (
		<Card
			width={256}
			height={256}
		/>
	)
}
// END-SOURCE
// END-DEMO

export const Basic = CardBasic.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-card--parts&viewMode=story
export const Parts = createPartsTemplate(
	(args: any) => <Card {...args} />,
	'Card',
	[]
).bind({})
Parts.args = {
	width: 256,
	height: 256,
}
