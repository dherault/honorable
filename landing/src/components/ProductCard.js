/* eslint-disable no-multi-spaces */
import { Article, Button, Div, H2, H3, Img, P } from 'honorable'

const defaultProduct = {
  name: 'Basic T-Shirt',
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
      maxWidth={320}
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
    >
      <H2 textAlign="center">
        {product.name}
      </H2>
      <Img
        marginTop="1rem"
        src={product.imageUrl}
        width="100%"
        alt="product"
      />
      <P marginTop="1rem">
        {product.description}
      </P>
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
    </Article>
  )
}

export function ProductCardShorhands({ product = defaultProduct }) {
  return (
    <Div
      p={2}
      elevation={1}
    >
      <Div xflex="x4">
        <Img
          src={product.imageUrl}
          width="64px"
          height="64px"
          alt="product profile"
        />
        <H3 ml={1}>
          {product.name}
        </H3>
      </Div>
      <Div mt={1}>
        {product.bio}
      </Div>
      <Div
        mt={1}
        xflex="x6"
      >
        <Button>
          Contact
        </Button>
      </Div>
    </Div>
  )
}
