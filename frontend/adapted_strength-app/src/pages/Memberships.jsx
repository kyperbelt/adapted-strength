import logo from '../assets/logo.png';
import Footer from '../components/footer';
import { useEffect, useState } from "react";
import { UserApi } from '../api/UserApi';

function AdaptedStrengthLogo() {
  return (
    <div className="flex flex-col items-center mt-12">
      <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>
  );
}

function DropDownMenu({ onSubmit }) {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onSubmit(selectedValue);
  };

  return (
    <div className="text-center border-b-4 p-1">
      <label htmlFor="subscriptionTier">Membership: </label>
      <select
        name="subscriptionTier"
        id="subscriptionTier"
        onChange={handleSelectChange}
      >
        <option value="">--Select Tier--</option>
        <option value="BASE_CLIENT">Base Client - Program Only</option>
        <option value="GENERAL_CLIENT">General Client</option>
        <option value="SPECIFIC_CLIENT">Specific Client</option>
      </select>
    </div>
  );
}

function SubscriptionField({...props}) {
    if (props.tier === 'BASE_CLIENT') {
        return (<div> <p>Base Client</p></div>);
    } else if (props.tier === 'GENERAL_CLIENT') {
        return (<div> <p>General Client</p></div>);
    } else if (props.tier === 'SPECIFIC_CLIENT') {
        return (<div> <p>Specific Client</p></div>);
    }
}

function ExpirationField({...props}) {
    return (<div> (Need to implement) {props.expiration_date}</div>);
}

export default function Memberships() {
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);
    const [selectedTier, setSelectedTier] = useState(profileInfo.subscriptionTier || '');

  
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
  
    const onSubmit = async (selectedValue) => {
        console.log("Selected Value:", selectedValue);
        const data = {
          subscriptionTier: selectedValue,
        };
        console.log("Data:", data);
        await UserApi.updateSubscription(data).then((response) => {
          if (response.status === 200) {
            console.log("Subscription updated successfully");
            // Update the selected tier in the state
            setSelectedTier(selectedValue);
          }
        });
      };
  
    if (isLoading) {
      return <div>{"Loading..."}</div>;
    }

    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-56 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>

            <br></br>
            

            <div className='container mx-auto w-2/6 content-center text-center px-2 bg-blue-200 text-black rounded-md'>
                    <h2 className='font-bold'>YOUR SUBSCRIPTION TIER</h2>
                    <p><SubscriptionField tier={selectedTier} /></p>

                    <h2 className='font-bold'>PAYMENT DATE</h2>
                    <p><ExpirationField exp={profileInfo.expiration_date}/></p>
                    <br></br>

                    <h2 className='font-bold'>UPGRADE OR SWITCH MEMBERSHIPS HERE</h2>
                    <DropDownMenu onSubmit={onSubmit} />

                </div>

            <br></br>

            <div>
                <p className='font-bold text-lg'>Adapted Strength (A.S.) Memberships</p>
                <h3>Book a Consultation for one-time FREE Access!</h3>   
                <h3>Day-Passes are $29.99 afterwards!</h3>
            </div>

            <br></br>

            <div className="container mx-auto w-5/6 content-center rounded-md">
                <div className='text-left px-2 bg-gray-200 hover:bg-gray-700 hover:text-white rounded-md'>
                    <p className='font-bold'>Base Client - Program Only</p>
                    <p>$99.99/month</p>    
                    <p className='font-light'>For those who do not need gym access, and only seek coaching</p>
                        <p className='font-bold'>ACCESS TO:</p>
                        <p> - VIDEO ANALYSIS + VIRTUAL COACHING <br></br>
                            - 35% DISCOUNT ON DAY-PASSES TO ADAPTED STRENGTH FACILITY
                        </p>
                </div>
                <br></br>
                <div className='text-left px-2 bg-gray-300 hover:bg-gray-700 hover:text-white rounded-md'>
                    <p className='font-bold'>General Client</p>
                    <p>$199.99/month</p>
                    <p className='font-light'>For those experienced in Adapted Strength methodolgies</p>
                    <p className='font-bold'>ACCESS TO: BASE, PLUS...</p>
                    <p>- FULL ACCESS TO ADPATED STRENGTH FACILITY<br></br>
                    - ACCESS TO DETAILED COACHING SESSIONS</p>
                    <p className='font-light'>(INTENDED FOR CONTINUING ATHLETES/ EXPERIENCED MEMBERS WHO SEEK OCCASIONAL COACHING)</p>
                </div>
                <br></br>
                <div className='text-left px-2 bg-gray-200 hover:bg-gray-700 hover:text-white rounded-md'>
                    <p className='font-bold'>Specific Client</p>
                    <p>$299.99/month</p>
                    <p className='font-light'>For all, even those new to the barbell and new to the gym</p>
                    <p className='font-bold'>ACCESS TO: GENERAL, PLUS...</p>
                    <p>- FULLY GUIDED 1:1 SESSIONS<br></br>
                    - EXCLUSIVE MONITORED TRAINING<br></br>
                    - NUTRITIONAL ADVICE</p>
                    <p className='font-light'>(INTENDED FOR THOSE SEEKING IN-DEPTH COACHING)</p>
                    <p>* ONCE EXPERIENCED IN ADAPTED STRENGTH METHODOLOGIES, ATHLETES WILL BE GIVEN "GENERAL CLIENT" RATE</p>
                </div>      
            </div>
            <br></br>
            <Footer />
        </div>
    );
}
