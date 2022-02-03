import './message.scss';

const Message = ({messageText, author}) => {
    return (
        <div className='message'>
            <p className={'message-author ' + (author === 'Bot' ? 'message-author__bot' : 'message-author__user')}>{author}</p>
            <p className={'message-text ' + (author === 'Bot' ? 'message-text__bot' : 'message-text__user')}>{messageText}</p>
        </div>
    )
}

export default Message;