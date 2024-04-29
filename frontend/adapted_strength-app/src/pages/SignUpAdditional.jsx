import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserApi } from "../api/UserApi";
import { ApiUtils } from "../api/ApiUtils";
import { AuthApi } from "../api/AuthApi";
import logo from '../assets/logo.png';
import { HttpStatus } from '../api/ApiUtils';
import LabeledInputField from '../components/forms/LabeledInputField';
import { PrimaryButton } from '../components/Button';
import { BasicSelect } from '../components/forms/Select';
import { PageContainer2 } from '../components/PageContainer';

function FnameField() {
    return (<LabeledInputField type="text" placeholder="First Name" id="fname" name="fname" required />);
}

function LnameField() {
    return (<LabeledInputField type="text" placeholder="Last Name" id="lname" name="lname" required />);
}

function DateOfBirthField() {
    return (<LabeledInputField type="date" className="w-60" placeholder="Date of Birth" id="dob" name="dob" required />);
}

function SexField() {
    return (
        <div className="w-72 px-6">
            <label htmlFor="sex" className="text-sm text-secondary-dark">Sex</label>
            <BasicSelect className="w-full" id="sex" required>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Prefer not to answer</option>
            </BasicSelect>
        </div>
    );
}

function ShirtSizeField() {
    return (
        <div className="w-72 px-6">
            <label htmlFor="shirt_size" className="text-sm text-secondary-dark">Shirt Size</label>
            <BasicSelect className="w-full" id="shirt_size" required>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="xxxl">XXXL</option>
            </BasicSelect>
        </div>
    );
}

function AddressField() {
    return (<LabeledInputField type="text" placeholder="Street Address" id="address" name="address" required />);
}

function CityField() {
    return (<LabeledInputField type="text" placeholder="City" id="city" name="city" required />);
}

function StateField() {
    return (<LabeledInputField type="text" placeholder="State" id="state" name="state" required />);
}

function ZipcodeField() {
    return (<LabeledInputField type="text" placeholder="Zipcode" id="zipcode" name="zipcode" required />);
}

function CellPhoneField() {
    return (<LabeledInputField type="tel" placeholder="Cellphone" id="cell_phone" name="cell_phone" required />);
}

function HomePhoneField() {
    return (<LabeledInputField type="tel" placeholder="Home Phone" id="home_phone" name="home_phone" />);
}

function EmergencyContactFnameField() {
    return (<LabeledInputField type="text" placeholder="First Name" id="emergency_contact_fname" name="emergency_contact_fname" required />);
}

function EmergencyContactLnameField() {
    return (<LabeledInputField type="text" placeholder="Last Name" id="emergency_contact_lname" name="emergency_contact_lname" required />);
}

function EmergencyContactPhoneField() {
    return (<LabeledInputField type="tel" placeholder="Phone Number" id="emergency_contact_phone" name="emergency_contact_phone" required />);
}

function HeardField() {
    return (<LabeledInputField type="text" placeholder="Your response here..." id="heard" name="heard" required />);
}

function SubmitButton() {
    return (<PrimaryButton type="submit" className="border-primary border-8 text-primary rounded-full px-3 py-1">Sign Up</PrimaryButton>);
}

function AdaptedStrengthLogo() {
    return (
        <div className="flex flex-col items-center mt-12">
            <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
        </div>
    );
}

export default function SignUp() {
    const [signingUp, setSigningUp] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        if (!state || !state.email || !state.password || !state.tosAccepted || !state.healthQuestionnaire) {
            // TODO: for now we just redirect to signup page, but later  we want to check if the state is in storage or not and redirect to the appropriate page
            navigate('/sign-up', {});
        }
    }, []);

    function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            first_name: formData.get('fname'),
            last_name: formData.get('lname'),
            date_of_birth: formData.get('dob'),
            email: state.email,
            sex: formData.get('sex'),
            shirt_size: formData.get('shirt_size'),
            cell_phone: formData.get('cell_phone'),
            home_phone: formData.get('home_phone'),
            address: {
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipcode: formData.get('zipcode')
            },
            emergency_contact: {
                first_name: formData.get('emergency_contact_fname'),
                last_name: formData.get('emergency_contact_lname'),
                phone_number: formData.get('emergency_contact_phone')
            },
            how_did_you_hear: formData.get('heard'),
        }

        console.log(data);
        setSigningUp(true);

        UserApi.validateProfileInformation(data)
            .then((response) => {
                if (response.status == HttpStatus.OK) {
                    console.log("User information is valid");
                    return AuthApi.signup(state.email, state.password);
                } else {
                    throw new Error("User information is invalid");
                }
            }).then((response) => {
                if (response.status == HttpStatus.CREATED) {
                    // user is valid 
                    console.log("User is valid and account is created");
                    console.log("Token: " + response.data.payload);
                    // set the user token in local storage
                    ApiUtils.setAuthToken(response.data.payload);
                    return UserApi.createProfileInformation(data).then((response) => {
                        if (response.status == HttpStatus.OK) {

                            return UserApi.submitHealthQuestionnaire(state.healthQuestionnaire);
                        }
                        throw new Error("Unable to create user profile");
                    });
                } else if (response.status == HttpStatus.CONFLICT) { // conflict means email is already in use 
                    throw new Error("Unable to create user account, email is already in use");
                } else {
                    console.error(response);
                    throw new Error("Unable to create user account, unknown error");
                }
            }).then((response) => {
                if (response.status == HttpStatus.OK) {
                    navigate("/", {}); // redirect to home page
                } else {
                    console.error(response);
                    ApiUtils.removeAuthToken();
                    throw new Error("Unable to create user profile, unknown error");
                }
            }).finally(() => {
                setSigningUp(false);
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
            });
    }

    if (signingUp) {
        return (
            <div className="flex justify-center items-center h-screen">
                Signing up...
            </div>
        );
    }


    return (
        <PageContainer2>
            <div className="bg-[#161A1D] h-full">
                <div className="relative bottom-20">
                    <h1 className="relative mx-0 text-center text-2xl bottom-4">Additional Information</h1>
                    <div className="flex w-full justify-center">
                        <form onSubmit={HandleSubmit} className="p-0 max-w-sm lg:max-w-3xl flex flex-col lg:flex-row items-center lg:items-start bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 ">
                            <div className="w-full flex flex-col">
                                <div className="w-full flex flex-col space-y-3 items-center px-3">
                                    <h3>Basic Info</h3>
                                    <FnameField />
                                    <LnameField />
                                    <DateOfBirthField />
                                    <SexField />
                                    <ShirtSizeField />
                                </div>
                                <div className="w-full flex flex-col space-y-3 items-center px-0 pt-4">
                                    <h2>Contact</h2>
                                    <AddressField />
                                    <CityField />
                                    <StateField />
                                    <ZipcodeField />
                                    <CellPhoneField />
                                    <HomePhoneField />

                                </div>
                            </div>
                            <div className="flex flex-col lg:min-w-96">
                                <div className="w-full flex flex-col space-y-3 items-center px-0 pt-4">
                                    <h2>Emergency Contact</h2>
                                    <EmergencyContactFnameField />
                                    <EmergencyContactLnameField />
                                    <EmergencyContactPhoneField />
                                </div>

                                <div className="w-full flex flex-col items-center px-0 pt-4">
                                    <h2>How did you hear about us?</h2>
                                    <HeardField />
                                </div>
                                <div className="flex justify-center w-full relative top-14">
                                    <SubmitButton />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageContainer2>
    );
}
