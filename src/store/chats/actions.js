export const ADD_NEW_CHAT = 'CHATS::ADD_NEW_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';

export const addNewChat = (id, name) => ({
    type: ADD_NEW_CHAT,
    payload: {
        id,
        name,
    }
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: {
        id,
    }
});