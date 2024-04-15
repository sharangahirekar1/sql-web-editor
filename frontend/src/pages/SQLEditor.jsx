import { Box, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import Editor from '../components/Editor'
import Databases from '../components/Databases'
import Results from '../components/Results'

const SQLEditor = () => {
  return (
    <div>
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
        <Box p='4' w='100vw' h='100vh' bg='green.400' sx={{
          overflow: "scroll"
        }}>
          <Results/>
        </Box>
      </Flex>
    </div>
  )
}

export default SQLEditor;
