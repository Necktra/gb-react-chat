import './chat.scss';
import { useMemo } from 'react';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMessagesById } from './../../store/messages/selector';
import { useDispatch } from 'react-redux';
import { sendNewMessageThunk } from '../../store/messages/actions';

const Chat = () => {

    const chatId = useParams().chatId;
    const dispatch = useDispatch();
    const getMessagesList = useMemo(() => getMessagesById(chatId), [chatId]);
    const messageList = useSelector(getMessagesList);

    const sendMessage = (author, text, chat) => {
        dispatch(sendNewMessageThunk(chat, uuidv4(), author, text));
    };

    return (
        <div className='chat-messages-wrapper'>
            {messageList && <MessageList messageList={messageList} />}
            <Form sendMessage={sendMessage} chatId={chatId} />
        </div>
    );
}

export default Chat;
