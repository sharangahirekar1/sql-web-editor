import { POST_QUERY_ERROR, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./types";


const initState = {
    loading:false,
    error:false,
    res:[]
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
        default: return state;
    }
}

export default reducer;