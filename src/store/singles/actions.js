import {
    BASE_MTG_API_URL
} from "../../utils/constants";

export const GET_SINGLES_REQUEST = "GISTS::GET_SINGLES_REQUEST";
export const GET_SINGLES_SUCCESS = "GISTS::GET_SINGLES_SUCCESS";
export const GET_SINGLES_FAILURE = "GISTS::GET_SINGLES_FAILURE";

export const getSinglesRequest = () => ({
    type: GET_SINGLES_REQUEST,
});

export const getSinglesSuccess = (data) => ({
    type: GET_SINGLES_SUCCESS,
    payload: {
        data
    }
});

export const getSinglesFailure = (err) => ({
    type: GET_SINGLES_FAILURE,
    payload: err,
});

export const getSinglesThunk = () => async (dispatch, getState) => {
    dispatch(getSinglesRequest());

    try {
        const response = await fetch(BASE_MTG_API_URL + "/cards?pageSize=12");
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json();
        dispatch(getSinglesSuccess(result));
    } catch (err) {
        dispatch(getSinglesFailure(err));
        console.warn(err.message);
    }
};