import axios from 'axios';
import { POST_QUERY_ERROR, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from './types';


export const postApi = (query)=>(dispatch)=>{
    dispatch({type:POST_QUERY_REQUEST});

    axios({
        method:'POST',
        url:'http://localhost:8000/',
        data: query,
        headers:{
            "Content-Type":"text/plain"
        }
    }).then((res)=>dispatch({type:POST_QUERY_SUCCESS,payload:res.data})).catch((err)=>dispatch({type:POST_QUERY_ERROR}))
}