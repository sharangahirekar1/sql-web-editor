import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, Spacer, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Editor from './components/Editor';
import Results from './components/Results';
import React, { useContext } from 'react';
import { changeDatabase, getDatabases } from './store/action';
import { useDispatch, useSelector } from 'react-redux';
import { toastContext } from './contexts/toast';

function App() {
  return (
    <Box>
      <Flex>
        <Box p='4' w={'100vw'} height='100vh' bg='red.400' sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <Editor/>
          <Databases/>
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




const Databases = (props) => {
  const dispatch = useDispatch();
  const { toast } = useContext(toastContext);
  const databases = useSelector((state)=>state.database.databases);
  const tables = useSelector((state)=>state.tables);
  console.log(tables, 'tables ')
  React.useEffect(()=>{
    dispatch(getDatabases());
  },[])

  const handleChangeDB = (db) => {
    dispatch(changeDatabase(db));
    toast({
      title: 'Database changed',
      description: "Database changed to " + db,
      status: 'success',
      duration: 7000,
      isClosable: true,
    })
  }
  return (
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
        {/* <Table>
          <Thead>
            <Tr>
              <Th>Sr. No.</Th>
              <Th>Database</Th>
            </Tr>
          </Thead>
          <Tbody>
            {databases?.map((database,i)=>(
              <Tr sx={{
                cursor: "pointer"
              }} key={`${database.Database} ${i}`} onClick={()=>handleChangeDB(database.Database)}>
                <Td>{i+1}</Td>
                <Td>{database.Database}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}
        <Accordion>
          {databases?.map((database,i)=>(
          <AccordionItem key={i+database}>
            <h2>
              <AccordionButton onClick={()=>handleChangeDB(database.Database)}>
                <Box as='span' flex='1' textAlign='left'>
                  {database.Database}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Sr no.</Th>
                    <Th>Tables in {database.Database}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tables?.map((table,ind)=>(
                    <Tr>
                      <Td>{ind + 1}</Td>
                      <Td>{Object.values(table)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  )
}
