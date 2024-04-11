import { Box, Flex, Heading, Spacer, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Editor from './components/Editor';
import Results from './components/Results';
import React from 'react';
import { changeDatabase, getDatabases } from './store/action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const databases = useSelector((state)=>state.database.databases);
  React.useEffect(()=>{
    dispatch(getDatabases());
  },[])

  const handleChangeDB = (db) => {
    dispatch(changeDatabase(db));
  }
  return (
    <Box>
      <Flex>
        <Box p='4' w={'100vw'} height='100vh' bg='red.400' sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <Editor/>
          <Box height="30vh" p='4' bg='yellow.400' sx={{
            overflowY: "auto",
            position: 'relative',
          }}>
            <Heading sx={{
              position: 'fixed'
            }}>
              DATABASES
            </Heading>
            <Box sx={{
              position: 'relative',
              top: 10
            }}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Database</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {databases?.map((database,i)=>(
                    <Tr key={`${database.Database} ${i}`} onClick={()=>handleChangeDB(database.Database)}>
                      <Td>{i+1}</Td>
                      <Td>{database.Database}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
        <Spacer />
        <Box p='4' w='100vw' h='100vh' bg='green.400'>
          <Results/>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
