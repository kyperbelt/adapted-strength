/*
Module: Booking.jsx
Team: TeraBITE
*/
/*
Module: ProgramUpload.jsx
Team: TeraBITE
*/
import React from 'react';
import logo from '../assets/logo.png';
import { calendly } from 'calendly-js';

function bookAppointment() {
    const [calendlyScriptLoaded, setCalendlyScriptLoaded] = useState(false);
    const [calendlyEventTypes, setCalendlyEventTypes] = useState([]);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/calendly.direct-api.min.js';
        script.onload = () => setCalendlyScriptLoaded(true);
        document.head.appendChild(script);
        if (calendlyScriptLoaded) {
            calendly.init({
                url: 'https://calendly.com/api/v1',
                user: {
                    email: 'EMAIL_HERE',
                    token: 'API TOKEN HERE'
                }
            });
            calendly.getEventTypes()
                .then(response => {
                    setCalendlyEventTypes(response.event_types);
                })
                .catch(error => {
                    console.error('Error fetching Calendly event types:', error);
                });
        }

    }, [calendlyScriptLoaded]);
}

function AdaptedStrengthLogo() {
    return (<div className="h-full flex flex-col items-center mt-12">
        <img src={logo} alt="Adapted Strength Logo" className="text-slate-200 px-3 py-1" />
    </div>);
}

const CalendlyBooking = () => {
    return (

        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-40 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <h3 className="relative text-center text-2xl bottom-10">Book your consultation below:</h3>
            <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src="https://calendly.com/alexpalting"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Calendly scheduling link"
                    ></iframe>

                </div>
            <div className="bg-[#161A1D] h-full">
                <p className='text-white'>Calendly import here</p>
                <div class="calendly-inline-widget" style="min-width:320px;height:580px;" data-auto-load="false"></div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js">
                </script>
                <script>
                </script>
                
            </div>
        </div>)
};

export default CalendlyBooking;