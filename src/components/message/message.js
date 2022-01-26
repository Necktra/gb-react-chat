import './message.scss';

const Message = ({messageText}) => {
    return (
        <div className='message'>
            <p className='message-text'>{messageText}</p>
        </div>
    )
}

export default Message;