import { useEffect, useState } from "react";
import { UserApi } from "../api/UserApi";
import PageContainer1 from "../components/PageContainer";
import LabeledInputField from "../components/forms/LabeledInputField";
import SubmitButton from '../components/forms/SubmitButton';


export default function EditProfile() {

    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getProfileInformation()
            .then((response) => {
                if (response.status === 200) {
                    setProfileInfo(response.data);
                    setIsLoading(false);
                } else {
                    // TODO: same as error, redirect to login page or display error message
                }
            }).catch((error) => {
                console.error(error);
                setIsLoading(false);
                //TODO: User was unable to get profile information, 
                //     redirect to login page or display error message
            });
    }, []);

    if (isLoading) {
        return <div>{"Loading..."}</div>
    }

    return (
        <EditProfileContent info={profileInfo} />
    );
}

function EditProfileContent({ info }) {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Edit Profile");
    }

    const fname = info.firstName ?? "";
    const lname = info.lastName ?? "";
    const address1 = info.address.address ?? "";
    const city = info.address.city ?? "";
    const state = info.address.state ?? "";
    const zip = info.address.zipcode ?? "";
    const phone = info.cellPhone ?? "";


    return (

        <PageContainer1>

            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Edit Profile</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <LabeledInputField type="text" id="fname" name="fname" required={true} placeholder="First Name" defaultValue={fname} />
                        <LabeledInputField className="mt-5" type="text" id="lname" name="lname" required={true} placeholder="Last Name" defaultValue={lname} />
                        <LabeledInputField className="mt-5" type="text" id="address1" name="address1" required={true} placeholder="Address 1" defaultValue={address1} />
                        <LabeledInputField className="mt-5" type="text" id="address2" name="address2" required={false} placeholder="Address 2" />
                        <LabeledInputField className="mt-5" type="text" id="city" name="city" required={true} placeholder="City" defaultValue={city} />
                        <LabeledInputField className="mt-5" type="text" id="state" name="state" required={true} placeholder="State" defaultValue={state} />
                        <LabeledInputField className="mt-5" type="number" id="zip" name="zip" required={true} placeholder="Zip" defaultValue={zip} />
                        <LabeledInputField className="mt-5" type="tel" id="phone" name="phone" required={true} placeholder="Phone" pattern="([0-9]{3}-[0-9]{2}-[0-9]{3}|[0-9]{10})" defaultValue={phone} />
                        <div className="flex justify-center w-full relative top-14">
                            <SubmitButton text="Save" onClick={console.log("clicked")} />
                        </div>
                    </form>
                </div>

            </div>
        </PageContainer1>);
}
