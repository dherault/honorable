import { useState } from 'react'

import { Modal } from 'honorable'

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
      >
        Open
      </button>
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

export const Default = Template.bind({})
Default.args = {
}
