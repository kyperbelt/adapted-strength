/*
Module: Booking.jsx
Team: TeraBITE
*/
/*
Module: ProgramUpload.jsx
Team: TeraBITE
*/
import { useEffect, React } from 'react';
import logo from '../assets/logo.png';
import PageContainer1, { BlankPageContainer1, PageContainer2 } from '../components/PageContainer';
//import { calendly } from 'calendly-js';
/* TEMP IMPORT FILE: Keep handy if rework is done in future
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
*/
function AdaptedStrengthLogo() {
    return (<div className="h-full flex flex-col items-center mt-5">
        <img src={logo} alt="Adapted Strength Logo" className="text-slate-200 px-3 py-1" />
    </div>);
}

const CalendlyBooking = () => {
    useEffect(() => {
        document.title = "Adapted Strength"; // Set the title when the component mounts
        return () => {
            document.title = "Adapted Strength"; // Optionally reset the title when the component unmounts
        };
    }, []);
    return (

        <PageContainer2>
            <h3 className="relative text-center text-2xl bottom-12">Book your consultation below!</h3>
            <div className="bg-primary px-3 flex-1 flex flex-col text-center min-h-[850px]">
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js">
                </script>
                <iframe
                    src="https://calendly.com/adaptedstrength"
                    width="100%"
                    height="100%"
                    title="Calendly scheduling link"
                    className='rounded-2xl grow min-h-fit'
                ></iframe>
            </div>
        </PageContainer2>)
};

export default CalendlyBooking;
