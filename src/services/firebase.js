import {
    initializeApp
} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    getDatabase,
    ref
} from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyBYUvzUfgwGbigXvUrSed1OeGOnzKH60oY",
    authDomain: "gb-react-db.firebaseapp.com",
    databaseURL: "https://gb-react-db-default-rtdb.firebaseio.com",
    projectId: "gb-react-db",
    storageBucket: "gb-react-db.appspot.com",
    messagingSenderId: "365092414286",
    appId: "1:365092414286:web:25204afa25a5016e32f41f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    signOut(auth);
};

export const db = getDatabase(app);

export const profileRef = ref(db, "profile");
export const getProfileNameRef = (userId) => ref(db, `profile/${userId}/name`);
export const chatsRef = ref(db, "chats");
export const getChatsRefById = (chatId) => ref(db, `chats/${chatId}`);
export const messagesRef = ref(db, "messages");
export const getMessageListRefByChatId = (chatId) =>
    ref(db, `messages/${chatId}/messageList`);
export const getMessagesRefByChatId = (chatId) => ref(db, `messages/${chatId}`);
export const getMessageRefById = (chatId, msgId) =>
    ref(db, `messages/${chatId}/messageList/${msgId}`);
export const getProfileChatsRef = (userId, chatId) => ref(db, `profile/${userId}/chats/${chatId}`);
export const getChatsInProfileRef = (userId) => ref(db, `profile/${userId}/chats`);