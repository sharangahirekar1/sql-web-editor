import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { useContext } from 'react';
import SQLEditor from './pages/SQLEditor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Connect from './pages/Connect';
import VerifyConnection from './hoc/VerifyConnection';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Connect/>
  },
  {
    path: "/editor",
    element: <VerifyConnection/>
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
