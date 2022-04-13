import { useState } from 'react'
import { A, Button, Div, Footer, H1, H2, Modal, Nav, P, Table, Tbody, Td, Th, Thead, Tr } from 'honorable'

const cards = [
  {
    title: 'Active users',
    figure: '1,234',
  },
  {
    title: 'Turnnover',
    figure: '1.2M',
  },
  {
    title: 'Revenue',
    figure: '$777k',
  },
]

const tableRows = [
  {
    company: 'Google',
    contactName: 'John Doe',
    contractSize: '$1.2M',
    country: 'USA',
  },
  {
    company: 'Microsoft',
    contactName: 'Jane Smith',
    contractSize: '$3.2M',
    country: 'USA',
  },
  {
    company: 'Tata',
    contactName: 'Amit Singh',
    contractSize: '$2.6M',
    country: 'India',
  },
  {
    company: 'Total',
    contactName: 'Pierre Martin',
    contractSize: '$4.2M',
    country: 'France',
  },
  {
    company: 'Alibaba',
    contactName: 'Lu Linghu',
    contractSize: '$3.2M',
    country: 'China',
  },
]

function Dashboard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Nav
        borderBottom="1px solid border"
        flexShrink={1}
        px={2}
        py={1}
        xflex="x4"
      >
        <H1
          m={0}
          fontSize="2rem"
        >
          Dashboard
        </H1>

        <Div flexGrow={1} />
        <Button onClick={() => setOpen(true)}>
          Open modal
        </Button>
      </Nav>
      <Div
        xflex="y2s"
        flexGrow={1}
        pt={2}
        pl={2}
        pr={0}
        pb={2}
        backgroundColor="background-light"
      >
        <Div
          xflex="x21b"
        >
          {cards.map(({ title, figure }, index) => (
            <Div
              flexGrow={1}
              flexBasis={`${100 / 4}%`}
              key={index}
              backgroundColor="background"
              mr={2}
              mb={2}
              py={3}
              borderRadius={4}
              xflex="y5"
              elevation={1}
            >
              <H2
                fontSize="1.5rem"
                m={0}
              >
                {title}
              </H2>
              <H1
                fontSize="2rem"
                m={0}
                mt={1}
              >
                {figure}
              </H1>
            </Div>
          ))}
        </Div>
        <Div
          mr={2}
          elevation={1}
          borderRadius={4}
          overflow="hidden"
        >
          <Table>
            <Thead>
              <Tr>
                <Th>
                  Company
                </Th>
                <Th>
                  Contact name
                </Th>
                <Th>
                  Contract size
                </Th>
                <Th>
                  Country
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableRows.map(({ company, contactName, contractSize, country }, index) => (
                <Tr key={index}>
                  <Td>
                    {company}
                  </Td>
                  <Td>
                    {contactName}
                  </Td>
                  <Td>
                    {contractSize}
                  </Td>
                  <Td>
                    {country}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Div>
        <Div flexGrow={1} />
        <Footer
          flexShrink={0}
          mt={2}
          xflex="x4"
          pr={2}
        >
          <P
            text="small"
            m={0}
          >
            Copyright © 2022 Company
          </P>
          <Div flexGrow={1} />
          <A ml={0.5}>
            About
          </A>
          <A ml={0.5}>
            Privacy
          </A>
          <A ml={0.5}>
            Terms
          </A>
        </Footer>
      </Div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        p={2}
        maxWidth={512 + 64 + 8}
      >
        <H1
          m={0}
          fontSize="2rem"
        >
          A modal just appeared!
        </H1>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </P>
        <Div
          pt={2}
          xflex="x6"
        >
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            onClick={() => setOpen(false)}
            ml={0.5}
          >
            Continue
          </Button>
        </Div>
      </Modal>
    </>
  )
}

export default Dashboard
