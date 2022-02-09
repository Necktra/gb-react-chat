import './chat.scss';
import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import MessageList from '../messegeList/messageList';
import Form from '../form/form';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const Chat = () => {

    const chatId = useParams().chatId;
    const [messageList, setMessageList] = useState({});

    const sendMessage = (author, text, chat) => {
        setMessageList(messageList => {
            if (messageList[chat]) {
                return { ...messageList, [chat]: [...messageList[chat], { id: uuidv4(), author: author, text: text }] }
            } else {
                setMessageList(messageList => ({ ...messageList, [chat]: [{ id: uuidv4(), author: author, text: text }] }));
            }
        });
    };

    useEffect(() => {
        if (messageList?.[chatId]?.[messageList[chatId].length - 1]?.author === AUTHORS.AUTHOR_ME) {
            const botAnswerInterval = setTimeout(() => sendMessage(AUTHORS.AUTHOR_BOT, 'Message from Bot', chatId), 1500);
            return () => clearTimeout(botAnswerInterval);
        }
    }, [messageList]);

    return (
        <div className='chat-messages-wrapper'>
            {messageList[chatId] && <MessageList messageList={messageList[chatId]} />}
            <Form sendMessage={sendMessage} chatId={chatId} />
        </div>
    );
}

export default Chat;
