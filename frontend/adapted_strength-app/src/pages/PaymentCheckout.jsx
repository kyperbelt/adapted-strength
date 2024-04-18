import * as React from "react";
import { HttpStatus, ApiUtils, AUTH_TOKEN_NAME } from "../api/ApiUtils";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Or8eeFNE1ftX3iybD48XHiA60Al0kQ2nhcdVEyLcUJLsqUMtULUtqtdwoEIsxQrWZ7ZLK9bLRi9Ap1c9Y8RW1Fi00UbWI4Kk5",
  {}
);

const Checkout = ({ fetchClientSecret }) => {
  const options = {
    fetchClientSecret: async () => {
      console.log("FETCHING CLIENT SECRET");
      return ApiUtils.apiPost("payments/create_checkout_session")
        .then((response) => {
          if (response.status === HttpStatus.OK) {
            console.log("CLIENT SECRET: " + response.data.payload);
            return response.data.payload;
          }
        })
        .catch((error) => {
          console.log("BIGTIME ERROR: " + error);
        });
    },
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default function CheckoutPage() {
  //   const [clientSecret, setClientSecret] = useState(null);
  //await ApiUtils.apiPost('/payments/create_checkout_session').data;
  console.log("LOADING BROTHER YEAH!");
  return <Checkout></Checkout>;
}
