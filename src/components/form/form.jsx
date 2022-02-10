import { Button, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import './form.scss';

const Form = ({ sendMessage, chatId }) => {

  const [newMessageText, setNewMessageText] = useState('');

  const messageInput = useRef(null);

  useEffect(() => { messageInput.current.focus() }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    //console.log(AUTHORS.AUTHOR_ME, newMessageText, chatId);
    sendMessage(AUTHORS.AUTHOR_ME, newMessageText, chatId);
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