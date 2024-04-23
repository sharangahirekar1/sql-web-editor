import { Box, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { toastContext } from '../contexts/toast';

const Results = () => {
    const res = useSelector((state)=>state.res);
    const header = Array.isArray(res) && res.length != 0 && Object.keys(res[0]);
    const { toast } = useContext(toastContext);
    React.useEffect(()=>{
      if(Array.isArray(res) && res.length != 0 ){
        toast({
          title: 'Results fetched',
          description: "Response fetched for the given query",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      }
    },[res])
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
              {Array.isArray(res) && res.length != 0 && res.map((row,i)=>{
                let rowValues = Object.values(row);
                return <Tr sx={{
                  bgColor: i % 2 === 0 ? "#013220" : 'transparent',
                  color: i % 2 === 0 ? "white" : "black"
                }}>{rowValues.map((cell)=><Td>{cell}</Td>)}</Tr>
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Results