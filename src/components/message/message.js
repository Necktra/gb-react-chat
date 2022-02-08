import './message.scss';
import { AUTHORS } from './../../utils/constants';

const Message = ({messageText, author}) => {
    return (
        <div className={'message ' + (author === AUTHORS.AUTHORS_BOT ? 'message-author__bot_aft' : 'message-author__user_bfr')}>
            <p className={'message-author ' + (author === AUTHORS.AUTHORS_BOT ? 'message-author__bot' : 'message-author__user')}>{author}</p>
            <p className={'message-text ' + (author === AUTHORS.AUTHORS_BOT ? 'message-text__bot' : 'message-text__user')}>{messageText}</p>
        </div>
    )
}

export default Message;