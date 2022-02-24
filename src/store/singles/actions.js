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

export const getSinglesThunk = () => (dispatch, getState) => {
    dispatch(getSinglesRequest())
    fetch(BASE_MTG_API_URL + "/cards?pageSize=12")
        .then(res => {
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`)
            }
            return res.json();
        })
        .then(data => {
            dispatch(getSinglesSuccess(data.cards))
        }).catch((err) => {
            dispatch(getSinglesFailure(err.message))
        });
};