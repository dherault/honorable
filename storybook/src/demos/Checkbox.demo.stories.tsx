// Icons from https://icons.modulz.app/
import React, { useState } from 'react';
import { A, Checkbox, Div, Flex, P } from 'honorable';

import createPartsTemplate from '../helpers/createPartsTemplate';

export default {
	title: 'Demos/Checkbox',
	component: Checkbox,
};

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-checkbox--basic&viewMode=story
// START-SOURCE
function CheckboxBasicDemo() {
	return (
		<Flex>
			<Checkbox />
			<Checkbox disabled ml={0.5} />
		</Flex>
	);
}
// END-SOURCE
// END-DEMO

export const Basic = CheckboxBasicDemo.bind({});

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-checkbox--controlled&viewMode=story
// START-SOURCE
function CheckboxControlledDemo() {
	const [checked, setChecked] = useState(false);

	return (
		<Flex>
			<Checkbox
				checked={checked}
				onChange={(event) => setChecked(event.target.checked)}
			/>
			<A ml={1} userSelect="none" onClick={() => setChecked((x) => !x)}>
				Toggle
			</A>
		</Flex>
	);
}
// END-SOURCE
// END-DEMO

export const Controlled = CheckboxControlledDemo.bind({});

// START-DEMO
// @name Label
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-checkbox--label&viewMode=story
// START-SOURCE
function CheckboxLabelDemo() {
	return (
		<>
			<Checkbox>A checkbox</Checkbox>
			<Checkbox mt={0.5}>
				<P fontSize="0.5rem">A small checkbox</P>
			</Checkbox>
			<Checkbox mt={0.5} labelPosition="top">
				top label
			</Checkbox>
			<Checkbox mt={0.5} labelPosition="left">
				left label
			</Checkbox>
			<Checkbox mt={0.5} labelPosition="right">
				right label
			</Checkbox>
			<Checkbox mt={0.5} labelPosition="bottom">
				bottom label
			</Checkbox>
		</>
	);
}
// END-SOURCE
// END-DEMO

export const Label = CheckboxLabelDemo.bind({});

// START-DEMO
// @name Multiple
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-checkbox--basic&viewMode=story
// START-SOURCE
function CheckboxMultipleDemo() {
	return (
		<>
			<Div>
				<Checkbox>A checkbox</Checkbox>
				<Checkbox>A checkbox</Checkbox>
				<Checkbox>A checkbox</Checkbox>
				<Checkbox>A checkbox</Checkbox>
			</Div>

			<Div mt={0.5}>
				<Checkbox>
					<P fontSize="0.5rem">A checkbox</P>
				</Checkbox>
				<Checkbox>
					<P fontSize="0.5rem">A checkbox</P>
				</Checkbox>
				<Checkbox>
					<P fontSize="0.5rem">A checkbox</P>
				</Checkbox>
				<Checkbox>
					<P fontSize="0.5rem">A checkbox</P>
				</Checkbox>
			</Div>
		</>
	);
}
// END-SOURCE
// END-DEMO

export const Multiple = CheckboxMultipleDemo.bind({});

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-checkbox--parts&viewMode=story
export const Parts = createPartsTemplate(
	(args: any) => <Checkbox {...args} />,
	'Checkbox',
	['Children']
).bind({});
Parts.args = {
	children: <P fontSize="0.5rem">A small checkbox</P>,
};
