import {SubscriptionApi} from "../api/SubscriptionApi.js"
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { HttpStatus, ApiUtils, AUTH_TOKEN_NAME } from "../api/ApiUtils";
import { loadStripe } from "@stripe/stripe-js";
import PageContainer1 from "../components/PageContainer.jsx"
import { BlankPageContainer } from "../components/PageContainer.jsx";
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

const Checkout = ({plan}) => {
  const options = {
    fetchClientSecret: async () => {
      console.log("FETCHING CLIENT SECRET");
      return SubscriptionApi.getClientSecret({plan})
    },
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

const PLANS = ["base", "specific"];

function getAvailablePlans(){
  // TODO: HOOK to backend to get all available plans
  //      example: return SubAPI.getPlans();
  return PLANS;
}

export default function CheckoutPage() {
  const nav = useNavigate();
  const {plan} = useParams();
  const [plans, setPlans] = useState([])
  console.log(`LOADING Plan ${plan}, BROTHER, OH YEAH!`);

  useEffect(()=>{
    try{
        setPlans(getAvailablePlans());
    }catch(e){
      console.log(e);
    }
  },[]);


  return (
    <BlankPageContainer>
      {!(plans.includes(plan)) && <span>Plan not found!</span>}
      {plans.includes(plan) && <Checkout plan={plan}></Checkout>}
    </BlankPageContainer>
  );
}
