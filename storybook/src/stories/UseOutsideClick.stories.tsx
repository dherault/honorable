import React, { useCallback, useRef, useState } from 'react'

import { Button, Div, WithOutsideClick, useOutsideClick } from 'honorable'

export default {
  title: 'Hooks/useOutsideClick',
  component: Div,
}

const divProps = {
  width: 128,
  height: 128,
  backgroundColor: 'red',
}

function Template() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  const handle1 = useCallback(() => {
    setCount1(x => x + 1)
  }, [])

  const handle1bis = useCallback(() => {
    setCount1(x => x + 10)
  }, [])

  const handle2 = useCallback(() => {
    setCount2(x => x + 1)
  }, [])

  const handle2bis = useCallback(() => {
    setCount2(x => x + 10)
  }, [])

  const handle3 = useCallback(() => {
    setCount3(x => x + 1)
  }, [])

  const handle3bis = useCallback(() => {
    setCount3(x => x + 10)
  }, [])

  useOutsideClick(ref1, handle1)
  useOutsideClick(ref1, handle1bis)
  useOutsideClick(ref2, handle2)
  useOutsideClick(ref2, handle2bis)
  useOutsideClick(ref3, handle3, true)
  useOutsideClick(ref3, handle3bis, true)

  return (
    <>
      <Div>
        Count 1:
        {' '}
        {count1}
      </Div>
      <Div>
        Count 2:
        {' '}
        {count2}
      </Div>
      <Div>
        Count 3:
        {' '}
        {count3}
      </Div>
      <Div
        display="flex"
        gap="16px"
        mt={2}
      >
        <Div
          ref={ref1}
          {...divProps}
        />
        {visible && (
          <>
            <Div
              ref={ref2}
              {...divProps}
            />
            <Div
              ref={ref3}
              {...divProps}
            />
          </>
        )}
      </Div>
      <Button
        mt={2}
        onClick={() => setVisible(x => !x)}
      >
        Toggle div 2 and 3
      </Button>
    </>
  )
}

function Template2() {
  const [visible, setVisible] = useState(false)

  const handle = useCallback(() => {
    console.log('handle')
    setVisible(false)
  }, [])

  return (
    <>
      <Div
        display="flex"
        gap="16px"
        mt={2}
      >
        {visible && (
          <WithOutsideClick
            preventFirstFire
            onOutsideClick={handle}
          >
            <Div
              {...divProps}
            />
          </WithOutsideClick>
        )}
      </Div>
      <Button
        mt={2}
        onClick={() => setVisible(x => !x)}
      >
        Toggle div 1
      </Button>
    </>
  )
}

export const UseCases = Template.bind({}) as any
UseCases.args = {
}

export const UseCases2 = Template2.bind({}) as any
UseCases2.args = {
}
