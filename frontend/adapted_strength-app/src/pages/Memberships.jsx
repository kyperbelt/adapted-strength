import logo from "../assets/logo.png";
import {Link} from "react-router-dom"
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { UserApi } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { CardBack } from "../components/Card";
import PageContainer1 from "../components/PageContainer";
import { PrimaryButton, SecondaryButton } from "../components/Button";

function AdaptedStrengthLogo() {
  return (
    <div className="flex flex-col items-center mt-12">
      <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>
  );
}

function SubscriptionField({ ...props }) {
  if (props.tier === "BASE_CLIENT") {
    return (
      <div>
        {" "}
        <div>Base Client</div>
      </div>
    );
  } else if (props.tier === "GENERAL_CLIENT") {
    return (
      <div>
        {" "}
        <div>General Client</div>
      </div>
    );
  } else if (props.tier === "SPECIFIC_CLIENT") {
    return (
      <div>
        {" "}
        <div>Specific Client</div>
      </div>
    );
  }
}

function ExpirationField({ ...props }) {
  return <div> (Need to implement) {props.expirationDate}</div>;
}

export default function Memberships() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    UserApi.getProfileInformation()
      .then((response) => {
        if (response.status === 200) {
          setProfileInfo(response.data);
          setIsLoading(false);
          console.log(response.data);
        } else {
          // TODO: Handle error - redirect to login page or display error message
        }
      })
      .catch((error) => {
        console.error(`ERROR HAPPENED: ${error}`);
        setIsLoading(false);
        // TODO: Handle error - redirect to login page or display error message
      });
  }, []);

  if (isLoading) {
    return <div>{"Loading..."}</div>;
  }

  return (
    <PageContainer1>
      <div className="bg-secondary p-6 w-full flex flex-col items-center justify-center">
        <CardBack className="p-6" classNameCard="mb-6">
          <div className="font-bold text-lg">
            Adapted Strength (A.S.) Memberships
          </div>
          <h3> <Link to="/consultations" style={{ color: 'blue', textDecoration: 'underline' }}>  Book a Consultation </Link> for one-time FREE Access!</h3>
          <h3>Day-Passes are $29.99 afterwards!</h3>
        </CardBack>

        <div className="flex flex-col xl:flex-row max-w-screen-xl xl:space-x-6 w-5/6 content-center rounded-md">
          <SubCard
            name="Base client"
            cost="99.99"
            description="For those who dont need gym access, and only seek coaching"
            benefits={[
              "Video analysis + virtual coaching",
              "35% discount on day passes to the Adapted Strength facility",
            ]}
          >
            <span className="mb-auto" />
            <SecondaryButton onClick={async ()=>{nav("/payment-checkout/base")}}>Subscribe</SecondaryButton>
  
          </SubCard>

          <SubCard
            name="General client"
            cost="199.99"
            description="For those experienced in Adapted Strength methodolgies"
            benefits={[
              "Access to all Base Client benefits",
              "Full access to Adapted Strength facility",
              "Access to detailed coaching sessions"
            ]}
          >

            <span className="mb-auto" />
            <PrimaryButton onClick={async ()=>{nav("/payment-checkout/general")}}>Subscribe</PrimaryButton>
          </SubCard>

          <SubCard
            name="Specific client"
            cost="299.99"
            description="For all, even those new to the barbell and new to the gym"
            benefits={[
              "Access to all Base Client + General Client benefits",
              "Fully guided 1 on 1 training sessions",
              "Exclusive monitored training",
              "Nutritional advice"
            ]}
          >

            <span className="mb-auto" />
            <SecondaryButton onClick={async ()=>{nav("/payment-checkout/specific")}}>Subscribe</SecondaryButton>
          </SubCard>


          {/* <CardBack
            classNameCard="flex-1"
            className="p-6 xl:h-full flex-grow text-sm"
          >
            <div className="font-bold">Specific Client</div>
            <div>$299.99/month</div>
            <div className="font-light">
              For all, even those new to the barbell and new to the gym
            </div>
            <div className="font-bold">ACCESS TO: GENERAL, PLUS...</div>
            <div>
              <ul>
                <li>- FULLY GUIDED 1:1 SESSIONS</li>
                <li>- EXCLUSIVE MONITORED TRAINING </li>
                <li>- NUTRITIONAL ADVICE</li>
              </ul>
            </div>
            <div className="font-light">
              (INTENDED FOR THOSE SEEKING IN-DEPTH COACHING)
            </div>
            <div>
              * ONCE EXPERIENCED IN ADAPTED STRENGTH METHODOLOGIES, ATHLETES
              WILL BE GIVEN "GENERAL CLIENT" RATE
            </div>
            <SecondaryButton className="mb-0 mt-6">Subscribe</SecondaryButton>
          </CardBack> */}
        </div>
        {/* <div className="container mx-auto w-2/6 content-center text-center px-2 bg-blue-200 text-black rounded-md">
          <h2 className="font-bold">YOUR SUBSCRIPTION TIER</h2>
          <div>
            <SubscriptionField tier={profileInfo.subscriptionTier} />
          </div>

          <h2 className="font-bold">PAYMENT DATE</h2>
          <div>
            <ExpirationField exp={profileInfo.expirationDate} />
          </div>
        </div> */}
      </div>
    </PageContainer1>
  );
}

function SubCard({
  cost,
  name,
  description,
  benefits = [],
  notes = [],
  children,
}) {
  return (
    <div className="flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <h5 className="mb-2 text-xl font-medium text-gray-500 ">{name}</h5>
      <div className="flex items-baseline text-gray-900 mb-2">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{cost}</span>
        <span className="ms-1 text-xl font-normal text-gray-500 ">/month</span>
      </div>

      <div className="font-light">{description}</div>
      <ul role="list" className="space-y-5 my-7">
        {benefits.map((benefit) => {
          return <Benefit benefitName={benefit} />;
        })}
      </ul>
      {children}
    </div>
  );
}

function Benefit({ benefitName }) {
  return (
    <li className="flex items-center">
      <svg
        className="flex-shrink-0 w-4 h-4 text-blue-700 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="text-base font-normal leading-tight text-gray-500 ms-3">
        {benefitName}
      </span>
    </li>
  );
}
