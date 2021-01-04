import * as userBaseConstants from "../constants/userBaseConstant";
import { message } from 'antd';
const initialState = {
    listUserBase: [],
    userBaseEditing: null,
}
const userBaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case userBaseConstants.FETCH_LIST_USER_BASE: {
            return {
                ...state,
                listUserBase: []
            }
        }
        case userBaseConstants.FETCH_LIST_USER_BASE_SUCCESS: {
            return {
                ...state,
                listUserBase: action.payload.data,
            }
        }
        case userBaseConstants.FETCH_LIST_USER_BASE_FAILED: {
            return {
                ...state,
                listUserBase: []
            }
        }
        case userBaseConstants.DELETE_USER_BASE: {
            return {
                ...state
            }
        }
        case userBaseConstants.DELETE_USER_BASE_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserBase: state.listUserBase.filter(item => item.id !== action.payload.data),
            }
        }
        case userBaseConstants.DELETE_USER_BASE_FAILED: {
            return {
                ...state
            }
        }
        case userBaseConstants.ADD_USER_BASE: {
            return {
                ...state
            }
        }
        case userBaseConstants.ADD_USER_BASE_SUCCESS: {
            const { data } = action.payload
            message.success('Bạn đã thêm thành công');
            return {
                ...state, listUserBase: [...state.listUserBase, data]
            }
        }
        case userBaseConstants.ADD_USER_BASE_FAILED: {
            return {
                ...state
            }
        }
        case userBaseConstants.EDIT_USER_BASE: {
            return {
                ...state,
                userBaseEditing: action.payload.userBase
            }
        }
        case userBaseConstants.EDIT_USER_BASE_SUCCESS: {
            const { data } = action.payload
            const { listUserBase } = state;
            const index = listUserBase.findIndex(item => item.id == data.id);
            message.success('Bạn đã update thành công');
            if (index !== -1) {
                const newList = [
                    ...listUserBase.slice(0, index),
                    data,
                    ...listUserBase.slice(index + 1),
                ];
                return {
                    ...state,
                    listUserBase: newList,
                };
            }
            return {
                ...state,
            };
        }
        case userBaseConstants.EDIT_USER_BASE_FAILED: {
            return {
                ...state
            }
        }
        default:
            return initialState
    }
}
export default userBaseReducer;
