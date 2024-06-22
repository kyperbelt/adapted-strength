import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/logo.png';
import { PrimaryButton, SecondaryButton } from '../components/Button';

import { BlankPageContainer } from '../components/PageContainer';
import { useNavigate } from 'react-router-dom';

// <img src={logo} alt="Adapted Strength Logo" className="mx-auto" />
export default function Home() {
    const nav = useNavigate();
    useEffect(() => {
        document.title = "Adapted Strength";
    }, []);


    const placeholderImage = "https://placehold.co/300x200";
    const fitnessJourneyImage = "https://i.ibb.co/0rjhxxF/journey-min.jpg";
    const powerliftingImage = "https://i.ibb.co/sQP7Jgm/adapteds-powerlifting-min.jpg";
    const olympicWeightliftingImage ="https://i.ibb.co/VSDXFzd/adapteds-olylifting-min.jpg" ;
    const bodybuildingImage = "https://i.ibb.co/5sxKS98/adapteds-bodybuilding-min.jpg" ;

    return (
        <>
            {/* Hero Section */}
            <div className="text-left md:text-center text-primary p-12 bg-secondary space-y-5">
                <h1 className="text-6xl font-bold mb-2">Adapted Strength</h1>
                <p className="mb-4">In Vacaville, CA, Adapted Strength is an upcoming gym that offers numerous opportunities in strength training disciplines.</p>
                <div className="flex md:justify-end max-w-screen-xl pt-8">
                    <PrimaryButton onClick={
                        () => {
                            nav('/sign-up', {});
                        }

                    }>
                        Sign Up
                    </PrimaryButton>
                    <SecondaryButton onClick={
                        () => {
                            nav('/login', {});
                        }

                    }>
                        Log In
                    </SecondaryButton>
                </div>
            </div>
            <BlankPageContainer>
                <div className="px-4 space-y-12 xl:pt-12">
                    {/* Testimonials Section */}
                    <div className="bg-primary py-10">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-3">What our clients say about Adapted Strength?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                <div className="bg-primary p-6 shadow rounded">
                                    <p className="text-sm italic font-semibold text-gray-500">"I was recommended to try a cycle with the program and loved it!"</p>
                                    <span className="block mt-2 font-bold">Recommend</span>
                                </div>
                                <div className="bg-primary p-6 shadow rounded">
                                    <p className="text-sm italic font-semibold text-gray-500">"I used to hate going to the gym and now I look forward to it every day."</p>
                                    <span className="block mt-2 font-bold">Patient</span>
                                </div>
                                <div className="bg-primary p-6 shadow rounded prose">
                                    <p className="text-sm italic font-semibold text-gray-500">"The head coach, Alex Palting, is amazing. I feel so supported."</p>
                                    <span className="block mt-2 font-bold">Beginner-Friendly</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New to Fitness Section */}
                    <div className="flex flex-wrap items-center justify-center py-10">
                        <img src={fitnessJourneyImage} alt="Fitness Journey" className="w-full sm:w-1/2 p-4 max-h-96 object-contain" />
                        <div className="w-full sm:w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-2">New to fitness? Start Here!</h2>
                            <p className="mb-4">This facility offers an opportunity that will help set everyone up for goals that range from basic motor learning to advanced technical aptitude.</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Fat Loss</li>
                                <li>Muscle Building</li>
                                <li>Strength Gain</li>
                                <li>Self-Paced Environment</li>
                            </ul>
                            <PrimaryButton onClick={
                                () => {
                                    nav('/consultations', {});
                                }
                            }>
                                Book a Consultation
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Competitive Section */}
                    <div className="text-center pt-12 bg-primary border-t-2">
                        <h2 className="text-3xl font-bold mb-2">Are you looking to compete?</h2>
                        <p className="mb-4">We are looking for athletes to compete in powerlifting, olympic weightlifting, and bodybuilding.</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="bg-white p-6 shadow rounded text-center">
                                <img src={powerliftingImage} alt="Powerlifting" className="w-full object-contain max-h-64" />
                                <h3 className="font-bold mt-2">Powerlifting</h3>
                            </div>
                            <div className="bg-white p-6 shadow rounded text-center">
                                <img src={olympicWeightliftingImage} alt="Olympic Weightlifting" className="w-full object-contain max-h-64" />
                                <h3 className="font-bold mt-2">Olympic Weightlifting</h3>
                            </div>
                            <div className="bg-white p-6 shadow rounded text-center">
                                <img src={bodybuildingImage} alt="Bodybuilding" className="w-full object-contain max-h-64" />
                                <h3 className="font-bold mt-2">Bodybuilding</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </BlankPageContainer>
        </>
    );
}
