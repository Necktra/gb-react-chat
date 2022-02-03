import Message from './../message/message';

const MessageList = ({ messageList }) => {
    return messageList.map(el => <Message key={el.author + Math.random()} messageText={el.text} author={el.author} />)
}

export default MessageList;