import PageContainer1 from "../components/PageContainer";
import SubmitButton from '../components/forms/SubmitButton';
import LabeledInputField from "../components/forms/LabeledInputField";

export default function EditProfile() {
    let onSubmit = (e) => {
        e.preventDefault();
        console.log("Edit Profile");
    }

    return (<PageContainer1>

        <div className="relative bottom-20">
            <h1 className="relative mx-0 text-center text-2xl bottom-4">Edit Profile</h1>
            <div className="flex w-full justify-center" >
                <form onSubmit={onSubmit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                    <LabeledInputField type="text" id="fname" name="fname" required={true} placeholder="First Name" />
                    <LabeledInputField className="mt-5" type="text" id="lname" name="lname" required={true} placeholder="Last Name" />
                    <LabeledInputField className="mt-5" type="text" id="address1" name="address1" required={true} placeholder="Address 1" />
                    <LabeledInputField className="mt-5" type="text" id="address2" name="address2" required={false} placeholder="Address 2" />
                    <LabeledInputField className="mt-5" type="text" id="city" name="city" required={true} placeholder="City" />
                    <LabeledInputField className="mt-5" type="text" id="state" name="state" required={true} placeholder="State" />
                    <LabeledInputField className="mt-5" type="number" id="zip" name="zip" required={true} placeholder="Zip" />
                    <LabeledInputField className="mt-5" type="tel" id="phone" name="phone" required={true} placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                    <div className="flex justify-center w-full relative top-14">
                        <SubmitButton text="Save" onClick={console.log("clicked")} />
                    </div>
                </form>
            </div>

        </div>
    </PageContainer1>);
}