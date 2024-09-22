import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCog,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaHistory,
  FaBalanceScaleRight,
  FaUndo,
  FaUser,
  FaUsers,
  FaDatabase,
  FaKey,
  FaCalendarAlt,
  FaBuilding,
  FaInfoCircle,
} from "react-icons/fa";

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

export const bursarConstants: MenuGroup[] = [
  {
    name: "General",
    menuItems: [
      {
        icon: <FaHome className="text-blue-500" />, // Blue for home/dashboard
        label: "Dashboard",
        route: "/Admin/dashboard/page",
      },
    ],
  },
  {
    name: "Academic",
    menuItems: [
      {
        icon: <FaUserGraduate className="text-green-500" />, // Green for students
        label: "Students",
        route: "#",
        children: [
          {
            icon: <FaUserGraduate className="text-green-500" />,
            label: "All Students",
            route: "/Admin/students/all/page",
          },
        ],
      },
    ],
  },
  {
    name: "Scheduling",
    menuItems: [
      {
        icon: <FaCalendarAlt className="text-orange-500" />, // Orange for events
        label: "Events",
        route: "#",
        children: [
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: "All Events",
            route: "/events/all",
          },
          {
            icon: <FaCalendarAlt className="text-orange-500" />,
            label: "Event Calendar",
            route: "/events/calendar",
          },
        ],
      },
    ],
  },
  {
    name: "Finance",
    menuItems: [
      {
        icon: <FaMoneyCheckAlt className="text-teal-500" />, // Teal for fees payments
        label: "Payments",
        route: "#",
        children: [
          {
            icon: <FaMoneyCheckAlt className="text-teal-500" />,
            label: "Transactions",
            route: "/Admin/payments/transactions/transaction",
          },
          {
            icon: <FaCreditCard className="text-teal-500" />,
            label: "Payment Methods",
            route: "/Admin/payments/methods",
          },
          {
            icon: <FaFileInvoiceDollar className="text-teal-500" />,
            label: "Invoices",
            route: "/Admin/payments/invoices",
          },
          {
            icon: <FaBalanceScaleRight className="text-teal-500" />,
            label: "Balances",
            route: "/Admin/payments/balances/",
          },
          {
            icon: <FaUndo className="text-teal-500" />,
            label: "Refunds",
            route: "/Admin/payments/refunds",
          },
        ],
      },
    ],
  },
  {
    name: "Settings",
    menuItems: [
      {
        icon: <FaCog className="text-red-500" />, // Red for system settings
        label: "System settings",
        route: "#",
        children: [
          {
            icon: <FaUser className="text-red-500" />, // Red for profile
            label: "Profile",
            route: "/profile",
          },
        ],
      },
    ],
  },
  {
    name: "Help & Support",
    menuItems: [
      {
        icon: <FaInfoCircle className="text-green-500" />, // Green for help and support
        label: "Help & Support",
        route: "#",
        children: [
          {
            icon: <FaInfoCircle className="text-green-500" />, // Green for help documentation
            label: "Help Documentation",
            route: "/help",
          },
          {
            icon: <FaInfoCircle className="text-green-500" />, // Green for contact support
            label: "Contact Support",
            route: "/support",
          },
        ],
      },
    ],
  },
];
