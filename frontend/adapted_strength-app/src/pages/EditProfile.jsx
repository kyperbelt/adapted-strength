/*
Module: EditProfile.jsx
Team: TeraBITE
*/
import { useEffect, useState } from "react";
import { UserApi } from "../api/UserApi";
import PageContainer1 from "../components/PageContainer";
import LabeledInputField from "../components/forms/LabeledInputField";
import SubmitButton from '../components/forms/SubmitButton';
import { HttpStatus } from "../api/ApiUtils";


export default function EditProfile() {

    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getProfileInformation()
            .then((response) => {
                if (response.status === HttpStatus.OK) {
                    setProfileInfo(response.data);
                    setIsLoading(false);
                } else {
                    // TODO: same as error, redirect to login page or display error message
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
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
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            first_name: formData.get("fname"),
            last_name: formData.get("lname"),
            address: formData.get("address1"),
            city: formData.get("city"),
            state: formData.get("state"),
            zipcode: formData.get("zip"),
            phone: formData.get("phone")
        };
        await UserApi.updateProfileInformation(data)
            .then((response) => {
                if (response.status === HttpStatus.OK) {
                    console.log("Profile updated successfully");
                }
            });
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
                <h1 className="relative mx-0 text-center text-2xl bottom-4 font-outline-2 sm:mt-5">Edit Profile</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs space-y-4">
                        <LabeledInputField type="text" id="fname" name="fname" required={true} placeholder="First Name" defaultValue={fname} />
                        <LabeledInputField className="" type="text" id="lname" name="lname" required={true} placeholder="Last Name" defaultValue={lname} />
                        <LabeledInputField className="" type="text" id="address1" name="address1" required={true} placeholder="Address" defaultValue={address1} />
                        <LabeledInputField className="" type="text" id="city" name="city" required={true} placeholder="City" defaultValue={city} />
                        <LabeledInputField className="" type="text" id="state" name="state" required={true} placeholder="State" defaultValue={state} />
                        <LabeledInputField className="" type="number" id="zip" name="zip" required={true} placeholder="Zip" defaultValue={zip} />
                        <LabeledInputField className="" type="tel" id="cell_phone" name="phone" required={true} placeholder="Phone Number" pattern="([0-9]{3}-[0-9]{2}-[0-9]{3}|[0-9]{10})" defaultValue={phone} />
                        <div className="flex justify-center w-full relative top-14">
                            <SubmitButton text="Save" onClick={console.log("clicked")} />
                        </div>
                    </form>
                </div>

            </div>
        </PageContainer1>);
}
