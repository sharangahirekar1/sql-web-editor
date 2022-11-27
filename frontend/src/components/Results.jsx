import { Box, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux'

const Results = () => {
    const res = useSelector((state)=>state.res);
    console.log(res);
    const header = Array.isArray(res) && res.length != 0 && Object.keys(res[0]);
  return (
    <Box>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {header && header.map((h)=><Th>{h}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
              {Array.isArray(res) && res.length != 0 && res.map((row)=>{
                let rowValues = Object.values(row);
                return <Tr>{rowValues.map((cell)=><Td>{cell}</Td>)}</Tr>
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Results