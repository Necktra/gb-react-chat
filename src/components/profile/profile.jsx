import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfileNameRef, logout } from "../../services/firebase";
import { changeNameThunk, toggleShowName } from './../../store/profile/actions';
import { getShowName } from './../../store/profile/selector';
import { Button, TextField } from '@mui/material';
import { auth } from './../../services/firebase';
import { useState, useEffect } from 'react';
import { get } from 'firebase/database';

const Profile = () => {

    const [name, setName] = useState("");
    useEffect(() => {
        get(getProfileNameRef(auth.currentUser.uid)).then((snapshot) => {
            setName(snapshot.val());
        })
    }, []);

    const showName = useSelector(getShowName);
    const dispatch = useDispatch();
    const [newName, setNewName] = useState();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.log(e);
        }
    };

    const saveNewName = () => {
        setNewName("");
        setName(newName);
        dispatch(changeNameThunk(newName));
    };

    return (
        <div>
            <h2>Profile</h2>
            <label><Checkbox size="small" label="Label" checked={showName} onChange={() => dispatch(toggleShowName)} />Edit user name</label>
            {showName && <h4>User name: {name}</h4>}
            {showName && <>     <TextField
                value={newName}
                onChange={e => setNewName(e.target.value)}
            />
                <br />
                <Button variant="contained" type="submit" onClick={saveNewName}>
                    Save
                </Button></>}
            <p>Email: {auth.currentUser.email}</p>
            <Button onClick={handleLogout} variant="contained" type="submit">
                Logout
            </Button>
        </div>
    )
}

export default Profile;