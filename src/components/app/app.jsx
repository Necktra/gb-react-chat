import { Provider } from 'react-redux';
import Router from './../router/router';
import { store } from './../../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../../store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;