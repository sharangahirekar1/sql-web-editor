import { Box, Button, Textarea } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { postApi } from '../store/action';
import { DataContext } from '../contexts/dataContext';

const Editor = () => {
    const {query, setQUery} = useContext(DataContext);
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        const {value} = e.target;
        setQUery(value);
    }
    const handleSubmit = ()=>{
        dispatch(postApi(query));
    }
    React.useEffect(()=>{
        if(query !== "" ){
            setTimeout(()=>{
                handleSubmit();
            },500)
        }
    },[query])
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