import logo from '../assets/logo.png';
import Footer from '../components/footer';

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

export default function Memberships() {
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-56 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <div>
                <p className='font-bold text-lg'>Adapted Strength (A.S.) <br></br>
                Memberships</p>
                <h3>Book a Consultation for</h3>
                <h3>One-Time Free Access!</h3>   
                <h3>Day-Passes are $29.99 afterwards!</h3>
            </div>
            <br></br>
            <div className="container mx-auto w-5/6 content-center ">
                <div className='text-left px-2 bg-gray-200 hover:bg-gray-700 hover:text-white'>
                    <p className='font-bold'>Base Client - Program Only</p>
                    <p>$99.99/month</p>    
                    <p className='font-light'>For those who do not need gym access, and only seek coaching</p>
                        <p className='font-bold'>ACCESS TO:</p>
                        <p> - VIDEO ANALYSIS + VIRTUAL COACHING <br></br>
                            - 35% DISCOUNT ON DAY-PASSES TO ADAPTED STRENGTH FACILITY
                        </p>
                </div>
                <br></br>
                <div className='text-left px-2 bg-gray-300 hover:bg-gray-700 hover:text-white'>
                    <p className='font-bold'>General Client</p>
                    <p>$199.99/month</p>
                    <p className='font-light'>For those experienced in Adapted Strength methodolgies</p>
                    <p className='font-bold'>ACCESS TO: BASE, PLUS...</p>
                    <p>- FULL ACCESS TO ADPATED STRENGTH FACILITY<br></br>
                    - ACCESS TO DETAILED COACHING SESSIONS</p>
                    <p className='font-light'>(INTENDED FOR CONTINUING ATHLETES/ EXPERIENCED MEMBERS WHO SEEK OCCASIONAL COACHING)</p>
                </div>
                <br></br>
                <div className='text-left px-2 bg-gray-200 hover:bg-gray-700 hover:text-white'>
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
