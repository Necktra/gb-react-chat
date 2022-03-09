import './message.scss';
import { auth } from '../../services/firebase';

const Message = ({ messageText, author, name }) => {
    return (
        <div className={'message ' + (author !== auth.currentUser.uid ? 'message-author__bot_aft' : 'message-author__user_bfr')}>
            <p className={'message-author ' + (author !== auth.currentUser.uid ? 'message-author__bot' : 'message-author__user')}>{name}</p>
            <p className={'message-text ' + (author !== auth.currentUser.uid ? 'message-text__bot' : 'message-text__user')}>{messageText}</p>
        </div>
    )
}

export default Message;