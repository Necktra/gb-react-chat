import './app.scss';
import Message from '../message/message';

function App() {

  const messageText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolorem similique.';

  return (
    <div className='app'>
      <Message messageText={messageText}/>
    </div>
  );
}

export default App;
