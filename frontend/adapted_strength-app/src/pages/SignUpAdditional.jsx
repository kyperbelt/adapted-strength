import logo from '../assets/logo.png';

function FnameField() {
    return (<input type="text" placeholder="First Name" id="fname" name="fname" required />);
}
function LnameField() {
    return (<input type="text" placeholder="Last Name" id="lname" name="lname" required />);
}
function DateOfBirthField() {
    return (<input type="date" placeholder="Date of Birth" id="dob" name="dob" required />);
}
function SexField() {
    return (<select id="sex" required><option value="M">Male</option><option value="F">Female</option><option value="N">Prefer not to answer</option></select>);
}
function ShirtSizeField() {
    return (<select id="shirt_size" required>
        <option value="xxs">XXS</option>
        <option value="xs">XS</option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
        <option value="xxxl">XXXL</option>
    </select>);
}
function AddressField() {
    return (<input type="text" placeholder="Street Address" id="address" name="address" required />);
}
function CityField() {
    return (<input type="text" placeholder="City" id="city" name="city" required />);
}
function StateField() {
    return (<input type="text" placeholder="State" id="state" name="state" required />);
}
function ZipcodeField() {
    return (<input type="text" placeholder="Zipcode" id="zipcode" name="zipcode" required />);
}
function CellPhoneField() {
    return (<input type="tel" placeholder="Cellphone" id="cell_phone" name="cell_phone" required />);
}
function HomePhoneField() {
    return (<input type="tel" placeholder="Home Phone" id="home_phone" name="home_phone" />);
}
function EmergencyContactFnameField() {
    return (<input type="text" placeholder="First Name" id="emergency_contact_fname" name="emergency_contact_fname" required />);
}
function EmergencyContactLnameField() {
    return (<input type="text" placeholder="Last Name" id="emergency_contact_lname" name="emergency_contact_lname" required />);
}
function EmergencyContactPhoneField() {
    return (<input type="tel" placeholder="Phone Number" id="emergency_contact_phone" name="emergency_contact_phone" required />);
}
function HeardField() {
    return (<input type="text" placeholder="Your response here..." id="heard" name="heard" required />);
}
function SubmitButton() {
    return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >Sign Up</button>);
}

function HandleSubmit(event) {
    event.preventDefault();
    window.location.href = "/";
}

// document/*.getElementById('sign-up') // TODO: ADAPTEDS-89*/.addEventListener('submit', HandleSubmit);

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

export default function SignUp() {
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-56 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <div className="bg-[#161A1D] h-full">
                <div className="relative bottom-20">
                    <h1 className="relative mx-0 text-center text-2xl bottom-4">Additional Information</h1>
                    <div className="flex w-full justify-center" >
                        <form className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                            <h3>Basic Info</h3>
                            <div className="w-full flex flex-col items-center px-0 pt-8">
                                <FnameField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <LnameField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <DateOfBirthField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <SexField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <ShirtSizeField />
                            </div>
                            <h2>Contact</h2>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <AddressField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <CityField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <StateField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <ZipcodeField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <CellPhoneField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <HomePhoneField />
                            </div>
                            <h2>Emergency Contact</h2>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <EmergencyContactFnameField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <EmergencyContactLnameField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <EmergencyContactPhoneField />
                            </div>
                            <h2>How did you hear about us?</h2>
                            <div className="w-full flex flex-col items-center px-0 pt-4">
                                <HeardField />
                            </div>
                            <div className="flex justify-center w-full relative top-14">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


