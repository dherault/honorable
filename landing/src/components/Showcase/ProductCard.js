/* eslint-disable no-multi-spaces */
import { Article, Button, Div, H2, Img, P, Span } from 'honorable'

const defaultProduct = {
  name: 'Jersey T-Shirt',
  imageUrl: '/images/tshirt.png',
  color: '#0074BB',
  description: 'Iconic AA classic tee shirt in fine jersey, a super soft everyday fabric. A wardrobe staple and a must have',
  price: '$20',
}

export default function ProductCard({ product = defaultProduct }) {
  return (
    <Article
      padding="2rem"
      borderRadius={4}
      maxWidth={512}
      display="flex"
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
    >
      <Img
        marginTop="1rem"
        src={product.imageUrl}
        width="45%"
        alt="product"
      />
      <Div
        marginLeft="2rem"
        display="flex"
        flexDirection="column"
      >
        <H2 textAlign="center">
          {product.name}
        </H2>
        <P marginTop="1rem">
          {product.description}
        </P>
        <P
          marginTop="0.5rem"
          display="flex"
          alignItems="center"
        >
          Color:
          <Span
            display="inline-block"
            width={16}
            height={16}
            borderRadius={2}
            marginLeft="0.5rem"
            backgroundColor={product.color}
          />
        </P>
        <Div flexGrow={1} />
        <Div
          marginTop="1rem"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <P fontWeight="bold">
            {product.price}
          </P>
          <Button marginLeft="1rem">
            Buy
          </Button>
        </Div>
      </Div>
    </Article>
  )
}

export function ProductCardShorhands({ product = defaultProduct }) {
  return (
    <Article
      p={2}
      borderRadius={4}
      maxWidth={512}
      xflex="x4s"
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
    >
      <Img
        mt={1}
        src={product.imageUrl}
        width="45%"
        alt="product"
      />
      <Div
        ml={1}
        xflex="y2s"
      >
        <H2 textAlign="center">
          {product.name}
        </H2>
        <P mt={1}>
          {product.description}
        </P>
        <P
          mt={0.5}
          xflex="x4"
        >
          Color:
          <Span
            display="inline-block"
            width={16}
            height={16}
            borderRadius={2}
            ml={0.5}
            backgroundColor={product.color}
          />
        </P>
        <Div flexGrow={1} />
        <Div
          mt={1}
          xflex="x6"
        >
          <P fontWeight="bold">
            {product.price}
          </P>
          <Button ml={1}>
            Buy
          </Button>
        </Div>
      </Div>
    </Article>
  )
}
