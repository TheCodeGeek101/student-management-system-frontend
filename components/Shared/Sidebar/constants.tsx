import { 
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, 
  FaCog, FaMoneyCheckAlt, FaFileInvoiceDollar, FaCreditCard, 
  FaHistory, FaBalanceScaleRight, FaUndo, FaUser, FaUsers, 
  FaDatabase, FaKey, FaCalendarAlt ,
  FaBuilding, 
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

export const menuGroups: MenuGroup[] = [
  {
    name: 'General',
    menuItems: [
      {
        icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
        label: 'Dashboard',
        route: '/Admin/dashboard/page',
      },
    ],
  },
  {
    name: 'Academic',
    menuItems: [
      {
        icon: <FaBuilding className="text-blue-500" />, // Blue for departments
        label: 'Departments',
        route: '#',
        children: [
          {
            icon: <FaBuilding className="text-blue-500" />,
            label: 'All Departments',
            route: '/Admin/departments/all/page',
          },
          {
            icon: <FaBuilding className="text-blue-500" />,
            label: 'Add Department',
            route: '/Admin/departments/create/page',
          },
        ],
      },
      {
        icon: <FaUserGraduate className="text-green-500" />, // Green for students
        label: 'Students',
        route: '#',
        children: [
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'All Students',
            route: '/Admin/students/all/page',
          },
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'Add Student',
            route: '/Admin/students/create/page',
          },
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'Withdrawn Students',
            route: '/Admin/students/withdrawn/page',
          },
        ],
      },
      {
        icon: <FaChalkboardTeacher className="text-yellow-500" />, // Yellow for teachers
        label: 'Teachers',
        route: '#',
        children: [
          {
            icon: <FaChalkboardTeacher className="text-yellow-500" />,
            label: 'All Teachers',
            route: '/Admin/tutors/all/page',
          },
          {
            icon: <FaChalkboardTeacher className="text-yellow-500" />,
            label: 'Add Teacher',
            route: '/Admin/tutors/create/page',
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
            label: 'All Subjects',
            route: '/Admin/subjects/all/page',
          },
          {
            icon: <FaBook className="text-purple-500" />,
            label: 'Add Subject',
            route: '/Admin/subjects/create/page',
          },
          {
            icon: <FaBook className="text-purple-500" />,
            label: 'Subject Allocation',
            route: '/Admin/subjects/assigned/page',
          },
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
            label: 'All Events',
            route: '/events/all',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Add Event',
            route: '/events/add',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Event Calendar',
            route: '/events/calendar',
          },
        ],
      },
    ],
  },
  // {
  //   name: 'Finance',
  //   menuItems: [
  //     {
  //       icon: <FaMoneyCheckAlt className="text-teal-500" />, // Teal for fees payments
  //       label: 'Payments',
  //       route: '#',
  //       children: [
  //         {
  //           icon: <FaMoneyCheckAlt className="text-teal-500" />,
  //           label: 'All Payments',
  //           route: '/payments/all',
  //         },
         
  //         {
  //           icon: <FaFileInvoiceDollar className="text-teal-500" />,
  //           label: 'Invoices',
  //           route: '/payments/invoices',
  //         }
  //       ],
  //     },
  //   ],
  // },
  {
    name: 'Settings',
    menuItems: [
      {
        icon: <FaCog className="text-red-500" />, // Red for system settings
        label: 'System settings',
        route: '#',
        children: [
          {
            icon: <FaUser className="text-red-500" />, // Red for profile
            label: 'Profile',
            route: '/Admin/profile/page',
          },
          {
            icon: <FaUsers className="text-red-500" />, // Red for user management
            label: 'User Management',
            route: '/Admin/settings/Usermanagement/Index',
          }
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
