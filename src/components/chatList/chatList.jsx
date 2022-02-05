import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ChatList = (props) => {

    const chatList = [
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
    ];

    const chatListRender = chatList.map((el) => {
        return (
        <ListItem disablePadding>
            <ListItemButton component="a" href={`#${el.id}`}>
                <ListItemText primary={el.name} />
            </ListItemButton>
        </ListItem>)
    });

    return (

        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {chatListRender}
                </List>
            </nav>
        </Box>

    )
}

export default ChatList;