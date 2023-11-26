import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import { Button, Grid } from "@mui/material";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';


const PayButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 700,
    padding: '6px 24px',
    borderRadius: '8px',
    color: 'white',
    backgroundColor: '#016A70',
    '&:hover': {
        backgroundColor: '#02474b',
        boxShadow: 'none',
    },
    '&:disabled': {
        backgroundColor: 'white',
        boxShadow: 'none',
    }
});

const CheckoutForm = ({ price, name }) => {


    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axios = useAxios();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    useEffect(() => {
        if (price > 0) {
            axios.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecrete);
                    setClientSecret(res.data.clientSecrete);
                })
        }
    }, [axios, price]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('error', [error]);
            setError(error.message);
        } else {
            console.log('payment', [paymentMethod]);
            setError('');
        }

        const { paymentIntent, err } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous"
                }
            }
        })

        if (err) {
            console.log(err)
        } else {
            console.log(paymentIntent)
            if (paymentIntent.status === "succeeded") {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);


                const payment = {
                    email: user.email,
                    name: user.displayName,
                    transactionId: paymentIntent.id,
                    price: price,
                    date: new Date(),
                    subscriptionName: name,
                    status: 'pending'
                }
                const res = await axios.post('/payments', payment)
                console.log(res.data)
                if (res?.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thank you for this payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')
                }

            }
        }
    }

    console.log(price, name)

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className="err-msg">{error}</p>
            {
                transactionId && <p className="transactionId">Your transaction id: {transactionId}</p>
            }
            <Grid sx={{ textAlign: 'center' }}>
                <PayButton type="submit"
                    disabled={!stripe || !clientSecret}
                    className="mt-16 text-xl font-bold font-inter py-5 px-40 text-white bg-[#570DF8] rounded-lg">
                    Pay
                </PayButton>
            </Grid>
        </form>
    );
};

CheckoutForm.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string
}

export default CheckoutForm;