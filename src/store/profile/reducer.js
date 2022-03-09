import {
  CHANGE_NAME,
  TOGGLE_SHOW_NAME
} from './actions';

const initialState = {
  showName: true,
  name: 'Nickname'
}

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW_NAME:
      return {
        ...state, showName: !state.showName
      }
      case CHANGE_NAME:
        return {
          ...state, name: action.name
        }
        default:
          return state;
  }
}


export default profileReducer;