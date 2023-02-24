import React, { useState } from 'react'

import { A, Button, Div, ExtendTheme, Modal, P } from 'honorable'

export default {
  title: 'Components/Modal',
  component: Div, // Weird sb bug
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
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        Content
      </Modal>
    </>
  )
}

// const transitionDuration = 1000
// const extendedTheme = {
//   Modal: {
//     InnerDefaultStyle: [
//       {
//         position: 'relative',
//         top: -12,
//         transition: `opacity ${transitionDuration}ms ease, top ${transitionDuration}ms ease`,
//       },
//     ],
//     InnerTransitionStyle: [
//       {
//         entering: { opacity: 1, top: 0 },
//         entered: { opacity: 1, top: 0 },
//       },
//     ],
//   },
// }

// function Template2(args: any) {
//   const [open, setOpen] = useState(false)

//   return (
//     <ExtendTheme theme={extendedTheme}>
//       <A
//         onClick={() => setOpen(true)}
//         userSelect="none"
//       >
//         Open
//       </A>
//       <Modal
//         {...args}
//         open={open}
//         onClose={() => setOpen(false)}
//         transitionDuration={transitionDuration}
//       >
//         Content
//       </Modal>
//     </ExtendTheme>
//   )
// }

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
        {...args}
        open={open}
      >
        Content
      </Modal>
    </>
  )
}

function Template4(args: any) {
  const [value, setValue] = useState<any>(null)

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
        {...args}
        open={!!value}
        onClose={() => setValue(null)}
      >
        {value}
        <Div mt={2}>
          <Button onClick={() => setValue(null)}>
            Close (set null)
          </Button>
        </Div>
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
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
        Content
        {' '}
        <br />
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
        {...args}
        open={open}
        onClose={() => setOpen(false)}
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

export const Default = Template.bind({}) as any
Default.args = {
}

export const NoFade = Template.bind({}) as any
NoFade.args = {
  fade: false,
}

export const Open = Template6.bind({}) as any
Open.args = {
  open: true,
  onClose: null, // Weird sb bug
}

// export const Extended = Template2.bind({}) as any
// Extended.args = {
// }

export const NoOnClose = Template3.bind({}) as any
NoOnClose.args = {
}

export const OpenNoOnClose = Template3.bind({}) as any
OpenNoOnClose.args = {
  open: true,
  onClose: null, // Weird sb bug
}

export const DisableEscapeKey = Template.bind({}) as any
DisableEscapeKey.args = {
  disableEscapeKey: true,
}

export const RealWorld = Template4.bind({}) as any
RealWorld.args = {
}

export const RealWorld2 = Template5.bind({}) as any
RealWorld2.args = {
}

export const Naked = Template6.bind({}) as any
Naked.args = {
}

export const CloseButton = Template7.bind({}) as any
CloseButton.args = {
}

export const WillChangeContainer = Template8.bind({}) as any
WillChangeContainer.args = {
  portal: true,
}
