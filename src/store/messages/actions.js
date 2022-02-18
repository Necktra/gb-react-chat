import { AUTHORS } from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';

export const SEND_NEW_MESSAGE = 'MESSAGES::SEND_NEW_MESSAGE';

export const sendNewMessage = (chatId, messageId, author, text) => ({
    type: SEND_NEW_MESSAGE,
    payload: {
        chatId,
        messageId,
        author,
        text,
    }
});

let botAnswerInterval;

export const sendNewMessageThunk = (chatId, messageId, author, text) => async (dispatch, getState) => {
    dispatch(sendNewMessage(chatId, messageId, author, text));
    clearTimeout(botAnswerInterval);
    if (author === AUTHORS.AUTHOR_ME){
        botAnswerInterval = setTimeout(() => dispatch(sendNewMessage(chatId, uuidv4(), AUTHORS.AUTHOR_BOT, 'Message from Bot')), 1500);
    }
};