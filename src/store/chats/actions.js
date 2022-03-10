import {
    onChildAdded,
    onChildRemoved,
} from "@firebase/database";
import {
    chatsRef
} from "../../services/firebase";

export const ADD_NEW_CHAT = 'CHATS::ADD_NEW_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';

export const addNewChat = (id, name) => ({
    type: ADD_NEW_CHAT,
    payload: {
        'id': id,
        'name': name,
    }
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: {
        id,
    }
});

export const initChatsTracking = () => async (dispatch) => {
    await onChildAdded(chatsRef, (snapshot) => {
        dispatch(addNewChat(snapshot.val().id, snapshot.val().name));
    });

    await onChildRemoved(chatsRef, (snapshot) => {
        dispatch(deleteChat(snapshot.val().id));
    });
};