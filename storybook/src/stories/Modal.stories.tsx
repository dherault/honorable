import React, { useState } from 'react'

import { A, Button, Div, ExtendTheme, Modal, P } from 'honorable'

export default {
  title: 'Modal',
  component: Modal,
}

function Template(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
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
    </>
  )
}

const transitionDuration = 333
const extendedTheme = {
  Modal: {
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
}

function Template2(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <ExtendTheme theme={extendedTheme}>
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
    </ExtendTheme>
  )
}

function Template3(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
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
    </>
  )
}

function Template4(args: any) {
  const [value, setValue] = useState(null)

  return (
    <>
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
      <P mt={1}>
        {value ?? 'null'}
      </P>
      <Modal
        open={!!value}
        onClose={() => setValue(null)}
        {...args}
      >
        {value}
      </Modal>
    </>
  )
}

function Template5(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
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
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
        Content <br />
      </Modal>
    </>
  )
}

function Template6(args: any) {
  return (
    <Modal
      {...args}
    >
      Content
    </Modal>
  )
}

function Template7(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
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
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </>
  )
}

function Template8(args: any) {
  return (
    <Div
      width={256}
      height={256}
      willChange="transform"
    >
      <Modal
        {...args}
      >
        Content
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

export const RealWorld2 = Template5.bind({})
RealWorld2.args = {
}

export const Naked = Template6.bind({})
Naked.args = {
}

export const CloseButton = Template7.bind({})
CloseButton.args = {
}

export const WillChangeContainer = Template8.bind({})
WillChangeContainer.args = {
  portal: true,
}
