import { Table, Tbody, Td, Th, Thead, Tr } from 'honorable'

function PropsContainer({ componentProps, ...props }) {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            Property
          </Th>
          <Th>
            Type
          </Th>
          <Th>
            Description
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {componentProps.map(({ name, type, description }) => (
          <Tr key={name}>
            <Td>
              {name}
            </Td>
            <Td>
              {type}
            </Td>
            <Td>
              {description}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default PropsContainer
