import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import CIChat from '../../../components/CIChat';
import './index.css'
import { useEffect, useState } from 'react';

export default function CropRecommendation() {

    let localStepNum = 0;
    const [stepNum, setStepNum] = useState(0);

    const [messages, setMessages] = useState([]);

    const [fields, setFields] = useState([
        {
            title: "Corn field",
            image: "/images/dummies/corn.png",
            size: "17ha",
            text: "Harvest on July 15th"
        },
        {
            title: "Wheat field",
            image: "/images/dummies/wheat.png",
            size: "17ha",
            text: "Harvest on June 26th"
        }
    ]);


    function onSend(message) {
        setMessages(messages => [...messages, {
            user: 'user',
            logo: '/images/logo-black.svg',
            text: `<b>${message.text}</b>`,
            embeds: null
        }]);

        localStepNum++;
        setStepNum(num => num + 1);
    }

    const [steps, setSteps] = useState([
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>I am here to assist you with crop recommendations. First, I need some details from you. <br/><br/> When do you plan to harvest your crop? select from the  calender</b>`,
            embeds: [
                <LocalizationProvider key={'em-d-0'} dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        showDaysOutsideCurrentMonth 
                        fixedWeekNumber={6} 
                        disabled={stepNum !== 0}
                        onChange={(v) => {
                            if(localStepNum !== 0) return;
                            onSend({
                                type: 'date-answer',
                                text: v.$d
                            });
                        }}
                    />
                </LocalizationProvider>
            ]
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>Seems like it's a cloudy day, perfect for your workers. Now select which field?</b>`,
            embeds: [
                (() => {
                    return (
                        <div
                            style={{
                                width: '100%',
                                overflowX: 'auto',
                                display: 'flex',
                                paddingTop: '15px',
                                gap: 15
                            }}
                        >
                            {
                                fields.map((field, index) => {
                                    return (
                                        <button 
                                            key={JSON.stringify(field) + index}
                                            onClick={e => {
                                                onSend({
                                                    type: 'select-field',
                                                    text: field.title
                                                })
                                            }}

                                            style={{
                                                padding: '15px',
                                                border: 'solid black 1px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {field.title}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    )
                })()
            ]
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>I am here to assist you with crop recommendations. First, I need some details from you. <br/><br/> When do you plan to harvest your crop? select from the  calender</b>`,
            embeds: [
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        height: '80px',
                        gap: '15px'
                    }}
                >
                    <input
                        type='checkbox'
                        onClick={e => {
                            onSend({
                                type: 'check',
                                text: "Yes"
                            });
                        }}
                    />

                    <b>
                        Do you agree to give me access to your sensor's data?
                    </b>
                </div>
            ]
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>Okay now we got an idea about The soil and weather condition.<br/><br/>What are your crop type preferences?</b>`,
            embeds: []
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>A good choice! in order to make sure that these choices are suitable what was the last crop in your field?</b>`,
            embeds: []
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>Lastly, what's area of the field in hectares.</b>`,
            embeds: []
        },
        {
            user: 'bot',
            logo: '/images/logo-black.svg',
            text: `<b>Generating you repport...</b>`,
            embeds: []
        }
    ]);

    useEffect(() => {
        if(stepNum < steps.length)
            setMessages((messages) => [...messages, steps[stepNum]]);
    }, [stepNum]);

    return (
        <div id="croprecommendation">
            <h1>Crops Recommendation</h1>
            
            <br />

            <CIChat
                messages={messages}
                className='chatbot'
                onSend={onSend}
            />
            
            <br />
        </div>
    );
}