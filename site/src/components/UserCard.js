/* eslint-disable no-multi-spaces */
import { A, Article, Button, Div, H3, Icon, Img, P } from 'honorable'

import MessageIcon from './MessageIcon'

const defaultUser = {
  name: 'John Smith',
  imageUrl: '/images/user.jpeg',
  email: 'john.smith@abc.com',
}

export default function UserCard({ user = defaultUser, ...props }) {
  return (
    <Article
      padding="1rem"
      border="1px solid border"
      borderRadius={4}
      backgroundColor="background"
      {...props}
    >
      <Div display="flex">
        <Img
          src="/images/user.jpeg"
          width={64}
          borderRadius={4}
        />
        <Div marginLeft="1rem">
          <H3>
            {user.name}
          </H3>
          <P
            color="text-light"
            marginTop="0.25rem"
          >
            {user.email}
          </P>
        </Div>
      </Div>
      <Div
        marginTop="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <A>
          <Icon mr={0.5}>
            <MessageIcon />
          </Icon>
          Message
        </A>
        <Button ml={1}>
          Hire
        </Button>
      </Div>
    </Article>
  )
}

export function USerCardShorthands({ user = defaultUser, ...props }) {
  return (
    <Article
      p={1}
      border="1px solid border"
      borderRadius={4}
      backgroundColor="background"
      {...props}
    >
      <Div xflex="x4">
        <Img
          src="/images/user.jpeg"
          width={64}
          borderRadius={4}
        />
        <Div ml={1}>
          <H3>
            {user.name}
          </H3>
          <P
            color="text-light"
            mt={0.25}
          >
            {user.email}
          </P>
        </Div>
      </Div>
      <Div
        mt={1}
        xflex="x5b"
      >
        <A>
          <Icon mr={0.5}>
            <MessageIcon />
          </Icon>
          Message
        </A>
        <Button ml={1}>
          Hire
        </Button>
      </Div>
    </Article>
  )
}
