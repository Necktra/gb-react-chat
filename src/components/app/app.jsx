import './app.scss';
import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import ChatList from '../chatList/chatList';

import { Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../../themes/themes';
import { darkTheme } from './../../themes/themes';

function App() {

  const [messageList, setMessageList] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);


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
    <ThemeProvider theme={currentTheme}>
      <div className='app'>
        <ChatList />
        <div className='app-messages-wrapper'>
          <MessageList messageList={messageList} />
          <Form sendMessage={sendMessage} />
        </div>
        <Button style={{ width: '60px', height: '60px' }} className='app-change-theme' variant='outlined' size='small' onClick={() => setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme)}>Change theme</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
