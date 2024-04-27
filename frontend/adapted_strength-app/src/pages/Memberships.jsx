import { HttpStatus } from "../api/ApiUtils";
import { SubscriptionApi } from "../api/SubscriptionApi";
import StateGuard from "../util/StateGuard";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { startTransition } from "react";
import Footer from "../components/footer";
import { useEffect, useState, useRef } from "react";
import { AuthApi } from "../api/AuthApi";
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

export default function Memberships() {
  const nav = useNavigate();

  // const [userInfo, setUserInfo] = useState(null);
  const [tier, setTier] = useState(null);
  const isLoggedIn = useRef(AuthApi.isLoggedIn());

  useEffect(() => {
    if (AuthApi.isLoggedIn()) {
      UserApi.getProfileInformation()
        .then((r) => {
          if (r.status === HttpStatus.OK) {
            console.log(r.data);
            setTier(r.data.subscriptionTier);
          }
        })
        .catch((e) => {
          console.log("BIG ERROR:", e);
        });
    }
  }, []);

  // "NO SUBSCRIPTIOn" // <- use case
  // "BASE CLIENT" <- want to put them in upgrade page
  // "SPECIFIC CLIENT" <- no show

  if (!tier || tier === "NO_SUBSCRIPTION") {
    return <NoSubscription tier={tier} nav={nav} />;
  } else {
    return <ChangeSubscription tier={tier} nav={nav} />;
  }
}

function ChangeSubscription({ tier, nav }) {
  const [loadingBase, setLoadingBase] = useState(false);
  const [loadingSpecific, setLoadingSpecific] = useState(false);

  return (
    <PageContainer1>
      <div className="bg-secondary xl:p-6 w-full flex flex-col items-center justify-center">
        <CardBack className="p-6 flex" classNameCard="mb-6 flex">
          <div className="font-bold xl:text-lg text-md">
            Adapted Strength (A.S.) Memberships
          </div>
          <h3>
            {" "}
            <Link
              to="/consultations"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {" "}
              Book a Consultation{" "}
            </Link>{" "}
            for one-time FREE Access!
          </h3>
          <h3>Day-Passes are $29.99 afterwards!</h3>
        </CardBack>

        <div className="flex flex-col xl:flex-row max-w-screen-xl space-y-6 xl:space-y-0 xl:space-x-6 w-11/12 xl:w-5/6 content-center rounded-md">
          <SubCard
            name="Remote Client"
            cost="99.99"
            description="For those who dont need gym access, and only seek coaching"
            benefits={[
              "Video analysis + virtual coaching",
              "35% discount on day passes to the Adapted Strength facility",
            ]}
          >
            <span className="mb-auto" />
            <StateGuard state={() => tier !== "BASE_CLIENT"}>
              <PrimaryButton
                onClick={async () => {
                  // await SubscriptionApi.changeSubTier({plan: "base"});
                  setLoadingBase(true);
                  await SubscriptionApi.changeSubTier({ plan: "base" }).then(
                    (_) => {

                      setTimeout(() => {
                        setLoadingSpecific(false);
                        nav("/profile");
                      }, 300);
                    }
                  );

                  // nav("/profile");
                }}
              >
                {!loadingBase ? (
                  <>Change Subscription</>
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </PrimaryButton>
            </StateGuard>
            <StateGuard state={() => tier === "BASE_CLIENT"}>
              <div className="flex flex-row justify-center text-nowrap font-bold p-6">
                CURRENT SUBSCRIPTION
                <svg
                  className="w-6 h-6 text-green-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </div>
            </StateGuard>
          </SubCard>

          <SubCard
            name="In-Person Client"
            cost="299.99"
            description="For all, even those new to the barbell and new to the gym"
            benefits={[
              "Access to all Base Client + General Client benefits",
              "Fully guided 1 on 1 training sessions",
              "Exclusive monitored training",
              "Nutritional advice",
            ]}
            notes={[
              "Intended for those seeking in-depth coaching",
              "Once experienced in Adapted Strength Methodologies, Athleses will be given General Client rate",
            ]}
          >
            <span className="mb-auto" />
            <StateGuard state={() => tier !== "SPECIFIC_CLIENT"}>
              <PrimaryButton
                onClick={async () => {
                  setLoadingSpecific(true);
                  await SubscriptionApi.changeSubTier({
                    plan: "specific",
                  }).then((_) => {

                    setTimeout(() => {
                      setLoadingBase(false);
                      setLoadingSpecific(false);
                      nav("/profile");
                    }, 300);
                  });
                }}
              >

                {!loadingSpecific ? (
                  <>Change Subscription</>
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </PrimaryButton>
            </StateGuard>
            <StateGuard state={() => tier === "SPECIFIC_CLIENT"}>
              <div className="flex flex-row justify-center font-bold p-6">
                CURRENT SUBSCRIPTION
                <svg
                  className="w-6 h-6 text-green-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </div>
            </StateGuard>
          </SubCard>
        </div>
      </div>
    </PageContainer1>
  );
}

function NoSubscription({ tier, nav }) {
  const [loadingBase, setLoadingBase] = useState(false);
  const [loadingSpecific, setLoadingSpecific] = useState(false);

  return (
    <PageContainer1>
      <div className="bg-secondary xl:p-6 w-full flex flex-col items-center justify-center">
        <CardBack className="p-6 flex" classNameCard="mb-6 flex">
          <div className="font-bold xl:text-lg text-md">
            Adapted Strength (A.S.) Memberships
          </div>
          <h3>
            {" "}
            <Link
              to="/consultations"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {" "}
              Book a Consultation{" "}
            </Link>{" "}
            for one-time FREE Access!
          </h3>
          <h3>Day-Passes are $29.99 afterwards!</h3>
        </CardBack>
        
        <div className="flex flex-col xl:flex-row max-w-screen-xl space-y-6 xl:space-y-0 xl:space-x-6 w-11/12 xl:w-5/6 content-center rounded-md">
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
            <PrimaryButton
              onClick={async () => {
                startTransition(() => {
                  nav("/payment-checkout/base");
                });
              }}
            >
              Subscribe
            </PrimaryButton>
          </SubCard>

          <SubCard
            name="Specific client"
            cost="299.99"
            description="For all, even those new to the barbell and new to the gym"
            benefits={[
              "Access to all Base Client + General Client benefits",
              "Fully guided 1 on 1 training sessions",
              "Exclusive monitored training",
              "Nutritional advice",
            ]}
            notes={[
              "Intended for those seeking in-depth coaching",
              "Once experienced in Adapted Strength Methodologies, Athleses will be given General Client rate",
            ]}
          >
            <span className="mb-auto" />
            <PrimaryButton
              onClick={async () => {
                startTransition(() => {
                  nav("/payment-checkout/specific");
                });
              }}
            >
              Subscribe
            </PrimaryButton>
          </SubCard>
        </div>
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
