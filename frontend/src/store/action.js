import axios from 'axios';
import { CHANGE_DATABASE_ERROR, CHANGE_DATABASE_REQUEST, CHANGE_DATABASE_SUCCESS, GET_DATABASE_ERROR, GET_DATABASE_REQUEST, GET_DATABASE_SUCCESS, POST_QUERY_ERROR, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from './types';


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

export const getDatabases = () => (dispatch) => {
    dispatch ({type: GET_DATABASE_REQUEST});

    axios({
        method: "GET",
        url: "http://localhost:8000/databases",
        headers: {
            "Content-Type": "text/plain"
        }
    }).then((res)=>{
        dispatch({type: GET_DATABASE_SUCCESS, payload: res.data});
    }).catch((err)=>dispatch({type: GET_DATABASE_ERROR}))
}

export const changeDatabase = (dbName) => (dispatch) => {
    dispatch({type: CHANGE_DATABASE_REQUEST});
    axios({
        method: "POST",
        url: "http://localhost:8000/changedatabase",
        data: dbName,
        headers: {
            "Content-Type": "text/plain"
        }
    }).then((res)=>{
        dispatch({type: CHANGE_DATABASE_SUCCESS, payload: res.data});
    }).catch((err)=>dispatch({type: CHANGE_DATABASE_ERROR}))
}