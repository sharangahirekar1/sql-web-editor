import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { useContext } from 'react';
import SQLEditor from './pages/SQLEditor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Connect from './pages/Connect';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Connect/>
  },
  {
    path: "/editor",
    element: <SQLEditor/>
  }
])

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
