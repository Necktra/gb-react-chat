import {
  ADD_NEW_CHAT,
  DELETE_CHAT
} from './actions';

const initialState = [];

function chatsReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_NEW_CHAT:
      const stateForLoop = [...state];
      if (stateForLoop.find((el) => el.id === action.payload.id)) {
        return state;
      }
      return [...state, {
        id: action.payload.id,
        name: action.payload.name
      }];

    case DELETE_CHAT:
      return state.filter(el => el.id !== action.payload.id);
    default:
      return state;
  }
}

export default chatsReducer;