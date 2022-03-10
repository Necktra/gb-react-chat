import {
    getMessageListRefByChatId
} from './../../services/firebase';
import {
    onChildAdded
} from '@firebase/database';

export const SEND_NEW_MESSAGE = 'MESSAGES::SEND_NEW_MESSAGE';

export const sendNewMessage = (chatId, messageId, author, name, text) => ({
    type: SEND_NEW_MESSAGE,
    payload: {
        chatId,
        messageId,
        author,
        name,
        text,
    }
});

export const initMessageTracking = (chatId) => async (dispatch) => {
    await onChildAdded(getMessageListRefByChatId(chatId), (snapshot) => {
        dispatch(sendNewMessage(chatId, snapshot.val().messageId, snapshot.val().author, snapshot.val().name, snapshot.val().text));
    });
};