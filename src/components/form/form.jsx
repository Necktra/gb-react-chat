import { useState } from 'react';
import { AUTHORS } from '../../utils/constants';


const Form = ({ sendMessage }) => {

  const [newMessageText, setNewMessageText] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();
    sendMessage(AUTHORS.AUTHOR_ME, newMessageText);
    setNewMessageText("");
  };

  return (
    <form className="app-form" onSubmit={onHandleSubmit}>
      <input className="app-message" value={newMessageText} onChange={e => setNewMessageText(e.target.value)}></input>
      <button className="app-button">Send</button>
    </form>
  )
}

export default Form;