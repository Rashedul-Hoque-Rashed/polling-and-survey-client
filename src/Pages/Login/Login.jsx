import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Chip, Divider } from "@mui/material";
import styled from "@emotion/styled";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) ~ :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const Login = () => {

    const { login, googleLogin } = useContext(AuthContext);
    const axios = useAxiosPublic();
    const locationRendering = useLocation();
    const Navigate = useNavigate();

    const handelLogin = (e) => {
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;

        login(email, password)
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 2500
                })
                Navigate(locationRendering?.state ? locationRendering.state : "/");
                location.reload();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 2500
                })
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    role: 'user'
                }
                axios.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                Navigate("/");
                location.reload();
            })
    }

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ mt: 12, mb: 16 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handelLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid item sx={{ mb: 3 }}>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Box>
                    <Root>
                        <Divider>
                            <Chip label="OR" />
                        </Divider>
                    </Root>
                    <Button
                        onClick={handleGoogleLogin}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<GoogleIcon />}
                    >
                        Sign In With Google
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
