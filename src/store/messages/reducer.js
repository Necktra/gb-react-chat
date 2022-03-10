import {
  DELETE_CHAT
} from '../chats/actions';
import {
  SEND_NEW_MESSAGE
} from './actions';

const initialState = {};

function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_NEW_MESSAGE:
      if (state[action.payload.chatId] && state[action.payload.chatId].find((el) => el.id === action.payload.messageId)) {
        return state;
      }

      if (state[action.payload.chatId]?.length) {
        return {
          ...state,
          [action.payload.chatId]: [...state[action.payload.chatId], {
            id: action.payload.messageId,
            author: action.payload.author,
            name: action.payload.name,
            text: action.payload.text
          }]
        }
      } else {
        return {
          ...state,
          [action.payload.chatId]: [{
            id: action.payload.messageId,
            author: action.payload.author,
            name: action.payload.name,
            text: action.payload.text
          }]
        }
      };
    case DELETE_CHAT:
      let refreshMessages = {
        ...state
      };
      delete refreshMessages[action.payload.id];
      return refreshMessages;
    default:
      return state;
  }
}

export default messagesReducer;