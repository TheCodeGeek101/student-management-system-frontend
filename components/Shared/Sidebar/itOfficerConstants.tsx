import { 
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, 
  FaCog, FaMoneyCheckAlt, FaFileInvoiceDollar, FaCreditCard, 
  FaHistory, FaBalanceScaleRight, FaUndo, FaUser, FaUsers, 
  FaDatabase, FaKey, FaCalendarAlt,
  FaBuilding, FaInfoCircle, FaChartBar 
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

export const itOfficerConstants: MenuGroup[] = [
  {
    name: 'General',
    menuItems: [
      {
        icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
        label: 'Dashboard',
        route: '/Admin/dashboard/page',
      },
      {
        icon: <FaUser className="text-red-500" />, // Red for profile
        label: 'Profile',
        route: '/Admin/it-officer/profile/page',
      },
    ],
  },
  {
    name: 'Scheduling',
    menuItems: [
      {
        icon: <FaCalendarAlt className="text-orange-500" />, // Orange for events
        label: 'School Events',
        route: '#',
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Academic Calendar',
            route: '/Admin/it-officer/events/calendar',
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: 'Event Calendar',
            route: '/Admin/it-officer/events/event',
          },
        ],
      },
    ],
  },
  {
    name: 'System management',
    menuItems: [
      {
        icon: <FaChartBar className="text-blue-500" />, // Blue for reports
        label: 'Reports',
        route: '#',
        children: [
          {
            icon: <FaChartBar className="text-blue-500" />, // Blue for system logs
            label: 'System Logs',
            route: '/reports/system-logs',
          },
          {
            icon: <FaDatabase className="text-red-500" />, // Red for backup management
            label: 'Backup Management',
            route: '/Admin/it-officer/backups/backup-management',
          },
          {
            icon: <FaHistory className="text-red-500" />, // Red for audit trail
            label: 'Audit Trail',
            route: '/Admin/it-officer/audit/Index',
          },
        ],
      },
    ],
  },
  
  {
    name: 'Settings',
    menuItems: [
      {
        icon: <FaCog className="text-red-500" />, // Red for system settings
        label: 'System settings',
        route: '#',
        children: [
          {
            icon: <FaUsers className="text-red-500" />, // Red for user management
            label: 'User Management',
            route: '/Admin/settings/Usermanagement/Index',
          },
          {
            icon: <FaKey className="text-red-500" />, // Red for password complexity
            label: 'Password Complexity Parameters',
            route: '/settings/password-complexity',
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
