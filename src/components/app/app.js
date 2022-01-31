import './app.scss';
import Message from '../message/message';
import { useEffect, useState } from 'react';

function App() {

  const [messageList, setMessageList] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    if (messageList.length > 0 && messageList[messageList.length - 1].author === "Me") {
      const botAnswerInterval = setTimeout(() => setMessageList(messageList => [...messageList, { author: 'Bot', text: 'Message from Bot' }]), 1500);
      return () => clearTimeout(botAnswerInterval);
    }
  }, [messageList]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessageList([...messageList, { author: 'Me', text: newMessageText }]);
    setNewMessageText("");
  };

  const messageListRender = messageList.map(el => <Message key={el.author + Math.random()} messageText={el.text} author={el.author} />);

  return (
    <div className='app'>
      {messageListRender}
      <form className="app-form" onSubmit={onHandleSubmit}>
        <input className="app-message" value={newMessageText} onChange={e => setNewMessageText(e.target.value)}></input>
        <button className="app-button">Send</button>
      </form>
    </div>
  );
}

export default App;
