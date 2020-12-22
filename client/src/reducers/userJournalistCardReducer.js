import * as userJournalistCardConstants from "../constants/userJournalistCardConstant";
import {message } from 'antd';
const initialState = {
    listUserJournalistCard: [],
    userJournalistCardEditing: null,
}
const userJournalistCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD: {
            return {
                ...state,
                listUserJournalistCard: []
            }
        }
        case userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD_SUCCESS: {
            return {
                ...state,
                listUserJournalistCard: action.payload.data,
            }
        }
        case userJournalistCardConstants.FETCH_LIST_USER_JOURNALIST_CARD_FAILED: {
            return {
                ...state,
                listUserJournalistCard:[]
            }
        }
        case userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD: {
            return {
                ...state
            }
        }
        case userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD_SUCCESS: {
            message.success('Bạn đã xoá thành công');
            return {
                ...state,
                listUserJournalistCard: state.listUserJournalistCard.filter(item => item.id !==action.payload.data),
            }
        }
        case userJournalistCardConstants.DELETE_USER_JOURNALIST_CARD_FAILED: {
            return {
                ...state
            }
        }
        case userJournalistCardConstants.ADD_USER_JOURNALIST_CARD: {
            return {
                ...state
            }
        }
        case userJournalistCardConstants.ADD_USER_JOURNALIST_CARD_SUCCESS: {
            const { data } = action.payload
            return {
                ...state, listUserJournalistCard: [...state.listUserJournalistCard, data]
            }
        }
        case userJournalistCardConstants.ADD_USER_JOURNALIST_CARD_FAILED: {
            return {
                ...state
            }
        }
        case userJournalistCardConstants.EDIT_USER_JOURNALIST_CARD: {
            return {
                ...state,
                userJournalistCardEditing: action.payload.userJournalistCard
            }
        }
        default:
            return initialState
    }
}
export default userJournalistCardReducer;