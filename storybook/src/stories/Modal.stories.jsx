import { useState } from 'react'

import { A, Div, Modal } from 'honorable'

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

export const Default = Template.bind({})
Default.args = {
}
