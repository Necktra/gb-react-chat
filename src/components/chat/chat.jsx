import './chat.scss';
import { useEffect, useMemo } from 'react';
import { AUTHORS } from '../../utils/constants';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMessagesById } from './../../store/messages/selector';
import { useDispatch } from 'react-redux';
import { sendNewMessage } from '../../store/messages/actions';

const Chat = () => {

    const chatId = useParams().chatId;
    const dispatch = useDispatch();
    const getMessagesList = useMemo(() => getMessagesById(chatId), [chatId]);
    const messageList = useSelector(getMessagesList);

    const sendMessage = (author, text, chat) => {
        dispatch(sendNewMessage(chat, uuidv4(), author, text));
    };

    useEffect(() => {
        if (messageList?.[messageList.length - 1]?.author === AUTHORS.AUTHOR_ME) {
            const botAnswerInterval = setTimeout(() => sendMessage(AUTHORS.AUTHOR_BOT, 'Message from Bot', chatId), 1500);
            return () => clearTimeout(botAnswerInterval);
        }
    }, [messageList]);

    return (
        <div className='chat-messages-wrapper'>
            {messageList && <MessageList messageList={messageList} />}
            <Form sendMessage={sendMessage} chatId={chatId} />
        </div>
    );
}

export default Chat;
