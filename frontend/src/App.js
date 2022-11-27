import { Box, Flex, Spacer } from '@chakra-ui/react';
import Editor from './components/Editor';
import Results from './components/Results';

function App() {
  return (
    <Box>
      <Flex>
        <Box p='4' w={'100vw'} height='100vh' bg='red.400'>
          <Editor/>
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
