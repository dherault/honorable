import { H2, H3, Iframe } from 'honorable'

import DemoContainer from '../../components/DemoContainer'
import PropsContainer from '../../components/PropsContainer'

type ComponentPagePropsType = {
  componentName: string
  componentJson: {
    demos: {
      source: string
      name: string
      url: string
    }[]
    props: any
    partsUrl: string
  }
}

function ComponentPage({ componentName, componentJson }: ComponentPagePropsType) {
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
      <H3 mt={4}>Styling parts</H3>
      <Iframe
        mt={2}
        src={componentJson.partsUrl}
        width="100%"
        height={512}
      />
    </>
  )
}

export default ComponentPage
