import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Editor from '../components/Editor'
import Databases from '../components/Databases'
import Results from '../components/Results'
import { BsDatabaseFillAdd } from "react-icons/bs";

const SQLEditor = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Flex>
        <Box p='4' w={'100vw'} height='100vh' bg='red.400' sx={{
          display:'flex',
          flexDirection: "row",
        }}>
          <Box w='8%' sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <Box></Box>
            <Box>
              <Button onClick={onOpen}><BsDatabaseFillAdd /></Button>
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
            <Input placeholder='Database name'/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
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
