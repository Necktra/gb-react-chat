import { Button, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import './form.scss';
import { auth, getProfileNameRef } from './../../services/firebase';
import { get } from 'firebase/database';

const Form = ({ sendMessage, chatId }) => {

  const [newMessageText, setNewMessageText] = useState('');
  const messageInput = useRef(null);
  const [name, setName] = useState("");

  useEffect(() => {
    get(getProfileNameRef(auth.currentUser.uid)).then((snapshot) => {
      setName(snapshot.val());
    });
  }, []);

  useEffect(() => { messageInput.current.focus() }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    sendMessage(auth.currentUser.uid, name, newMessageText, chatId);
    setNewMessageText("");
  };

  return (
    <form className="form-wrapper" onSubmit={onHandleSubmit}>
      <TextField
        fullWidth
        inputRef={messageInput}
        value={newMessageText}
        onChange={e => setNewMessageText(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Send
      </Button>
    </form>
  )
}

export default Form;