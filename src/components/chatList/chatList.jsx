import { Box, List, ListItem, ListItemText } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import './chatList.scss';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ChatList = ({ currentTheme }) => {

    const [chatList, setChatList] = useState([
        {
            id: '1',
            name: 'User 1'
        },
        {
            id: '2',
            name: 'User 2'
        },
        {
            id: '3',
            name: 'User 3'
        },
        {
            id: '4',
            name: 'User 4'
        },
        {
            id: '5',
            name: 'User 5'
        },
    ]);

    const chatId = useParams().chatId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!chatList.find(el => el.id == chatId)) {
            return navigate("/chats");
        }
    }, [chatId, chatList]);

    const deleteChat = (id) => {
        setChatList((chatList) => [...chatList.filter(el => el.id !== id)]);
    };

    const addChat = () => {
        setChatList((chatList) => [...chatList, { id: uuidv4(), name: 'New user' }]);
    };

    const chatListRender = chatList.map((el) => {
        return (
            <ListItem disablePadding key={el.id}>
                <NavLink to={`/chats/${el.id}`} style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}><ListItemText primary={el.name} /></NavLink>
                <Button size='small' style={{ width: '20px', height: '20px' }} onClick={() => deleteChat(el.id)}>x</Button>
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