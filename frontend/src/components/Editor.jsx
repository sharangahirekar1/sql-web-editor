import { Box, Button, Textarea } from '@chakra-ui/react'
import React from 'react';
import { useDispatch } from 'react-redux';
import { postApi } from '../store/action';

const Editor = () => {
    const [query,setQUery] = React.useState({});
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        const {value} = e.target;
        setQUery(value);
    }
    const handleSubmit = ()=>{
        dispatch(postApi(query));
    }
  return (
    <Box>
        <Textarea onChange={handleChange} bgColor={'whiteAlpha.900'} placeholder='SELECT * FROM employee;' siz='lg' resize={'vertical'}  />
        <Box sx={{display:'flex',justifyContent:'space-between',mt:2}}>
            <Box></Box>
            <Button onClick={handleSubmit} colorScheme='whatsapp'>GET QUERY</Button>
        </Box>
    </Box>
  )
}

export default Editor