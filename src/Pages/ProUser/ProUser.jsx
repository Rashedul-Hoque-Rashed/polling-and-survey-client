import { Box, Button, Card, CardActions, CardContent, Container, Grid, Modal, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from "@emotion/styled";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const BuyButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
    padding: '12px 24px',
    borderRadius: '8px',
    backgroundColor: '#016A70',
    '&:hover': {
        backgroundColor: '#02474b',
        boxShadow: 'none',
    }
});

const ProUser = () => {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');


    const subscription = [
        {
            "id": 1,
            "name": "Monthly Subscription",
            "duration": "1 month",
            "price": 9.99,
            "features": [
                "Access to premium content",
                "Ad-free experience",
                "Priority customer support"
            ]
        },
        {
            "id": 2,
            "name": "6-Month Subscription",
            "duration": "6 months",
            "price": 49.99,
            "features": [
                "All features from Monthly Subscription",
                "15% discount compared to monthly",
                "Exclusive early access to new features"
            ]
        },
        {
            "id": 3,
            "name": "Annual Subscription",
            "duration": "1 year",
            "price": 99.99,
            "features": [
                "All features from Monthly Subscription",
                "25% discount compared to monthly",
                "Priority beta access to upcoming features"
            ]
        }
    ];

    
    const handleOpen = (subscriptionPrice, subscriptionName) => {
        setOpen(true)
        setPrice(subscriptionPrice);
        setName(subscriptionName)
    };

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    return (
        <Container maxWidth='xl' sx={{ py: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                Choose your subscription
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                Unlock premium features with our pro plan
            </Typography>
            <Grid container spacing={6} sx={{ py: 5 }}>
                {
                    subscription.map(item => <Grid key={item.id} item xs={12} sm={6} lg={4}>
                        <Card sx={{ minWidth: 275, cursor: 'pointer' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.name}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'baseline' }}>
                                    ${item.price}
                                    <Typography sx={{ fontSize: 14, fontWeight: 600 }} gutterBottom>
                                        /{item.duration}
                                    </Typography>
                                </Typography>

                                <Typography color="text.primary" variant="body2" sx={{ minHeight: 80, mt: 3, mb: 5, fontSize: '14px', fontWeight: 600 }}>
                                    {
                                        item.features.map((feature, index) => <Grid key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            {<CheckCircleIcon />} {feature}
                                        </Grid>)
                                    }
                                </Typography>
                                <Grid sx={{ textAlign: 'center' }}>
                                    <BuyButton onClick={() => handleOpen(item.price, item.name)} variant="contained">Buy now</BuyButton>
                                </Grid>
                            </CardContent>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm price={price} name={name} />
                                    </Elements>
                                </Box>
                            </Modal>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>)
                }

            </Grid>
        </Container>
    );
};

export default ProUser;