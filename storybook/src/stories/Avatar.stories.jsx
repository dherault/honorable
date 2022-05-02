// Icons from https://icons.modulz.app/
import { Avatar, Div } from 'honorable'

export default {
  title: 'Avatar',
  component: Avatar,
}

function Template(args) {
  return (
    <Div xflex="y2">
      <Avatar {...args} />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: 'AB',
}

export const SingleLetter = Template.bind({})
SingleLetter.args = {
  children: 'A',
}

export const FullName = Template.bind({})
FullName.args = {
  children: 'Adorian Bagela',
}

export const Src = Template.bind({})
Src.args = {
  src: 'https://avatars.githubusercontent.com/u/4154003?v=4',
  alt: 'David',
}

export const WonkySrcAlt = Template.bind({})
WonkySrcAlt.args = {
  src: 'https://wonky.src.image.tld',
  alt: 'David',
}

export const WonkySrcNoAlt = Template.bind({})
WonkySrcNoAlt.args = {
  src: 'https://wonky.src.image.tld',
}

export const Size = Template.bind({})
Size.args = {
  children: 'AB',
  size: 64,
}
