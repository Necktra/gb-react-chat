import {
  FETCH_STATUSES
} from '../../utils/constants';
import {
  GET_SINGLES_FAILURE,
  GET_SINGLES_REQUEST,
  GET_SINGLES_SUCCESS,
} from './actions';

const initialState = {
  singles: [],
  request: FETCH_STATUSES.IDLE,
  error: null,
};

function singlesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLES_REQUEST:
      return {
        ...state, error: null,
        request: FETCH_STATUSES.REQUEST
      };
    case GET_SINGLES_SUCCESS:
      return {
        ...state, singles: action.payload.data.cards,
        request: FETCH_STATUSES.SUCCESS
      };
    case GET_SINGLES_FAILURE:
      return {
        ...state, error: action.payload.message,
        request: FETCH_STATUSES.FAILURE
      };
    default:
      return state;
  }
}

export default singlesReducer;