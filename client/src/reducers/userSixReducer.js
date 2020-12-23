import * as userSixConstants from "../constants/userSixConstant";
import { message } from 'antd';
const initialState = {
    listUserSix: [],
    userSixEditing: null,
    userEditGet:{

    }
}
const userSixReducer = (state = initialState, action) => {
    switch (action.type) {
        case userSixConstants.FETCH_LIST_USER_SIX: {
            return {
                ...state,
                listUserSix: []
            }
        }
        case userSixConstants.FETCH_LIST_USER_SIX_SUCCESS: {
            return {
                ...state,
                listUserSix: action.payload.data,
            }
        }
        case userSixConstants.FETCH_LIST_USER_SIX_FAILED: {
            return {
                ...state,
                listUserSix: []
            }
        }
        case userSixConstants.DELETE_USER_SIX: {
            return {
                ...state
            }
        }
        case userSixConstants.DELETE_USER_SIX_SUCCESS: {
            message.success('Bạn đã ẩn thành công');
            return {
                ...state,
                listUserSix: state.listUserSix.filter(item => item.id !== action.payload.data),
            }
        }
        case userSixConstants.DELETE_USER_SIX_FAILED: {
            return {
                ...state
            }
        }
        case userSixConstants.ADD_USER_SIX: {
            return {
                ...state
            }
        }
        case userSixConstants.ADD_USER_SIX_SUCCESS: {
            console.log(action.payload)
            let {profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history} =action.payload
            let data = Object.assign({},{id: profiles.id}, {profiles:profiles}, { degree: degrees });
            data = Object.assign({}, data,{department: departments})
            data = Object.assign({}, data,{journalistCard:journalist_cards})
            data = Object.assign({}, data,{personalHistory:personal_histories})
            data = Object.assign({}, data,{workObject:work_objects})
            console.log(data);
            message.success('Bạn đã thêm thành công');
            return {
                ...state, listUserSix: [...state.listUserSix, data]
            }
        }
        case userSixConstants.ADD_USER_SIX_FAILED: {
            return {
                ...state
            }
        }
        case userSixConstants.EDIT_USER_SIX: {
            return {
                ...state,
                userSixEditing: action.payload.userSix
            }
        }
        case userSixConstants.EDIT_USER_SIX_SUCCESS: {
            let {profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history} =action.payload
            let data = Object.assign({},{id: profiles.id}, {profiles:profiles}, { degree: degrees},
                {department: departments},{journalistCard:journalist_cards},{personalHistory:personal_histories},
                {workObject:work_objects} );
            console.log(data);
            const { listUserSix } = state;
            const index = listUserSix.findIndex(item => item.id == profiles.id);
            message.success('Bạn đã update thành công');
            if (index !== -1) {
                const newList = [
                    ...listUserSix.slice(0, index),
                    data,
                    ...listUserSix.slice(index + 1),
                ];
                return {
                    ...state,
                    listUserSix: newList,
                };
            }
            return {
                ...state,
            };
        }
        case userSixConstants.EDIT_USER_SIX_FAILED: {
            return {
                ...state
            }
        }
        case userSixConstants.EDIT_USER_SIX_GET: {
            return {
                ...state,
            }
        }
        case userSixConstants.EDIT_USER_SIX_GET_SUCCESS: {
            console.log(action.payload.data);
            return {
                ...state,
                userEditGet: action.payload.data,
            }
        }
        case userSixConstants.EDIT_USER_SIX_GET_FAILED: {
            return {
                ...state,
            }
        }
        default:
            return initialState
    }
}
export default userSixReducer;