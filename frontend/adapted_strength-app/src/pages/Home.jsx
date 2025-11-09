import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/Button';
import { BlankPageContainer } from '../components/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { WebAdminApi } from '../api/WebAdminApi';

export default function Home() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [content, setContent] = useState(null);

    useEffect(() => {
        document.title = "Adapted Strength";
        WebAdminApi.getPublicHomePage()
            .then((data) => {
                setContent(data);
            })
            .catch((error) => {
                console.error('Error loading Home Page content:', error);
            });
    }, []);

    const handleGetStarted = () => {
        if (user) {
            navigate('/consultations');
        } else {
            navigate('/memberships');
        }
    };

    if (!content) return <div className="p-6">Loading...</div>;

    return (
        <>
            {/* Hero Section */}
            <div className="text-left md:text-center text-primary p-12 bg-secondary space-y-5">
                <h1 className="text-6xl font-bold mb-2">{content.heroTitle}</h1>
                <p className="mb-4">{content.heroSubtitle}</p>
                <div className="flex md:justify-end max-w-screen-xl pt-8">
                    <PrimaryButton onClick={handleGetStarted} className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                        {content.ctaButtonText}
                    </PrimaryButton>
                </div>
            </div>
            <BlankPageContainer>
                <div className="px-4 space-y-12 xl:pt-12">
                    {content.sections && content.sections
                        .filter(section => section.visible !== false)
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((section, index) => (
                            <SectionRenderer key={index} section={section} />
                        ))}
                </div>
            </BlankPageContainer>
        </>
    );
}

function SectionRenderer({ section }) {
    if (section.sectionType === 'testimonials') {
        return <TestimonialsSection section={section} />;
    } else if (section.sectionType === 'sports') {
        return <SportsSection section={section} />;
    } else if (section.sectionType === 'simple') {
        return <SimpleSection section={section} />;
    }
    return null;
}

function TestimonialsSection({ section }) {
    const testimonials = section.data ? JSON.parse(section.data) : [];
    
    return (
        <div className="bg-gray-50 py-16 -mx-4 px-4">
            <div className="text-center max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
                            <p className="text-base italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                            <span className="block text-lg font-bold text-accent">{testimonial.author}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SimpleSection({ section }) {
    return (
        <div className="text-center py-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-xl text-gray-600">{section.content}</p>
        </div>
    );
}

function SportsSection({ section }) {
    const sports = section.data ? JSON.parse(section.data) : [];
    
    return (
        <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-10">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {sports.map((sport, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <img src={sport.image} alt={sport.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3">{sport.title}</h3>
                            <p className="text-gray-600">{sport.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
