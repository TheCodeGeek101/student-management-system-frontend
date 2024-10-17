"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

interface Event {
  subject_id: string;
  subject_name:string;
  event_date: string;
}

interface TimetableProps {
  class_id: number
}

const ViewTimetable: React.FC<TimetableProps> = ({ class_id }) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  console.log('class id' + class_id);
  // Fetch events from the API
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.post('/api/GetTimetable', {
          class_id:class_id
        });
        if (response.status === 200) {
          const eventsData = response.data.timetables.map((event: any) => ({
            subject_id: event.subject_name,
            event_date: event.event_date
          }));
          setAllEvents(eventsData);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };
    fetchTimetable();
  }, [class_id]);

  // Prepare events in FullCalendar format
  const calendarEvents = allEvents.map((event) => ({
    title: `Subject: ${event.subject_name}`,
    start: event.event_date,
    allDay: true
  }));

  return (
    <>
      <Toaster />
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Class Timetable</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek'
              }}
              events={calendarEvents}
              nowIndicator={true}
              editable={false}
              selectable={false}
              firstDay={1} // Monday as the first day of the week
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewTimetable;
