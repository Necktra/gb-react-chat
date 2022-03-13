import { Button, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import './form.scss';
import { getProfileNameRef } from './../../services/firebase';
import { get } from 'firebase/database';

const Form = ({ sendMessage, chatId, userUid }) => {

  const [newMessageText, setNewMessageText] = useState('');
  const messageInput = useRef(null);
  const [name, setName] = useState("");

  useEffect(() => {
    get(getProfileNameRef(userUid)).then((snapshot) => {
      setName(snapshot.val());
    });
  }, []);

  useEffect(() => { messageInput.current.focus() }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    sendMessage(userUid, name, newMessageText, chatId);
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