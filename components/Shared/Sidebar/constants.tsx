import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaCog, FaMoneyCheckAlt, FaFileInvoiceDollar, FaCreditCard, FaHistory, FaBalanceScaleRight, FaUndo, FaUser, FaUsers, FaDatabase, FaKey } from 'react-icons/fa';

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
        ],
      },
      {
        icon: <FaChalkboardTeacher className="text-yellow-500" />, // Yellow for tutors
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
            route: '/subjects/all',
          },
          {
            icon: <FaBook className="text-purple-500" />,
            label: 'Add Subject',
            route: '/subjects/add',
          },
        ],
      },
    ],
  },
  {
    name: 'Finance',
    menuItems: [
      {
        icon: <FaMoneyCheckAlt className="text-teal-500" />, // Teal for payments
        label: 'Fees payments',
        route: '#',
        children: [
          {
            icon: <FaMoneyCheckAlt className="text-teal-500" />,
            label: 'All Payments',
            route: '/payments/all',
          },
          {
            icon: <FaCreditCard className="text-teal-500" />,
            label: 'Payment Methods',
            route: '/payments/methods',
          },
          {
            icon: <FaFileInvoiceDollar className="text-teal-500" />,
            label: 'Invoices',
            route: '/payments/invoices',
          },
          {
            icon: <FaBalanceScaleRight className="text-teal-500" />,
            label: 'Balances',
            route: '/payments/balances/all',
          },
          {
            icon: <FaUndo className="text-teal-500" />,
            label: 'Refunds',
            route: '/payments/refunds',
          },
        ],
      },
    ],
  },
  {
    name: 'Settings',
    menuItems: [
      {
        icon: <FaCog className='text-red' />,
        label: 'System settings',
        route: '#',
        children: [
          {
            icon: <FaUser className="text-red-500" />, // Red for profile
            label: 'Profile',
            route: '/profile',
          },
          {
            icon: <FaUsers className="text-red-500" />, // Red for user management
            label: 'User Management',
            route: '/settings/user-management',
          },
          {
            icon: <FaDatabase className="text-red-500" />, // Red for backup management
            label: 'Backup Management',
            route: '/settings/backup-management',
          },
          {
            icon: <FaKey className="text-red-500" />, // Red for password complexity
            label: 'Password Complexity Parameters',
            route: '/settings/password-complexity',
          },
        ], 
      }
    ],
  },
];
