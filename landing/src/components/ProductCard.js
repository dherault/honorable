/* eslint-disable no-multi-spaces */
import { Article, Button, Div, H3, H4, Img, P } from 'honorable'

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
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
    >
      <H4>{product.title}</H4>
      <Img
        src={product.imageUrl}
        width={128}
        alt="product"
      />
      <P marginTop="1rem">
        {product.bio}
      </P>
      <Div
        marginTop="1rem"
        display="flex"
        justifyContent="flex-end"
      >
        <Button>
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
