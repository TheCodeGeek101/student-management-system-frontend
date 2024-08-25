import { 
    FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, 
    FaCog, FaMoneyCheckAlt, FaFileInvoiceDollar, FaCreditCard, 
    FaHistory, FaBalanceScaleRight, FaUndo, FaUser, FaUsers, 
    FaDatabase, FaKey, FaCalendarAlt,
    FaClipboardList,
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
  
  export const studentMenuGroups: MenuGroup[] = [
    {
      name: 'General',
      menuItems: [
        {
          icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
          label: 'Dashboard',
          route: '/student/dashboard/page',
        },
      ],
    },
    {
      name: 'Academic',
      menuItems: [
        // {
        //   icon: <FaUserGraduate className="text-green-500" />, // Green for profile
        //   label: 'My Profile',
        //   route: '/student/profile',
        // },
        // {
        //   icon: <FaChalkboardTeacher className="text-yellow-500" />, // Yellow for teachers
        //   label: 'Teachers',
        //   route: '/student/teachers',
        // },
        {
          icon: <FaBook className="text-purple-500" />, // Purple for subjects
          label: 'Subjects',
          route: '#',
          children: [
            {
              icon: <FaBook className="text-purple-500" />,
              label: 'Register Subjects',
              route: '/Student/subjects/Register',
            },
            {
              icon: <FaBook className="text-purple-500" />,
              label: 'My Subjects',
              route: '/Student/subjects/Index',
            },
          ],
        },
        {
          icon: <FaCalendarAlt className="text-orange-500" />, // Orange for events
          label: 'Events',
          route: '/student/events',
        },
        {
        icon: <FaClipboardList className="text-indigo-500" />, // Indigo for assessments
        label: 'Assessments',
        route: '#',
        children: [
          {
            icon: <FaClipboardList className="text-indigo-500" />,
            label: 'Continuous Assessments',
            route: '/Student/assessments/Index',
          },
        ],
      },
      {
        icon: <FaUserGraduate className="text-green-500" />, // Green for grades
        label: 'Examination Results',
        route: '#',
        children: [
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'End of term',
            route: '/Student/results/Index',
          },
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: 'End Of Year',
            route: '#',
          },
        ],
      },
        
      ],
    },
    {
      name: 'Finance',
      menuItems: [
        {
          icon: <FaMoneyCheckAlt className="text-teal-500" />, // Teal for fees payments
          label: 'Fees Payments',
          route: '/student/fees/payments',
        },
        {
          icon: <FaFileInvoiceDollar className="text-teal-500" />, // Teal for invoices
          label: 'Invoices',
          route: '/student/fees/invoices',
        },
        {
          icon: <FaBalanceScaleRight className="text-teal-500" />, // Teal for balances
          label: 'Balances',
          route: '/student/fees/balances',
        },
        {
          icon: <FaUndo className="text-teal-500" />, // Teal for refunds
          label: 'Refunds',
          route: '/student/fees/refunds',
        },
      ],
    },
    {
      name: 'Settings',
      menuItems: [
        {
          icon: <FaCog className="text-red-500" />, // Red for system settings
          label: 'Account Settings',
          route: '#',
          children: [
            {
              icon: <FaUser className="text-red-500" />, // Red for profile
              label: 'Profile',
              route: '/student/settings/profile',
            },
            {
              icon: <FaKey className="text-red-500" />, // Red for password change
              label: 'Change Password',
              route: '/student/settings/change-password',
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
  