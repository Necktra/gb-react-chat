import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import chatsReducer from './chats/reducer';
import messagesReducer from './messages/reducer';
import profileReducer from './profile/reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import singlesReducer from './singles/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
    singles: singlesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);