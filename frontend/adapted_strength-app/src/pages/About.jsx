import React from 'react';
import teamMemberImage from '../assets/team_member_image.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import Footer from '../components/footer';
import ContactForm from '../components/ContactForm';
import { BlankPageContainer } from '../components/PageContainer';

const FounderSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-template-rows: repeat(4, auto) gap-4 text-center md:text-left my-12">
            <div className="md:col-start-1 md:row-start-1">
                <h1 className="text-2xl text-accent-dark font-semibold">Founder of Adapted Strength</h1>
            </div>
            <div className="md:col-start-1 md:row-start-2">
                <h2 className="text-4xl mt-2 font-bold">Coach Alex</h2>
            </div>
            <img src={teamMemberImage} alt="Coach Alex" className="w-full rounded-lg shadow-lg md:col-start-2 md:row-start-1 md:row-end-5"/>
            <p className="text-2xl my-3 text-gray-500 md:col-start-1 md:row-start-3 md:row-end-4">Hello and Welcome! I’m Alex-Andre B. Palting, a fitness coach with a decade worth of experience that is located out in Northern California.</p>
        </div>
    );
};

const MissionSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start my-4 p-6 rounded-lg">
            <img src={image3} alt="Description of image3" className="md:w-1/2 rounded-lg shadow-lg md:mr-4" />
            <div className="md:w-1/2 mt-4 md:mt-0">
                <h2 className="text-xl font-semibold text-accent-dark">My Mission</h2>
                <ul className="list-disc text-left pl-6 space-y-1">
                    <li>Creating a sustainable and practical fitness lifestyle based on optimal gym knowledge.</li>
                    <li>Focus on long-term improvement and organic learning.</li>
                    <li>Support for beginners and athletes to maximize gym time and enjoy training.</li>
                    <li>Your fitness secretary for a healthier life.</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 text-accent-dark">Education and Qualifications</h3>
                <ul className="list-disc text-left pl-6 space-y-1">
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

function ExtraSection() {
    return (
        <div className="flex flex-col md:flex-row items-center my-12">
            <p className="md:w-1/2 mt-4 md:mt-0"></p>
            <img src={image2} alt="Description of image2" className="md:w-1/2 rounded-lg shadow-lg md:mr-4" />
        </div>
    );
}

function ContactSection() {
    return (
        <div className="my-12">
            <h2 className="text-2xl font-semibold text-accent-dark border-b border-accent-dark pb-2">
                Contact Us</h2>
            <ContactForm />
        </div>
    );
}

function MapSection() {
    return (
        <div className="my-12">
            <h2 className="text-2xl font-semibold text-accent-dark border-b border-accent-dark pb-2">
                Location</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.076768549681!2d-121.99027292342805!3d38.34720517897936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80853d595d12af1d%3A0xbd21d9ada7d741f8!2s186%20Bella%20Vista%20Rd%20d%2C%20Vacaville%2C%20CA%2095687!5e0!3m2!1sen!2sus!4v1714785633045" className="w-full h-96 rounded-lg shadow-lg mt-12" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}


const About = () => {
    return (
        <BlankPageContainer>
            <div className="max-w-screen-lg mx-auto p-6">
                <FounderSection />
                <MissionSection />
                <ExtraSection />
                <MapSection />
                <ContactSection />
            </div>
        </BlankPageContainer>
    );
};

export default About;
