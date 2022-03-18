import { auth } from '../../services/firebase';
import Message from './../message/message';

const MessageList = ({ messageList }) => {

    const currentUserUid = auth.currentUser.uid;
    
    return messageList.map(el => <Message userUid={currentUserUid} key={el.id} messageText={el.text} author={el.author} name={el.name}/>)
}

export default MessageList;