import './message.scss';

const Message = ({ messageText, author, name, userUid }) => {
    return (
        <div className={'message ' + (author !== userUid ? 'message-author__bot_aft' : 'message-author__user_bfr')}>
        <p className={'message-author ' + (author !== userUid ? 'message-author__bot' : 'message-author__user')}>{name}</p>
        <p className={'message-text ' + (author !== userUid ? 'message-text__bot' : 'message-text__user')}>{messageText}</p>
    </div>
    )
}

export default Message;