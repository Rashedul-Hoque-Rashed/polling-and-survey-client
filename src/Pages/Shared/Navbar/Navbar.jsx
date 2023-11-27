import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { Button, Container, Grid, Link } from '@mui/material';
import logo from '../../../assets/logo.svg'
import styled from '@emotion/styled';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useContext } from 'react';
import Swal from 'sweetalert2';



const drawerWidth = 240;

const LoginButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
    padding: '8px 16px',
    marginLeft: '8px',
    borderRadius: '8px',
    backgroundColor: '#016A70',
    '&:hover': {
        backgroundColor: '#02474b',
        boxShadow: 'none',
    }
});


const navItems = <div id='link'>
    <NavLink
        to="/"
    >
        Home
    </NavLink>
    <NavLink
        to="/survey"
    >
        Survey
    </NavLink>
    <NavLink
        to="/proUser"
    >
        Pro-User
    </NavLink>
    <NavLink
        to="/dashboard/manageUsers"
    >
        Dashboard
    </NavLink>
</div>


const Navbar = (props) => {
    const { user, logOut } = useContext(AuthContext);
    const Navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Log out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                Navigate("/");
            })
            .catch(err => console.error(err.message))

    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>
                    <img src={logo} alt="" style={{ width: '40px', height: '40px' }} />
                </Typography>
                <Typography
                    fontSize={20}
                    sx={{ fontWeight: 700, ml: 1 }}>
                    SURVEY
                </Typography>
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary={navItems} sx={{ textAlign: 'center' }} />
                </ListItem>
            </List>
            <Grid sx={{ textAlign: 'center' }}>
                {
                    user ? <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img src={user.photoURL} alt="" className="profile-img" />
                        <LoginButton onClick={handleLogOut} variant="contained">
                            Log Out
                        </LoginButton>
                    </Grid> :
                        <Link underline="none" href='/login'>
                            <LoginButton variant="contained">
                                Login
                            </LoginButton>
                        </Link>
                }
            </Grid>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', mb: -4 }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: 'white', py: '8px' }} component="nav">
                <Container maxWidth='xl'>
                    <Toolbar>
                        <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            color={'black'}
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
                        >
                            <Typography>
                                <img src={logo} alt="" style={{ width: '48px', height: '48px' }} />
                            </Typography>
                            <Typography
                                fontSize={24}
                                sx={{ fontWeight: 700, ml: 1 }}>
                                SURVEY
                            </Typography>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            {navItems}
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {
                                user ? <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <LoginButton onClick={handleLogOut} variant="contained">
                                        Log Out
                                    </LoginButton>
                                    <img src={user.photoURL} alt="" className="profile-img" />
                                </Grid> :
                                    <Link underline="none" href='/login'>
                                        <LoginButton variant="contained">
                                            Login
                                        </LoginButton>
                                    </Link>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;