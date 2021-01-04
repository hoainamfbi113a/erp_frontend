import * as roleConstants from "../constants/roleConstant"
const initialState = {
    listRole:[],
}
const roleReducer = (state= initialState, action) =>{
    switch(action.type){
        case roleConstants.FETCH_LIST_ROLE:{
            return {
                ...state,
                listRole:[]
            }
        }
        case roleConstants.FETCH_LIST_ROLE_SUCCESS:{
            return {
                ...state,
                listRole:action.payload.data
            }
        }
        case roleConstants.FETCH_LIST_ROLE_FAILED:{
            return {
                ...state,
                listRole:[]
            }
        }
        default:
            return initialState
    }
}
export default roleReducer;