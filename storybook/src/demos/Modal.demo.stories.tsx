// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, Button, Div, Modal, P } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Modal',
  component: Modal,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--basic&viewMode=story
// START-SOURCE
function ModalBasic() {
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
      >
        Content
      </Modal>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = ModalBasic.bind({})

// START-DEMO
// @name NoFade
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--no-fade&viewMode=story
// START-SOURCE
function ModalNoFade() {
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
        fade={false}
        open={open}
        onClose={() => setOpen(false)}
      >
        Content
      </Modal>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const NoFade = ModalNoFade.bind({})

// START-DEMO
// @name Open
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--open&viewMode=story
// START-SOURCE
function ModalNoOpen() {
  return (
    <>
      <A
        userSelect="none"
      >
        Open
      </A>
      <Modal
        open={false}
      >
        Content
      </Modal>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const NoOpen = ModalNoOpen.bind({})

// START-DEMO
// @name RealWorld
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--real-world&viewMode=story
// START-SOURCE
function ModalNoRealWorld() {
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
      >
        {value}
      </Modal>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const NoRealWorld = ModalNoRealWorld.bind({})

// START-DEMO
// @name CloseButton
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--close-button&viewMode=story
// START-SOURCE
function ModalCloseButton() {
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
      >
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const CloseButton = ModalCloseButton.bind({})

// START-DEMO
// @name WillChangeContainer
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-modal--will-change-containerviewMode=story
// START-SOURCE
function ModalWillChangeContainer() {
  return (
    <Div
      width={256}
      height={256}
      willChange="transform"
    >
      <Modal>
        Content
      </Modal>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const WillChangeContainer = ModalWillChangeContainer.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-modal--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Modal {...args} />
  ),
  'Modal',
  []
).bind({})
Parts.args = {
  open: true,
}
