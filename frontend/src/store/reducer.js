import { CHANGE_DATABASE_ERROR, CHANGE_DATABASE_REQUEST, CHANGE_DATABASE_SUCCESS, GET_DATABASE_ERROR, GET_DATABASE_REQUEST, GET_DATABASE_SUCCESS, POST_QUERY_ERROR, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./types";


const initState = {
    loading:false,
    error:false,
    res:[],
    database: {
        loading: false,
        error: false,
        databases: []
    },
    tables: "",
    currentDb:""
}

const reducer = (state=initState,action)=>{
    switch(action.type){
        case POST_QUERY_REQUEST:{
            return {
                ...state,loading:true
            }
        }
        case POST_QUERY_SUCCESS:{
            return {
                ...state,loading:false,res:action.payload
            }
        }
        case POST_QUERY_ERROR:{
            return {
                ...state,loading:false,error:true
            }
        }
        case GET_DATABASE_REQUEST: {
            return {
                ...state,database: {...state.database, loading: true}
            }
        }
        case GET_DATABASE_SUCCESS: {
            return {
                ...state,database: {...state.database, databases: action.payload.database}, tables: action.payload.tables
            }
        }
        case GET_DATABASE_ERROR: {
            return {
                ...state,database: {...state.database, loading:false, error: true }
            }
        }
        case CHANGE_DATABASE_REQUEST: {
            return {
                ...state,loading: true
            }
        }
        case CHANGE_DATABASE_SUCCESS: {
            return {
                ...state,loading: false, currentDb: action.payload
            }
        }
        case CHANGE_DATABASE_ERROR: {
            return {
                ...state,loading: false, error: true
            }
        }
        default: return state;
    }
}

export default reducer;