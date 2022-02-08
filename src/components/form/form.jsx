import { Button, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';


const Form = ({ sendMessage }) => {

  const [newMessageText, setNewMessageText] = useState('');

  const messageInput = useRef(null);

  useEffect(() => { messageInput.current.focus() }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    sendMessage(AUTHORS.AUTHOR_ME, newMessageText);
    setNewMessageText("");
  };

  return (

    <form className="app-form" onSubmit={onHandleSubmit}>

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