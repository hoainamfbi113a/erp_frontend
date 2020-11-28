import * as userPersonalHistoryConstants from "../constants/userPersonalHistoryConstant";
import {message } from 'antd';
const initialState = {
    listUserPersonalHistory: [],
    userPersonalHistoryEditing: null,
}
const userPersonalHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY: {
            return {
                ...state,
                listUserPersonalHistory: []
            }
        }
        case userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY_SUCCESS: {
            return {
                ...state,
                listUserPersonalHistory: action.payload.data,
            }
        }
        case userPersonalHistoryConstants.FETCH_LIST_USER_PERSONAL_HISTORY_FAILED: {
            return {
                ...state,
                listUserPersonalHistory:[]
            }
        }
        case userPersonalHistoryConstants.DELETE_USER_PERSONAL_HISTORY: {
            return {
                ...state
            }
        }
        case userPersonalHistoryConstants.DELETE_USER_PERSONAL_HISTORY_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserPersonalHistory: state.listUserPersonalHistory.filter(item => item.id !==action.payload.data),
            }
        }
        case userPersonalHistoryConstants.DELETE_USER_PERSON_HISTORY_FAILED: {
            return {
                ...state
            }
        }
        case userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY: {
            return {
                ...state
            }
        }
        case userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUserPersonalHistory: [...state.listUserPersonalHistory, data]
            }
        }
        case userPersonalHistoryConstants.ADD_USER_PERSONAL_HISTORY_FAILED: {
            return {
                ...state
            }
        }
        case userPersonalHistoryConstants.EDIT_USER_PERSONAL_HISTORY: {
            return {
                ...state,
                userPersonalHistoryEditing: action.payload.userPersonalHistory
            }
        }
        default:
            return initialState
    }
}
export default userPersonalHistoryReducer;