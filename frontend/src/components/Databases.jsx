import { changeDatabase, getDatabases } from './../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { toastContext } from './../contexts/toast';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react';


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
        {/* <Heading sx={{
          position: 'fixed'
        }}>
          DATABASES
        </Heading> */}
        <Box sx={{
          position: 'relative',
          top: 0
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
            <AccordionItem key={i+database.Database}>
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
  

export default Databases;