import { Box, List, ListItem, ListItemText } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import './chatList.scss';
import { Button } from '@mui/material';

const ChatList = ({ currentTheme, chatList, chatId, deleteChatHandler, addChat }) => {

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