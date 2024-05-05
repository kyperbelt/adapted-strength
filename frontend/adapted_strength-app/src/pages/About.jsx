import React from 'react';
import teamMemberImage from '../assets/team_member_image.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import Footer from '../components/footer';
import ContactForm from '../components/ContactForm';
import { PageContainer2, BlankPageContainer } from '../components/PageContainer';

const FounderSection = ({ content }) => {
    return (
        <section className="rounded-lg flex flex-col text-left mt-8 p-6">
            <h2 className="text-xl font-semibold ">Founder of Adapted Strength</h2>

            <p className="mt-2 text-4xl font-bold text-custom-dark text-center">Coach Alex</p>
            <p className="text-center my-4">Hello and Welcome! I’m Alex-Andre B. Palting, a fitness coach with a decade worth of experience that is located out in Northern California.</p>
            <img src={teamMemberImage} alt="Coach Alex" className="flex-1 object-scale-down rounded-lg md:mr-4" />
        </section>
    );
};

const MissionSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center my-4 border rounded-lg p-4">
            <img src={image3} alt="Description of image3" className="md:flex-1 w-auto h-48 rounded-lg md:mr-4" />
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
    );
};

const About = () => {
    return (
        <BlankPageContainer>
            <div className="flex-grow max-w-screen-lg mx-auto p-6">
                <h1 className="text-center text-4xl font-bold my-6 text-custom-red">About Us</h1>

                <FounderSection />

                <div className="flex flex-col md:flex-row items-center my-4">
                    <img src={image2} alt="Description of image2" className="md:flex-1 w-auto h-auto rounded-lg md:mr-4" />
                    <p className="md:flex-1 mt-4 md:mt-0">Text related to image2...</p>
                </div>
                {/*
                <section className="mt-8 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-custom-dark">Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                    </div>
                </section> 
                */}

                <MissionSection />

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.076768549681!2d-121.99027292342805!3d38.34720517897936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80853d595d12af1d%3A0xbd21d9ada7d741f8!2s186%20Bella%20Vista%20Rd%20d%2C%20Vacaville%2C%20CA%2095687!5e0!3m2!1sen!2sus!4v1714785633045!5m2!1sen!2sus" width="800" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <ContactForm />
            </div>
        </BlankPageContainer>
    );
};

export default About;
