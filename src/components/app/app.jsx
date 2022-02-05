import './app.scss';
import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import ChatList from '../chatList/chatList';

import { createTheme, Button } from '@mui/material';
import { green, grey, purple } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';

function App() {

  const [messageList, setMessageList] = useState([]);

  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = createTheme({
    palette: {
      currentTheme,
      ...(currentTheme === 'dark'
        ? {
            primary: green,
            divider: green[200],
            text: {
              secondary: grey[800],
            },
            
          }
        : {
            primary: purple,
            divider: purple[700],
            background: {
              default: purple[900],
              paper: purple[900],
            },
            text: {
              secondary: grey[500],
            },
          }),
    },
  });

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === AUTHORS.AUTHOR_ME) {
      const botAnswerInterval = setTimeout(() => sendMessage(AUTHORS.AUTHOR_BOT, 'Message from Bot'), 1500);
      return () => clearTimeout(botAnswerInterval);
    }
  }, [messageList]);

  const sendMessage = (author, text) => {
    setMessageList(messageList => [...messageList, { id: uuidv4(), author: author, text: text }]);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className='app'>
      <ChatList />
      <div className='app-messages-wrapper'>
        <MessageList messageList={messageList} />
        <Form sendMessage={sendMessage} />
      </div>
      <Button style={{width: '60px', height: '60px'}} className='app-change-theme' variant='outlined' size='small' onClick={()=>setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}>Change theme</Button>
    </div>
    </ThemeProvider>
  );
}

export default App;
