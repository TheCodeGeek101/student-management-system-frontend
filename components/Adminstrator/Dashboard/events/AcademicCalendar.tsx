"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Event {
  description: string;
  start: Date | string;
  end: Date | string;
  isActive: boolean;
  id: number;
}

interface EventProps {
  user: any; // replace with the actual user type if necessary
}

const ViewAcademicCalendar: React.FC<EventProps> = ({ user }) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // Fetch Academic Calendar from the backend
  useEffect(() => {
    const getAcademicCalendar = async () => {
      try {
        const response = await axios.post('/api/GetData', {
          endPoint: 'academic/calendars',
        });

        if (response.status === 200) {
          const calendars = response.data.calendars.map((calendar: any) => ({
            description: calendar.description,
            start: calendar.start_date,
            end: calendar.end_date,
            isActive: calendar.is_active,
            id: calendar.id,
          }));
          setAllEvents(calendars); // Set the calendar data
        }
      } catch (error) {
        console.error('Error fetching academic calendar:', error);
        toast.error('Failed to load academic calendar');
      }
    };

    getAcademicCalendar();
  }, []);

  return (
    <>
      <Toaster />
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Academic Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
              }}
              events={allEvents.map((event) => ({
                title: `${event.description} (${event.isActive ? 'Active' : 'Inactive'})`,
                start: event.start,
                end: event.end,
                allDay: true,
              }))}
              nowIndicator={true}
              selectable={false} // Disable date selection
              editable={false} // Disable event editing
              eventClick={() => {
                toast("Viewing academic calendar details only");
              }} // Disable the modal appearance
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewAcademicCalendar;
