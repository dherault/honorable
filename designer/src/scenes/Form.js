import { useState } from 'react'
import { Button, Div, H1, Form as HonorableForm, Input, Label, Span } from 'honorable'

import ComponentVariator from '../components/ComponentVariator'

function Form() {
  const [radio, setRadio] = useState('')

  function handleSumbit(event) {
    event.preventDefault()
  }

  return (
    <Div
      pt={4}
      pl={8}
    >
      <H1>Form</H1>
      <HonorableForm
        onSubmit={handleSumbit}
      >
        <ComponentVariator
          Component={Label}
        >
          Email
        </ComponentVariator>
        <ComponentVariator
          Component={Input}
          componentProps={{
            type: 'text',
            placeholder: 'jane.smith@abc.com',
          }}
        />
        <Div mt={2}>
          <Div xflex="x4">
            <Input
              type="radio"
              checked={radio === 'company'}
              onChange={() => setRadio('company')}
            />
            <Span ml={0.5}>
              Company
            </Span>
          </Div>
          <Div
            xflex="x4"
            mt={0.25}
          >
            <Input
              type="radio"
              checked={radio === 'personal'}
              onChange={() => setRadio('personal')}
            />
            <Span ml={0.5}>
              Personal
            </Span>
          </Div>
        </Div>
        <Div
          xflex="x4"
          mt={2}
        >
          <Div>
            <ComponentVariator
              Component={Input}
              componentProps={{
                type: 'checkbox',
              }}
            />
          </Div>
          <Span ml={0.5}>
            I agree to the Terms of Service.
          </Span>
        </Div>
        <Div
          xflex="x4"
          mt={2}
        >
          <Button
            type="submit"
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="outlined"
            ml={0.5}
          >
            Cancel
          </Button>
        </Div>
      </HonorableForm>
    </Div>
  )
}

export default Form
