import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const events = [
        {
            title: 'Meeting',
            start: new Date(2024, 2, 25, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
            end: new Date(2024, 2, 25, 12, 0)
        },
        {
            title: 'Coffee break',
            start: new Date(2024, 2, 26, 15, 0),
            end: new Date(2024, 2, 26, 15, 30)
        }
        // Add more events as needed
    ];

    return (
        <div className='pt-20 w-2/3 mx-auto' style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '50px' }}
            />
        </div>
    );
}

export default MyCalendar;
