import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PollIcon from '@mui/icons-material/Poll';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import BallotIcon from '@mui/icons-material/Ballot';


export const mainListItems = (
    <React.Fragment>
        <Link to='/dashboard/manageUsers' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/surveyStatus' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PollIcon />
                </ListItemIcon>
                <ListItemText primary="Survey Status" />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/allPayments' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="All Payments" />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/surveyResponse' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Survey Response" />
            </ListItemButton>
        </Link>
        
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <Link to='/' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
        </Link>
        <Link to='/survey' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PollIcon />
                </ListItemIcon>
                <ListItemText primary="Survey" />
            </ListItemButton>
        </Link>
        <Link to='/proUser' style={{ textDecoration: 'none', color: '#151515' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Pro-User" />
            </ListItemButton>
        </Link>

    </React.Fragment>
);