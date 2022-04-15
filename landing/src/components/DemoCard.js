import { Button, Div, H3, Img, Span } from 'honorable'

function UserCard({ user = {} }) {
  return (
    <Div
      padding="2rem"
      elevation={1}
    >
      <Div display="flex">
        <Img
          src={user.imageUrl}
          width="64px"
          height="64px"
          alt="user profile"
        />
        <H3 marginLeft="1rem">
          {user.name}
        </H3>
      </Div>
      <Div marginTop="1rem">
        {user.bio}
      </Div>
      <Div
        marginTop="1rem"
        display="flex"
        justifyContent="flex-end"
      >
        <Button>
          Contact
        </Button>
      </Div>
    </Div>
  )
}

export function UserCardShorhands({ user = {} }) {
  return (
    <Div
      p={2}
      elevation={1}
    >
      <Div xflex="x4">
        <Img
          src={user.imageUrl}
          width="64px"
          height="64px"
          alt="user profile"
        />
        <H3 ml={1}>
          {user.name}
        </H3>
      </Div>
      <Div mt={1}>
        {user.bio}
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

export default UserCard
