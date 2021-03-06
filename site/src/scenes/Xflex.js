import { Link } from 'react-router-dom'
import { A, Button, Div, H1, Icon, P, Pre } from 'honorable'
import { useState } from 'react'

function Xflex() {
  return (
    <Div container>
      <Div
        mt={3}
        textAlign="center"
      >
        <A
          as={Link}
          to="/"
        >
          Home
        </A>
      </Div>
      <H1
        mt={2}
        textAlign="center"
      >
        The <Pre>xflex</Pre> property
      </H1>
      <P
        mt={2}
        text="large"
        textAlign="center"
      >
        Think about a numpad:
      </P>
      <Numpad
        cursor={null}
        mt={2}
      />
      <P
        text="large"
        mt={2}
        textAlign="center"
      >
        The xflex property creates flexbox layouts just like a numpad:
      </P>
      <XflexPlayground mt={2} />
      <Div
        mt={3}
        mb={6}
        textAlign="center"
      >
        <A
          as={Link}
          to="/"
        >
          Home
        </A>
      </Div>
    </Div>
  )
}

function Numpad({ active = null, width = 512 - 64, spacing = 0.5, onClick = () => {}, cursor = 'pointer', ...props }) {

  function renderKey(number) {
    return (
      <Div
        text="large"
        p={spacing}
        xflex="x4s"
        width={width / 3}
        height={width / 3}
        fontFamily="monospace"
      >
        <Div
          flexGrow={1}
          xflex="x5"
          border={`1px solid ${active === number ? 'primary' : 'border'}`}
          backgroundColor={active === number ? 'primary' : 'background-light'}
          color={active === number ? 'white' : 'text'}
          cursor={cursor}
          onClick={() => onClick(number)}
        >
          {number}
        </Div>
      </Div>
    )
  }

  return (
    <Div
      xflex="y2"
      {...props}
    >
      <Div
        mx="auto"
        width={width}
        xflex="x11"
      >
        {renderKey(1)}
        {renderKey(2)}
        {renderKey(3)}
        {renderKey(4)}
        {renderKey(5)}
        {renderKey(6)}
        {renderKey(7)}
        {renderKey(8)}
        {renderKey(9)}
      </Div>
      {renderKey(0)}
    </Div>
  )
}

function ToggleGroup(props) {
  return (
    <Div
      border="1px solid primary"
      borderRadius={4}
      overflow="hidden"
      xflex="x4"
      {...props}
    />
  )
}
function ToggleButton({ children, active = false, ...props }) {
  return (
    <Button
      variant={active ? 'normal' : 'outlined'}
      border="none"
      borderRadius={0}
      {...props}
    >
      {children}
    </Button>
  )
}

function Wrap({ active = false, ...props }) {
  return (
    <Icon
      m={0.25}
      p={0.5}
      backgroundColor={active ? 'primary' : 'background-light'}
      color={active ? 'white' : 'text'}
      border={`1px solid ${active ? 'primary' : 'border'}`}
      cursor="pointer"
      {...props}
    />
  )
}

function XflexPlayground(props) {
  const [xy, setXy] = useState('x')
  const [number, setNumber] = useState(0)
  const [wrap, setWrap] = useState(null)

  return (
    <Div xflex="y2">
      <Div
        m="auto"
        xflex="y1"
        {...props}
      >
        <Div
          xflex="x4"
          flexShrink={1}
        >
          <P minWidth={160}>
            Choose a direction:
          </P>
          <ToggleGroup ml={2}>
            <ToggleButton
              active={xy === 'x'}
              onClick={() => setXy('x')}
            >
              X (row)
            </ToggleButton>
            <ToggleButton
              active={xy === 'y'}
              onClick={() => setXy('y')}
            >
              Y (column)
            </ToggleButton>

          </ToggleGroup>
        </Div>
        <Div
          mt={1}
          xflex="x4"
          flexShrink={1}
        >
          <P minWidth={160}>A number:</P>
          <Numpad
            active={number}
            width={128}
            spacing={0.25}
            onClick={setNumber}
            ml={2}
          />
        </Div>
        <Div
          mt={1}
          xflex="x4"
          flexShrink={1}
        >
          <P minWidth={160}>And a wrap behavior:</P>
          <Div ml={2}>
            <Div xflex="x4">
              <Wrap
                active={wrap === 9}
                onClick={() => setWrap(9)}
              >
                {/* icons from https://icons.modulz.app/ */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6465L4.70711 4L9 4C9.27614 4 9.5 3.77614 9.5 3.5C9.5 3.22386 9.27614 3 9 3L3.5 3C3.36739 3 3.24021 3.05268 3.14645 3.14645C3.05268 3.24022 3 3.36739 3 3.5L3 9.00001C3 9.27615 3.22386 9.50001 3.5 9.50001C3.77614 9.50001 4 9.27615 4 9.00001V4.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Wrap>
              <Wrap
                active={wrap === 7}
                onClick={() => setWrap(7)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Wrap>
            </Div>
            <Div xflex="x4">
              <Wrap
                active={wrap === 3}
                onClick={() => setWrap(3)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3536 3.64644C11.5488 3.8417 11.5488 4.15828 11.3536 4.35354L4.70711 11L9 11C9.27614 11 9.5 11.2239 9.5 11.5C9.5 11.7761 9.27614 12 9 12L3.5 12C3.36739 12 3.24021 11.9473 3.14645 11.8536C3.05268 11.7598 3 11.6326 3 11.5L3 5.99999C3 5.72385 3.22386 5.49999 3.5 5.49999C3.77614 5.49999 4 5.72385 4 5.99999V10.2929L10.6464 3.64643C10.8417 3.45117 11.1583 3.45117 11.3536 3.64644Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Wrap>
              <Wrap
                active={wrap === 1}
                onClick={() => setWrap(1)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64645 3.64644C3.45118 3.8417 3.45118 4.15828 3.64645 4.35354L10.2929 11L6 11C5.72386 11 5.5 11.2239 5.5 11.5C5.5 11.7761 5.72386 12 6 12L11.5 12C11.6326 12 11.7598 11.9473 11.8536 11.8536C11.9473 11.7598 12 11.6326 12 11.5L12 5.99999C12 5.72385 11.7761 5.49999 11.5 5.49999C11.2239 5.49999 11 5.72385 11 5.99999V10.2929L4.35355 3.64643C4.15829 3.45117 3.84171 3.45117 3.64645 3.64644Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Wrap>
            </Div>
          </Div>
          <Wrap
            ml={0.25}
            active={wrap === null}
            onClick={() => setWrap(null)}
          >
            no wrap
          </Wrap>
        </Div>
      </Div>
    </Div>
  )
}

export default Xflex
