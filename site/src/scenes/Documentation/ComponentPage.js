import { H2 } from 'honorable'

function ComponentPage({ componentName, componentJson }) {
  return (
    <>
      <H2>{componentName}</H2>
      <pre>{JSON.stringify(componentJson, null, 2)}</pre>
    </>
  )
}

export default ComponentPage
