import { H2 } from 'honorable'

import DemoContainer from '../../components/DemoContainer'
import PropsContainer from '../../components/PropsContainer'

function ComponentPage({ componentName, componentJson }) {
  return (
    <>
      <H2>{componentName}</H2>
      {componentJson.demos.map(({ source, name, url }) => (
        <DemoContainer
          mt={2}
          demoSource={source}
          demoName={name}
          demoUrl={url}
        />
      ))}
      <PropsContainer
        mt={4}
        componentProps={componentJson.props}
      />
    </>
  )
}

export default ComponentPage
