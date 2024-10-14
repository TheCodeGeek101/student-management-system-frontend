import { 
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, 
  FaCalendarAlt, FaFileAlt, FaMoneyCheckAlt, FaInfoCircle, 
  FaUsers, FaUser 
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

export const secretaryConstants: MenuGroup[] = [
  {
    name: 'General',
    menuItems: [
      {
        icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
        label: 'Dashboard',
        route: '/Admin/secretary/dashboard/page',
      },
    ],
  },

{
    name: 'Academic',
    menuItems: [
      {
        icon: <FaUserGraduate className="text-green-500" />, // Green for students
        label: 'Students',
        route: '#',
        children: [
           {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'Records',
            route: '/students/records',
           },
           {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'Awards',
            route: '/students/records',
           },
        ],
      },
    ],
  },

  {
    name: 'Scheduling',
    menuItems: [
      {
        icon: <FaCalendarAlt className="text-orange-500" />, // Orange for scheduling
        label: 'Scheduling',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Timetable',
            route: '#',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Event Calendar',
            route: '/Admin/secretary/events/page',
          },
        ],
      },
    ],
  },
  {
    name: 'Academic calendar',
    menuItems: [
      {
        icon: <FaMoneyCheckAlt className="text-red-500" />, // Red for document management
        label: 'Calendar',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Create',
            route: '/Admin/secretary/calendar/create',
          },
          {
            icon: <FaMoneyCheckAlt className="text-blue-500" />, // Blue for reports
            label: 'View',
            route: '/Admin/secretary/calendar/view',
          },
        ],
      },
    ],
  },
  {
    name: 'Document Management',
    menuItems: [
      {
        icon: <FaFileAlt className="text-red-500" />, // Red for document management
        label: 'Documents',
        route: '#',
        children: [
          
          {
            icon: <FaMoneyCheckAlt className="text-blue-500" />, // Blue for reports
            label: 'Reports',
            route: '/reports',
          },
        ],
      },
    ],
  },
  {
    name: 'System Settings',
    menuItems: [
      {
        icon: <FaUser className="text-gray-500" />, // Gray for profile settings
        label: 'Profile Settings',
        route: '/profile',
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
            icon: <FaInfoCircle className="text-green-500" />,
            label: 'Help Documentation',
            route: '/help',
          },
          {
            icon: <FaInfoCircle className="text-green-500" />,
            label: 'Contact Support',
            route: '/support',
          },
        ],
      },
    ],
  },
];
