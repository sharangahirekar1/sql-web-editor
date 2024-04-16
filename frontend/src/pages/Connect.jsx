import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const [connData, setConnData] = React.useState({
    username: "root",
    password: "",
    database: "test"
  })
  const navigate = useNavigate()

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
    return axios({
      method: "POST",
      url: "http://localhost:8000/connect",
      data: connData,
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  const handleConnect = ()=> {
    connectApi().then((res)=>{
      if(res.data === "Connection successful") {
        navigate("/editor");
      }
    })
  }

  console.log(connData, "connection data");
  return (
    <Box>
      <FormControl>
        <FormLabel>User name</FormLabel>
        <Input name={"username"} type='text' value={connData.username} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input name={"password"} type='password' value={connData.password} onChange={handleInputChange} />
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
