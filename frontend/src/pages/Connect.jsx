import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DataContext } from '../contexts/dataContext';
import { toastContext } from '../contexts/toast';

const Connect = () => {
  const [connData, setConnData] = React.useState({
    username: "root",
    password: "",
    database: "test"
  })
  const { toast } = useContext(toastContext);
  const navigate = useNavigate();
  const {connectionStatus, setConnectionStatus} = useContext(DataContext);

  const handleInputChange = (ev)=>{
    const value = ev.target.value;
    const key = ev.target.name;
    switch (key) {
      case "username": {
        setConnData({...connData, username: value});
        break;
      }
      case "password": {
        setConnData({...connData, password: value});
        break;
      }
      case "database": {
        setConnData({...connData, database: value});
        break;
      }
      default: return 
    }
    
  }

  const connectApi = async () => {
    if(connData.password === "") return ""
    let res = await axios({
      method: "POST",
      url: "http://localhost:8000/connect",
      data: connData,
      headers: {
        "Content-type": "application/json"
      }
    })

    return res.data;
  }

  const handleConnect = async ()=> {
    let res = await connectApi();
    if(res === "Connection successful") {
      setConnectionStatus(true);
    }
  }

  React.useEffect(()=>{
    if(connectionStatus){
      toast({
        title: 'Connection Successfull',
        description: "Redirecting to editor ...",
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      setTimeout(()=>{
        navigate("/editor");
      },1000)
    }
  },[connectionStatus])

  console.log(connData, "connection data");
  return (
    <Box sx={{
      margin: "auto",
      width: "50%",
      background: "#f5f5dc",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}>
      <Heading sx={{
        textAlign: "center",
        marginBottom: "50px"
      }}>CONNECT TO SQL DATABASE</Heading>
      <FormControl>
        <FormLabel>User name</FormLabel>
        <Input name={"username"} type='text' value={connData.username} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input name={"password"} placeholder='password' type='password' value={connData.password} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Database</FormLabel>
        <Input name={"database"} type='text' value={connData.database} onChange={handleInputChange} />
      </FormControl>

      <Button onClick={handleConnect} colorScheme='blue'>Connect</Button>
    </Box>
  )
}

export default Connect;
