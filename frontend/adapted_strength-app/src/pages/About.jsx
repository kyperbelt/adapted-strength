import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import ContactForm from '../components/ContactForm';
import { BlankPageContainer } from '../components/PageContainer';
import { WebAdminApi } from '../api/WebAdminApi';

const About = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        WebAdminApi.getPublicAboutUs()
            .then((data) => {
                setContent(data);
            })
            .catch((error) => {
                console.error('Error loading About Us content:', error);
            });
    }, []);

    if (!content) return <div className="p-6">Loading...</div>;

    return (
        <BlankPageContainer>
            <div className="max-w-screen-lg mx-auto p-6">
                <FounderSection content={content} />
                <MissionSection content={content} />
                <ExtraSection content={content} />
                <MapSection content={content} />
                <ContactSection content={content} />
            </div>
        </BlankPageContainer>
    );
};

const renderMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    const lines = html.split('\n');
    let inList = false;
    let result = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
            if (!inList) {
                result.push('<ul class="list-disc pl-6 space-y-1">');
                inList = true;
            }
            result.push(`<li>${trimmed.replace(/^[•\-]\s*/, '')}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (trimmed) {
                result.push(`<p>${line}</p>`);
            }
        }
    }
    
    if (inList) {
        result.push('</ul>');
    }
    
    return result.join('\n');
};

const FounderSection = ({ content }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left my-12">
            <div className="md:col-start-1 md:row-start-1">
                <h1 className="text-2xl text-accent-dark font-semibold">{content.founderTitle}</h1>
            </div>
            <div className="md:col-start-1 md:row-start-2">
                <h2 className="text-4xl mt-2 font-bold">{content.founderName}</h2>
            </div>
            <img src={content.founderImageUrl || "https://i.ibb.co/PCHpGF8/coach-alex-min.jpg"} alt={content.founderName} className="w-full rounded-lg shadow-lg md:col-start-2 md:row-start-1 md:row-span-4"/>
            <div className="text-2xl my-3 text-gray-500 md:col-start-1 md:row-start-3" dangerouslySetInnerHTML={{ __html: renderMarkdown(content.founderBio) }} />
        </div>
    );
};

const MissionSection = ({ content }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start my-4 p-6 rounded-lg">
            <img src={content.missionImageUrl || "https://i.ibb.co/LJ5gDL6/mission-min.jpg"} alt="Mission" className="md:w-1/2 rounded-lg shadow-lg md:mr-4" />
            <div className="md:w-1/2 mt-4 md:mt-0">
                <h2 className="text-xl font-semibold text-accent-dark">My Mission</h2>
                <div className="text-left mt-2" dangerouslySetInnerHTML={{ __html: renderMarkdown(content.missionStatement) }} />
            </div>
        </div>
    );
};

function ExtraSection({ content }) {
    return (
        <div className="my-12">
            <div className="flex flex-col md:flex-row justify-between items-start p-6 rounded-lg">
                <div className="md:w-1/2 mt-4 md:mt-0 md:pr-4">
                    <h3 className="text-xl font-semibold text-accent-dark">Education and Qualifications</h3>
                    <div className="text-left mt-2" dangerouslySetInnerHTML={{ __html: renderMarkdown(content.qualifications) }} />
                    {content.extraSectionContent && (
                        <div className="mt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(content.extraSectionContent) }} />
                    )}
                </div>
                <img src={content.extraImageUrl || "https://i.ibb.co/gmf0m8y/extra-min.jpg"} alt="Extra" className="md:w-1/2 rounded-lg shadow-lg" />
            </div>
        </div>
    );
}

function ContactSection({ content }) {
    return (
        <div className="my-12">
            <span id="contact-section" className="absolute w-full -top-12"></span>
            <h2 className="text-2xl font-semibold text-accent-dark border-b border-accent-dark pb-2">
                Contact Us</h2>
            <ContactForm />
        </div>
    );
}

function MapSection({ content }) {
    return (
        <div className="my-12">
            <h2 className="text-2xl font-semibold text-accent-dark border-b border-accent-dark pb-2">
                Location</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.076768549681!2d-121.99027292342805!3d38.34720517897936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80853d595d12af1d%3A0xbd21d9ada7d741f8!2s186%20Bella%20Vista%20Rd%20d%2C%20Vacaville%2C%20CA%2095687!5e0!3m2!1sen!2sus!4v1714785633045" className="w-full h-96 rounded-lg shadow-lg mt-12" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}

export default About;
