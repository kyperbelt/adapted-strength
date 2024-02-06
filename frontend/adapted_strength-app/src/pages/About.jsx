import React from 'react';
import Footer from '../components/footer';
import ContactForm from '../components/ContactForm';
import teamMemberImage from '../assets/team_member_image.jpg';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-custom-gray">
            <div className="flex-grow max-w-screen-lg mx-auto p-6">
                <h1 className="text-center text-4xl font-bold my-6 text-custom-red">About Us</h1>

                <p className="text-center my-4">Hello and Welcome! I’m Alex-Andre B. Palting, a fitness coach with a decade worth of experience that is located out in Northern California.</p>

                <section className="neumorphism mt-8 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-custom-dark">Statement</h2>
                    <p className="text-center my-4">My mission is to take current gym knowledge that is optimal and create a fitness lifestyle that is sustainable and practical for you. My approach to fitness focused on long-term improvement and organic learning.  Whether you are starting your fitness journey from scratch or an athlete looking to up your competition level, I want to make sure they are not wasting your time in the gym, but still enjoying your process of training.</p> 
                    <p className="text-center my-4">Let me be your fitness secretary.</p>
                </section>

                <section className="neumorphism mt-8 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-custom-dark">Founder of Adapted Strength</h2>
                    <img src={teamMemberImage} alt="Coach Alex" className="w-32 h-32 rounded-full mx-auto mt-4" />
                    <p className="mt-2 text-custom-dark text-center">Coach Alex</p>
                </section>


                <div className="flex flex-col md:flex-row items-center my-4">
                    <img src={image2} alt="Description of image2" className="md:flex-1 w-auto h-48 rounded-lg neumorphism md:mr-4" />
                    <p className="md:flex-1 mt-4 md:mt-0">Text related to image2...</p>
                </div>

                <section className="neumorphism mt-8 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-custom-dark">Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                        {/* Team member cards */}
                        {/* ... */}
                    </div>
                </section>

                <div className="flex flex-col md:flex-row items-center my-4 border rounded-lg p-4">
                    <img src={image3} alt="Description of image3" className="md:flex-1 w-auto h-48 rounded-lg neumorphism md:mr-4" />
                    <div className="md:flex-1 mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold text-custom-dark border-b-2 mb-2">My Mission</h2>
                        <ul className="list-disc list-inside mt-2 text-custom-dark space-y-2">
                            <li>Creating a sustainable and practical fitness lifestyle based on optimal gym knowledge.</li>
                            <li>Focus on long-term improvement and organic learning.</li>
                            <li>Support for beginners and athletes to maximize gym time and enjoy training.</li>
                            <li>Your fitness secretary for a healthier life.</li>
                        </ul>

                        <h3 className="text-xl font-bold mt-4 text-custom-dark border-b-2 mb-2">Education and Qualifications</h3>
                        <ul className="list-disc list-inside mt-2 text-custom-dark space-y-2">
                            <li>M.S. Kinesiology: Exercise Physiology from San Francisco State University (2021)</li>
                            <li>B.S. Biochemistry + B.A. Chemistry from San Francisco State University (2019)</li>
                            <li>Certified Personal Trainer (NSCA-CPT)</li>
                            <li>Certified Olympic Weightlifting Level 2 Coach (USAW-L2)</li>
                            <li>Certified Powerlifting Club Coach (USAPL-CC)</li>
                            <li>Certified Gymnastics Instructor (USAG-I)</li>
                        </ul>
                    </div>
                </div>


                <ContactForm />
            </div>
            <Footer />
        </div>
    );
};

export default About;
