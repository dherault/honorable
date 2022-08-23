// Icons from https://icons.modulz.app/
import React from 'react'
import { Button, ButtonGroup } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
	title: 'Demos/ButtonGroup',
	component: ButtonGroup,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-buttongroup--basic&viewMode=story
// START-SOURCE
function ButtonGroupBasic() {
	return (
		<ButtonGroup>
			<Button>Button 1</Button>
			<Button>Button 2</Button>
			<Button>Button 3</Button>
		</ButtonGroup>
	)
}
// END-SOURCE
// END-DEMO

export const Basic = ButtonGroupBasic.bind({})

// START-DEMO
// @name Column
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-buttongroup--column&viewMode=story
// START-SOURCE
function ButtonGroupColumn() {
	return (
		<ButtonGroup direction="column">
			<Button>Button 1</Button>
			<Button>Button 2</Button>
			<Button>Button 3</Button>
		</ButtonGroup>
	)
}
// END-SOURCE
// END-DEMO

export const Column = ButtonGroupColumn.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-buttongroup--parts&viewMode=story
export const Parts = createPartsTemplate(
	(args: any) => (
		<ButtonGroup
			direction="column"
			{...args}
		>
			<Button>Button 1</Button>
			<Button>Button 2</Button>
			<Button>Button 3</Button>
		</ButtonGroup>
	),
	'ButtonGroup',
	[]
).bind({})
Parts.args = {
	children: 'Button',
}
