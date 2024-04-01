import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import{
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Or8eeFNE1ftX3iybD48XHiA60Al0kQ2nhcdVEyLcUJLsqUMtULUtqtdwoEIsxQrWZ7ZLK9bLRi9Ap1c9Y8RW1Fi00UbWI4Kk5', {});

const App = ({fetchClientSecret}) => {
    const options = {fetchClientSecret};

    return(
        <EmbeddedCheckoutProvider 
            stripe = {stripePromise}
            options = {options}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    )
}

