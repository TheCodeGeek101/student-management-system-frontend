import { 
  FaHome, FaBook, FaCalendarAlt, FaUser, 
  FaCog, FaChalkboardTeacher, FaUsers, FaClipboardList, FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  route: string;
  children?: MenuItem[];
}

interface MenuGroup {
  name: string;
  menuItems: MenuItem[];
}

export const teacherMenuGroups: MenuGroup[] = [
  {
    name: 'General',
    menuItems: [
      {
        icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
        label: 'Dashboard',
        route: '/Tutors/dashboard/page',
      },
    ],
  },
  {
    name: 'Academics',
    menuItems: [
      {
        icon: <FaChalkboardTeacher className="text-yellow-500" />, // Yellow for classes
        label: 'Class Schedules',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Timetable',
            route: '/Tutors/timetables/page',
          },
          {
            icon: <FaChalkboardTeacher className="text-yellow-500" />,
            label: 'View Classes',
            route: '/teacher/classes/view',
          },
          {
            icon: <FaChalkboardTeacher className="text-yellow-500" />,
            label: 'Manage Attendance',
            route: '/teacher/classes/attendance',
          },
        ],
      },
      {
        icon: <FaBook className="text-purple-500" />, // Purple for subjects
        label: 'Subjects',
        route: '#',
        children: [
          {
            icon: <FaBook className="text-purple-500" />,
            label: 'Allocated Subjects',
            route: '/Tutors/subjects/allocated/page',
          },
        ],
      },
      {
        icon: <FaClipboardList className="text-indigo-500" />, // Indigo for assessments
        label: 'Assessments',
        route: '#',
        children: [
          {
            icon: <FaClipboardList className="text-indigo-500" />,
            label: 'Continuous Assessments',
            route: '/Tutors/assessments/Index',
          },
        ],
      },
      {
        icon: <FaCheckCircle className="text-green-500" />, // Green for grades
        label: 'Examination Results',
        route: '#',
        children: [
          {
            icon: <FaCheckCircle className="text-green-500" />,
            label: 'End of term',
            route: '/Tutors/results/Index',
          }
        ],
      },
    ],
  },
  {
    name: 'Scheduling',
    menuItems: [
      {
        icon: <FaCalendarAlt className="text-orange-500" />, // Orange for events
        label: 'Events',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Events',
            route: '/Tutors/events/event',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Academic calendar',
            route: '/Tutors/events/calendar',
          },
        ],
      },
    ],
  },
  {
    name: 'Settings',
    menuItems: [
      {
        icon: <FaCog className="text-red-500" />, // Red for settings
        label: 'Settings',
        route: '#',
        children: [
          {
            icon: <FaUser className="text-red-500" />, // Red for profile
            label: 'Profile',
            route: '/Tutors/profile/page',
          },
          {
            icon: <FaUsers className="text-red-500" />, // Red for user management
            label: 'Manage Students',
            route: '/teacher/students/manage',
          },
        ],
      },
    ],
  },
   {
    name: 'Help & Support',
    menuItems: [
      {
        icon: <FaInfoCircle className="text-green-500" />, // Green for help and support
        label: 'Help & Support',
        route: '#',
        children: [
          {
            icon: <FaInfoCircle className="text-green-500" />, // Green for help documentation
            label: 'Help Documentation',
            route: '/help',
          },
          {
            icon: <FaInfoCircle className="text-green-500" />, // Green for contact support
            label: 'Contact Support',
            route: '/support',
          },
        ],
      },
    ],
  },
];
