import './router.scss';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../../themes/themes';
import Chat from '../chat/chat';
import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { darkTheme } from './../../themes/themes';
import Profile from './../profile/profile';
import ChatListContainer from '../chatList/chatListContainer';
import SinglesContainer from './../singles/singlesContainer';
import Home from '../home/home';
import { PublicRoute } from './../publicRoute/publicRoute';
import { auth } from './../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { PrivateRoute } from './../privateRoute/privateRoute';

const Router = () => {

    const [currentTheme, setCurrentTheme] = useState(lightTheme);
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });

        return unsubscribe;
    }, []);

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

                        <NavLink to="/singles" style={({ isActive }) => ({ color: isActive ? currentTheme.palette.primary.main : "black" })}>
                            Singles
                        </NavLink>

                        <Button style={{ width: '60px', height: '60px' }} className='chat-change-theme' variant='outlined' size='small' onClick={() => setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme)}>Change theme</Button>
                    </nav>


                    <Routes>
                        <Route path="/" element={<PublicRoute authed={authed} />}>
                            <Route path="" element={<Home />} />
                            <Route path="/signup" element={<Home isSignUp />} />
                        </Route>
                        <Route path="/chats" element={<ChatListContainer currentTheme={currentTheme} />} >
                            <Route path=":chatId" element={<Chat />} />
                        </Route>
                        <Route path="/profile" element={<PrivateRoute authed={authed} />}>
                            <Route
                                path=""
                                element={<Profile/>}
                            />
                        </Route>
                        <Route path="/singles" element={<SinglesContainer />} />
                        <Route path="*" element={<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>} />
                    </Routes>

                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router;
