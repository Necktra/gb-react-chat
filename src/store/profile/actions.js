import {
    getProfileNameRef,
} from "../../services/firebase";
import {
    set
} from 'firebase/database';
import {
    auth
} from './../../services/firebase';

export const TOGGLE_SHOW_NAME = 'PROFILE::TOGGLE_SHOW_NAME';
export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';

export const toggleShowName = {
    type: TOGGLE_SHOW_NAME
};

export const changeName = (newName) => ({
    type: CHANGE_NAME,
    name: newName,
});


export const changeNameThunk = (newName) => async (dispatch, getState) => {

    try {
        await set(getProfileNameRef(auth.currentUser.uid), newName);
        dispatch(changeName(newName));
    } catch (e) {
        console.log(e);
    }
};