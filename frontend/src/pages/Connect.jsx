import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DataContext } from '../contexts/dataContext';

const Connect = () => {
  const [connData, setConnData] = React.useState({
    username: "root",
    password: "",
    database: "test"
  })
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
    if(connectionStatus) navigate("/editor");
  },[connectionStatus])

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
