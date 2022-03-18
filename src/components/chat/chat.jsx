import './chat.scss';
import { useMemo, useEffect } from 'react';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMessagesById } from './../../store/messages/selector';
import { useDispatch } from 'react-redux';
import { initMessageTracking } from '../../store/messages/actions';
import { auth, getMessageRefById } from './../../services/firebase';
import { set } from 'firebase/database';

const Chat = () => {

    const chatId = useParams().chatId;
    const dispatch = useDispatch();
    const getMessagesList = useMemo(() => getMessagesById(chatId), [chatId]);
    const messageList = useSelector(getMessagesList);
    const userUid = auth.currentUser.uid;

    const sendMessage = (author, name, text) => {
        const messageId = uuidv4();
        set(getMessageRefById(chatId, messageId), {
            messageId,
            name,
            author,
            text,
          });
    };

    useEffect(() => {
        dispatch(initMessageTracking(chatId));
    }, [chatId]);

    return (
        <div className='chat-messages-wrapper'>
            {messageList && <MessageList messageList={messageList} />}
            <Form userUid={userUid} sendMessage={sendMessage} chatId={chatId} />
        </div>
    );
}

export default Chat;
