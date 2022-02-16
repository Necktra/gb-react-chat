import { Box, List, ListItem, ListItemText } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import './chatList.scss';
import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatList } from './../../store/chats/selector';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from "react-redux";
import { addNewChat, deleteChat } from "../../store/chats/actions";

const ChatList = ({ currentTheme }) => {

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

    const chatListRender = chatList.map((el) => {
        return (
            <ListItem disablePadding key={el.id}>
                <NavLink to={`/chats/${el.id}`} style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}><ListItemText primary={el.name} /></NavLink>
                <Button size='small' style={{ width: '20px', height: '20px' }} onClick={() => deleteChatHandler(el.id)}>x</Button>
            </ListItem>)
    });

    return (
        <div className='chat-list-wrapper'>
            <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {chatListRender}
                        <Button style={{ width: '130px', height: '30px' }} onClick={addChat}>Add new chat</Button>
                    </List>
                </nav>
            </Box>
            <Outlet />
        </div>
    )
}

export default ChatList;