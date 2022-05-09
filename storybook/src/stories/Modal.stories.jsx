import { useState } from 'react'

import { A, Div, ExtendTheme, Modal } from 'honorable'

export default {
  title: 'Modal',
  component: Modal,
}

function Template(args) {
  const [open, setOpen] = useState(false)

  return (
    <Div xflex="y2">
      <A
        onClick={() => setOpen(true)}
        userSelect="none"
      >
        Open
      </A>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        {...args}
      >
        Content
      </Modal>
    </Div>
  )
}

const transitionDuration = 333
const extendedTheme = {
  Modal: {
    partStyles: {
      InnerDefaultStyle: [
        {
          position: 'relative',
          top: -12,
          transition: `opacity ${transitionDuration}ms ease, top ${transitionDuration}ms ease`,
        },
      ],
      InnerTransitionStyle: [
        {
          entering: { opacity: 1, top: 0 },
          entered: { opacity: 1, top: 0 },
        },
      ],
    },
  },
}

function Template2(args) {
  const [open, setOpen] = useState(false)

  return (
    <ExtendTheme theme={extendedTheme}>
      <Div xflex="y2">
        <A
          onClick={() => setOpen(true)}
          userSelect="none"
        >
          Open
        </A>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          transitionDuration={transitionDuration}
          {...args}
        >
          Content
        </Modal>
      </Div>
    </ExtendTheme>
  )
}

function Template3(args) {
  const [open, setOpen] = useState(false)

  return (
    <Div xflex="y2">
      <A
        onClick={() => setOpen(x => !x)}
        userSelect="none"
      >
        Open
      </A>
      <Modal
        open={open}
        {...args}
      >
        Content
      </Modal>
    </Div>
  )
}

function Template4(args) {
  const [value, setValue] = useState(null)

  return (
    <Div xflex="y2">
      <A
        onClick={() => {
          setValue('value')
          setTimeout(() => {
            setValue(null)
          }, 1000)
        }}
        userSelect="none"
      >
        Set value
      </A>
      <Modal
        open={!!value}
        onClose={() => setValue(null)}
        {...args}
      >
        {value}
      </Modal>
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const NoFade = Template.bind({})
NoFade.args = {
  fade: false,
}

export const Open = Template.bind({})
Open.args = {
  open: true,
}

export const Extended = Template2.bind({})
Extended.args = {
}

export const NoOnClose = Template3.bind({})
NoOnClose.args = {
}

export const OpenNoOnClose = Template3.bind({})
OpenNoOnClose.args = {
  open: true,
}

export const DisableEscapeKey = Template.bind({})
DisableEscapeKey.args = {
  disableEscapeKey: true,
}

export const RealWorld = Template4.bind({})
RealWorld.args = {
}
