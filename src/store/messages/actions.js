export const SEND_NEW_MESSAGE = 'MESSAGES::SEND_NEW_MESSAGE';

export const sendNewMessage = (chatId, messageId, author, text) => ({
    type: SEND_NEW_MESSAGE,
    payload: {
        chatId,
        messageId,
        author,
        text,
    }
})