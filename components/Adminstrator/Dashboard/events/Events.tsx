"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import React from 'react'
import { User } from '@/types/user'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

interface EventProps {
  user: User
}

const AdminEvents: React.FC<EventProps> = ({ user }) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const endpoint = 'events/create';
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: 0
  });

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        }
      });
    }
  }, []);

  // Get Events from the backend 
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.post('/api/GetData', {
          endPoint: 'events'
        });

        // checking if the response is successful
        if (response.status === 200) {
          const eventsData = response.data.events.map((event: any) => ({
            title: event.event_name,
            start: event.event_date,
            allDay: true,
            id: event.id,
          }));
          setAllEvents(eventsData); // Set retrieved events to allEvents state
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      }
    }
    getAllEvents();
  }, []);

  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    const formattedDate = arg.date.toISOString().split('T')[0];
    setNewEvent({ ...newEvent, start: formattedDate, allDay: arg.allDay, id: new Date().getTime() });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const formattedDate = data.date.toISOString().split('T')[0];
    const event = { ...newEvent, start: formattedDate, title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() };
    setAllEvents([...allEvents, event]);
  }

 // Update this function to set the correct ID for the selected event
function handleDeleteModal(data: { event: { id: string } }) {
  console.log('id to delete :' + data.event.id);
  setShowDeleteModal(true);
  setIdToDelete(Number(data.event.id)); // Make sure you're setting the correct ID


}

// Update the handleDelete function
const handleDelete = async () => {
  if (idToDelete === null) return; // Ensure idToDelete is not null

  try {
    // Make a delete request to the server with the idToDelete
    const response = await axios.post('/api/deleteEvent', {
      id: idToDelete, // Use idToDelete directly
      endPoint: 'events'
    });

    if (response.status === 200) {
      // Remove the event from the state after successful deletion
      setAllEvents(allEvents.filter(event => event.id !== idToDelete));
      toast.success('Event deleted successfully');
    }
  } catch (error: any) {
    console.error('Submission error:', error);

    if (error.response) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message || 'Failed to delete event');
      } else if (error.response.status === 500) {
        toast.error('Server error occurred');
      } else {
        toast.error('Operation Failed: ' + (error.response.data.error || 'Unknown error'));
      }
    } else if (error.request) {
      toast.error('No response from server');
    } else {
      toast.error('Error encountered: ' + error.message);
    }
  } finally {
    // Close the delete modal
    setShowDeleteModal(false);
    setIdToDelete(null); // Reset the idToDelete
  }
}

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    });

    try {
      setIsLoading(true);
      const { title, start } = newEvent;
      const formattedStart = new Date(start).toISOString().split('T')[0]; // Ensure correct format

      const response = await axios.post('/api/post/PostDataApi', {
        endPoint: endpoint,
        data: {
          event_name: title,
          event_date: formattedStart // Sending the correctly formatted date
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Record created successfully");
      }
    } catch (error: any) {
      console.error('Submission error:', error);

      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message || 'A term in the calendar already exists within the specified dates.');
        } else if (error.response.status === 500) {
          toast.error('Server error occurred');
        } else {
          toast.error('Operation Failed: ' + (error.response.data.error || 'Unknown error'));
        }
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700"> Event Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
         
        </div>

        {/* Delete Modal */}
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full">
                    <div>
                      <div className="mx-auto flex items-center justify-center rounded-full bg-red-100 p-3">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-4 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Delete Event
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this event?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Modal for Event Creation */}
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full">
                    <div>
                      <div className="mt-2">
                        <h1 className="text-lg font-bold">Create Event</h1>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                            Event Title
                          </label>
                          <input
                            type="text"
                            name="event"
                            value={newEvent.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                            Event Date
                          </label>
                          <input
                            type="date"
                            name="eventDate"
                            value={newEvent.start as any}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="mt-5">
                          <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                          >
                            {loading ? 'Creating...' : 'Create Event'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  );
};

export default AdminEvents;
