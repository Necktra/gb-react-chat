import './chatList.scss';
import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatList } from './../../store/chats/selector';
import { useSelector, useDispatch } from 'react-redux';
import ChatList from "./chatList";
import { initChatsTracking } from './../../store/chats/actions';
import { set, get } from 'firebase/database';
import { getChatsRefById, getProfileChatsRef } from '../../services/firebase';
import { getMessagesRefByChatId, profileRef, auth, getChatsInProfileRef } from './../../services/firebase';
import { remove } from '@firebase/database';
import { CircularProgress } from '@mui/material';

const ChatListContainer = ({ currentTheme }) => {

    const chatList = useSelector(getChatList);

    const [currentUserChatList, setCurrentUserChatList] = useState(chatList);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        get(getChatsInProfileRef(auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setCurrentUserChatList(chatList.filter((el) => snapshot.val()[el.id]));
                setShowLoader(false);
            } else {
                setCurrentUserChatList([]);
                setShowLoader(false);
                console.log("No data available");
            }
        })
    }, [chatList]);

    const dispatch = useDispatch();
    const chatId = useParams().chatId;
    const navigate = useNavigate();

    const [newChatUser, setNewChatUser] = useState("");
    const [newChatUserId, setNewChatUserId] = useState("");
    const [usersData, setUsersData] = useState("");

    const setNewChatUserHandler = (selectedUserName) => {
        setNewChatUser(selectedUserName);
    };

    useEffect(() => {
        get(profileRef).then((snapshot) => {
            if (snapshot.exists()) {
                setUsersData(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
    }, []);

    useEffect(() => {
        if (!currentUserChatList.find(el => el.id == chatId)) {
            return navigate("/chats");
        }
    }, [chatId, currentUserChatList]);

    useEffect(() => {
        dispatch(initChatsTracking());
    }, []);

    const deleteChatHandler = useCallback((id) => {
        remove(getChatsRefById(id));
        remove(getMessagesRefByChatId(id));
    }, [dispatch]);

    const addChat = () => {
        const newId = `chat-${Date.now()}`;
        set(getMessagesRefByChatId(newId), { empty: true });
        set(getChatsRefById(newId), { 'id': newId, 'name': newChatUser.name });
        set(getProfileChatsRef(auth.currentUser.uid, newId), newId);
        set(getProfileChatsRef(newChatUserId, newId), newId);
        setNewChatUser("");
    };

    return (showLoader ? <CircularProgress /> :
        <ChatList setNewChatUserId={setNewChatUserId} usersData={usersData} newChatUser={newChatUser} setNewChatUserHandler={setNewChatUserHandler} chatList={currentUserChatList} chatId={chatId} currentTheme={currentTheme} deleteChatHandler={deleteChatHandler} addChat={addChat} />
    )
}

export default ChatListContainer;