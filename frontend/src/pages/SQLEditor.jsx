import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import Editor from '../components/Editor'
import Databases from '../components/Databases'
import Results from '../components/Results'
import { BsDatabaseFillAdd } from "react-icons/bs";
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { toastContext } from '../contexts/toast'
import { useDispatch } from 'react-redux'
import { getDatabases } from '../store/action'

const SQLEditor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newDBName, setNewDBName] = useState("");
  const {toast} = useContext(toastContext);
  const dispatch = useDispatch();

  const createDbApi = async () => {
    let res = await axios({
      method: "POST",
      url:"http://localhost:8000/createdatabase",
      data: newDBName,
      headers: {
        "Content-Type": "text/plain"
      }
    })

    return res.data;
  }
  const handleCreateDB = async ()=> {
    const res = await createDbApi();
    if(res === "Database created successfully"){
      toast({
        title: 'Created',
        description: "Database created successfully",
        status: 'success',
        duration: 7000,
        isClosable: true,
      })
      dispatch(getDatabases());
    }
  }
  return (
    <div>
      <Flex>
        <Box p='4' w={'100vw'} height='100vh' bg='red.400' sx={{
          display:'flex',
          flexDirection: "row",
        }}>
          <Box name="sidebar" w='8%' sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between",
            position:"relative",
            left: -2,
            top: 0
          }}>
            <Box></Box>
            <Box>
              <Tooltip label="Create Database"><Button onClick={onOpen}><BsDatabaseFillAdd /></Button></Tooltip>
            </Box>
          </Box>
          <Box w='92%'  sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <Editor/>
            <Databases/>
          </Box>
        </Box>
        <Spacer />
        <Box p='4' w='100vw' h='100vh' bg='green.400' sx={{
          overflow: "scroll"
        }}>
          <Results/>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Database</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Database name' value={newDBName} onChange={(ev)=>setNewDBName(ev.target.value)}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreateDB}>
              Create DB
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SQLEditor;
