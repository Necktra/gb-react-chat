import { Box, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import './chatList.scss';
import { Button } from '@mui/material';

const ChatList = ({ setNewChatUserId, usersData, newChatUser, setNewChatUserHandler, currentTheme, chatList, chatId, deleteChatHandler, addChat }) => {

    const chatListRender = chatList.map((el) => {
        return (
            <ListItem disablePadding key={el.id}>
                <NavLink to={`/chats/${el.id}`} style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}><ListItemText primary={el.name} /></NavLink>
                <Button size='small' style={{ width: '20px', height: '20px' }} onClick={() => deleteChatHandler(el.id)}>x</Button>
            </ListItem>)
    });

    const usersDataListRender = usersData && Object.keys(usersData).map((el) => {
        return (
            <MenuItem onClick={(e) => {
                setNewChatUserId(e.currentTarget.dataset.myValue);
            }} data-my-value={el} value={usersData[el]} key={el}>{usersData[el].name}</MenuItem>
        )
    });

    return (
        <div className='chat-list-wrapper'>
            <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {chatList && chatListRender}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select user</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newChatUser}
                                label="Select user"
                                onChange={e => setNewChatUserHandler(e.target.value)}>
                                {usersData && usersDataListRender}
                            </Select>
                        </FormControl>
                        <Button style={{ width: '130px', height: '30px' }} onClick={addChat}>Add new chat</Button>
                    </List>
                </nav>
            </Box>
            <Outlet />
        </div>
    )
}

export default ChatList;