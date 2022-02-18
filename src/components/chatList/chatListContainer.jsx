import './chatList.scss';
import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatList } from './../../store/chats/selector';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from "react-redux";
import { addNewChat, deleteChat } from "../../store/chats/actions";
import ChatList from "./chatList";

const ChatListContainer = ({ currentTheme }) => {

    const chatList = useSelector(getChatList, shallowEqual);
    const dispatch = useDispatch();

    const chatId = useParams().chatId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!chatList.find(el => el.id == chatId)) {
            return navigate("/chats");
        }
    }, [chatId, chatList]);

    const deleteChatHandler = useCallback((id) => {
        dispatch(deleteChat(id));
    }, [dispatch]);

    const addChat = useCallback(() => {
        dispatch(addNewChat(uuidv4(), 'New user'));
    }, [dispatch]);

    return (
        <ChatList chatList={chatList} chatId={chatId} currentTheme={currentTheme} deleteChatHandler={deleteChatHandler} addChat={addChat}/>
    )
}

export default ChatListContainer;