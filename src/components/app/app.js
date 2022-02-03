import './app.scss';
import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import MessageList from '../messegeList/messageList';
import Form from './../form/form';

function App() {

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === AUTHORS.AUTHOR_ME) {
      const botAnswerInterval = setTimeout(() => sendMessage(AUTHORS.AUTHOR_BOT, 'Message from Bot'), 1500);
      return () => clearTimeout(botAnswerInterval);
    }
  }, [messageList]);

  const sendMessage = (author, text) => {
    setMessageList(messageList => [...messageList, { author: author, text: text }]);
  };

  return (
    <div className='app'>
      <MessageList messageList={messageList} />
      <Form sendMessage={sendMessage} />
    </div>
  );
}

export default App;
