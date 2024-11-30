"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { formatISO, parse } from "date-fns";
import { User } from "@/types/user";

interface Timetable {
  subject_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface TimetableProps {
  user: User;
}

const dayOfWeekToDate = (dayOfWeek: string): string => {
  const today = new Date();
  const dayMapping: { [key: string]: number } = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const todayDayOfWeek = today.getDay();
  const targetDayOfWeek = dayMapping[dayOfWeek];
  const dayDifference = targetDayOfWeek - todayDayOfWeek;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + dayDifference);

  return targetDate.toISOString().split("T")[0]; // Return only the date part
};

// Helper function to assign colors to events based on the subject
const getColorForSubject = (subject_name: string) => {
  const subjectColors: { [key: string]: string } = {
    Math: "blue",
    Science: "green",
    History: "orange",
    // Add more subjects and their colors
  };
  return subjectColors[subject_name] || "gray"; // Default color
};

const ViewTimetable: React.FC<TimetableProps> = ({ user }) => {
  const [allEvents, setAllEvents] = useState<Timetable[]>([]);
  let displayName = "User";
  let teacher_id = 0;

  if ("tutor" in user) {
    displayName = `${user.tutor.first_name} ${user.tutor.last_name}`;
    teacher_id = user.tutor.id;
  }

  // Fetch events from the API
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.post("/api/GetTeacherTimetable", {
          teacher_id: teacher_id,
        });
        if (response.status === 200) {
          const eventsData = response.data.timetable.map((timetable: any) => ({
            subject_name: timetable.subject_name,
            day_of_week: timetable.day_of_week,
            start_time: timetable.start_time,
            end_time: timetable.end_time,
          }));
          setAllEvents(eventsData);
          
        } else {
          toast.error("Failed to fetch timetable data.");
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
        toast.error("An error occurred while fetching the timetable.");
      }
    };
    if (teacher_id !== 0) {
      fetchTimetable();
    }
  }, [teacher_id]);

  // Prepare events in FullCalendar format
  const calendarEvents = allEvents.map((event) => {
    const eventDate = dayOfWeekToDate(event.day_of_week);

    return {
      title: `Subject: ${event.subject_name}`,
      start: formatISO(
        parse(
          `${eventDate} ${event.start_time}`,
          "yyyy-MM-dd HH:mm:ss",
          new Date()
        )
      ),
      end: formatISO(
        parse(`${eventDate} ${event.end_time}`, "yyyy-MM-dd HH:mm:ss", new Date())
      ),
      allDay: false,
      color: getColorForSubject(event.subject_name), // Assign color based on the subject
    };
  });

  return (
    <>
      <Toaster />
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Class Timetable</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <div className="w-full max-w-7xl">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek",
            }}
            events={calendarEvents}
            nowIndicator={true}
            editable={false}
            selectable={false}
            firstDay={1} // Monday as the first day of the week
            height="auto" // Make it auto-resizable based on the content
          />
        </div>
      </main>
    </>
  );
};

export default ViewTimetable;
