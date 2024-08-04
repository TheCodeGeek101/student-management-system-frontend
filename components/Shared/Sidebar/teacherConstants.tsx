import { 
  FaHome, FaBook, FaCalendarAlt, FaUser, 
  FaCog, FaChalkboardTeacher, FaUsers, FaClipboardList, FaCheckCircle
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
        route: '/teacher/dashboard',
      },
    ],
  },
  {
    name: 'Academics',
    menuItems: [
      {
        icon: <FaChalkboardTeacher className="text-yellow-500" />, // Yellow for classes
        label: 'My Classes',
        route: '#',
        children: [
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
        label: 'Grades',
        route: '#',
        children: [
          {
            icon: <FaCheckCircle className="text-green-500" />,
            label: 'Mid term',
            route: '/teacher/subjects/grades/mid-term',
          },
          {
            icon: <FaCheckCircle className="text-green-500" />,
            label: 'End of term',
            route: '/teacher/subjects/grades/end-term',
          },
          {
            icon: <FaCheckCircle className="text-green-500" />,
            label: 'Examination Results',
            route: '/teacher/subjects/grades/exam-results',
          },
        ],
      },
    ],
  },
  {
    name: 'Events',
    menuItems: [
      {
        icon: <FaCalendarAlt className="text-orange-500" />, // Orange for events
        label: 'Events',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'All Events',
            route: '/teacher/events/all',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Add Event',
            route: '/teacher/events/add',
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
            route: '/teacher/profile',
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
];
