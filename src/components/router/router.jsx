import './router.scss';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../../themes/themes';
import Chat from '../chat/chat';
import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { darkTheme } from './../../themes/themes';
import Profile from './../profile/profile';
import ChatListContainer from '../chatList/chatListContainer';

const Router = () => {

    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    return (
        <ThemeProvider theme={currentTheme}>
            <BrowserRouter>

                <div className='app'>
                    <nav className='nav'>
                    <NavLink to="/" style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}>
                            Home
                        </NavLink>

                        <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}>
                            Profile
                        </NavLink>

                        <NavLink to="/chats" style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}>
                            Chats
                        </NavLink>

                        <Button style={{ width: '60px', height: '60px' }} className='chat-change-theme' variant='outlined' size='small' onClick={() => setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme)}>Change theme</Button>
                    </nav>


                    <Routes>
                        <Route path="/" element={<div>Home</div>} />
                        <Route path="/chats" element={<ChatListContainer currentTheme={currentTheme}/>} >
                            <Route path=":chatId" element={<Chat />} />
                        </Route>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>} />
                    </Routes>


                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
