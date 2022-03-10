import './home.scss';
import { useState, useEffect } from 'react';
import { TextField, Button, Container, CssBaseline, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import { signUp } from '../../services/firebase';
import { login } from './../../services/firebase';
import { Box } from '@mui/material';
import { changeNameThunk } from './../../store/profile/actions';
import { useDispatch } from 'react-redux';

const Home = ({ isSignUp }) => {


    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setError("");
    }, [isSignUp])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePass = (e) => {
        setPass(e.target.value);
    };

    const handleSignUp = async () => {
        try {
            await signUp(email, pass);
            dispatch(changeNameThunk(email));
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSignIn = async () => {
        try {
            await login(email, pass);
        } catch (e) {
            setError(e.message);
        }
    };

    const onHandleSubmit = (e) => {
        setError("");
        e.preventDefault();
        setPass("");
        setEmail("");
        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {isSignUp ? "SignUp" : "Login"}
                </Typography>
                <Box component="form" onSubmit={onHandleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pass}
                        onChange={handleChangePass}
                    />
                    <NavLink to={isSignUp ? "/" : "/signup"}>
                        {!isSignUp ? "SignUp" : "Login"}
                    </NavLink>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        {isSignUp ? "Sign In" : "Login"}
                    </Button>
                    {error && <span className="home-page__error">{error}</span>}
                </Box>
            </Box>
        </Container>
    );
}

export default Home;