import { Div, Pre, useGlobalStyles } from 'honorable'

export default {
  title: 'Hooks/useGlobalStyles',
  component: Div,
}

function Template() {
  const globalStyles = useGlobalStyles()

  console.log('globalStyles', globalStyles)

  return (
    <Pre
      maxWidth="100%"
      overflow="auto"
    >
      {JSON.stringify(globalStyles, null, 2)}
    </Pre>
  )
}

export const UseCases = Template.bind({}) as any
UseCases.args = {
}
