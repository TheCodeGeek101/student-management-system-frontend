import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaClipboardList, FaBook, FaMoneyBillWave, FaCog, FaCalendarAlt , FaUser} from 'react-icons/fa';

export const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <FaTachometerAlt className="fill-current" />,
        label: "Dashboard",
        route: "#",
        children: [{ label: "Overview", route: "/admin/dashboard" }],
      },
      {
        icon: <FaUserGraduate className="fill-current" />,
        label: "Students",
        route: "/students",
        children: [
          { label: "All Students", route: "/Admin/students/all/page" },
          { label: "Add Student", route: "/Admin/students/create/page" },
        ],
      },
      {
        icon: <FaChalkboardTeacher className="fill-current" />,
        label: "Tutors",
        route: "/tutors",
        children: [
          { label: "All Tutors", route: "/Admin/tutors/all/page" },
          { label: "Add Tutor", route: "/Admin/tutors/create/page" },
        ],
      },
      {
        icon: <FaSchool className="fill-current" />,
        label: "Classes",
        route: "/classes",
        children: [
          { label: "All Classes", route: "/classes/all" },
          { label: "Add Class", route: "/classes/create" },
        ],
      },
      {
        icon: <FaClipboardList className="fill-current" />,
        label: "Subjects",
        route: "/subjects",
        children: [
          { label: "All Subjects", route: "/subjects/all" },
          { label: "Add Subject", route: "/subjects/create" },
        ],
      },
      {
        icon: <FaBook className="fill-current" />,
        label: "Courses",
        route: "/courses",
        children: [
          { label: "All Courses", route: "/courses/all" },
          { label: "Add Course", route: "/courses/create" },
        ],
      },
      {
        icon: <FaMoneyBillWave className="fill-current" />,
        label: "Payments",
        route: "/payments",
        children: [
          { label: "All Payments", route: "/payments/all" },
          { label: "Add Payment", route: "/payments/create" },
        ],
      },
      {
        icon: <FaCalendarAlt className="fill-current" />,
        label: "Events",
        route: "/calendar",
        children: [
          { label: "Upcoming events", route: "/calendar" },
          { label: "Schedule event", route: "/event/schedule" },
        ],
      },
      {
        icon: <FaUser className="fill-current" />,
        label: "Profile",
        route: "/profile",
        children: [
          { label: "View", route: "/profile" },
          { label: "Change password", route: "/password/change" },
        ],
      },
      {
        icon: <FaCog className="fill-current" />,
        label: "Settings",
        route: "/settings",
        children: [
          { label: "System settings", route: "/settings" },
          { label: "Add Payment", route: "/payments/create" },
        ],
      },
    ],
  },
];
