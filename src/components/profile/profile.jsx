import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowName } from './../../store/profile/actions';
import { getShowName, getUserName } from './../../store/profile/selector';

const Profile = ( props ) => {
    const name = useSelector(getUserName);
    const showName = useSelector(getShowName);

    const dispatch = useDispatch();

    return (
        <div>
        <h2>Profile</h2>
        <label><Checkbox size="small" label="Label" checked={showName} onChange={()=> dispatch(toggleShowName)}/>Show user name</label>
        { showName && <h4>User name: {name}</h4>}
        </div>
    )
}

export default Profile;