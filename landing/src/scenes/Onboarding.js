import { useEffect, useState } from 'react'
import { Div, H2, P, Tooltip } from 'honorable'

function Onboarding() {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTooltipOpen(true)
    }, 750)
  }, [])

  const hoverStyles = {
    '&:hover': {
      borderColor: 'primary',
    },
  }

  return (
    <Div
      xflex="y5"
      height="100vh"
    >
      <H2>
        Choose what you want to do:
      </H2>
      <Div
        mt={6}
        xflex="x4"
      >
        <Tooltip
          open={tooltipOpen}
          label="Click me!"
        >
          <Div
            p={2}
            xflex="y5"
            width={256 + 64}
            height={256}
            backgroundColor="background-light"
            borderRadius={4}
            border="1px solid primary"
            cursor="pointer"
            {...hoverStyles}
          >
            <P text="large">
              Start the Tutorial
            </P>
            <P mt={1}>
              (1 component or +)
            </P>
          </Div>
        </Tooltip>
        <Div
          p={2}
          ml={2}
          xflex="y5"
          width={256 + 64}
          height={256}
          backgroundColor="background-light"
          borderRadius={4}
          border="1px solid border"
          cursor="pointer"
          {...hoverStyles}
          _hover={{
            borderColor: 'primary',
          }}
        >
          <P text="large">
            Create a design system
          </P>
          <P mt={1}>
            (12 components or +)
          </P>
        </Div>
        <Div
          p={2}
          ml={2}
          xflex="y5"
          width={256 + 64}
          height={256}
          backgroundColor="background-light"
          borderRadius={4}
          border="1px solid border"
          cursor="pointer"
          {...hoverStyles}
          _hover={{
            borderColor: 'primary',
          }}
        >
          <P text="large">
            Read the docs
          </P>
        </Div>
      </Div>
    </Div>
  )
}

export default Onboarding
