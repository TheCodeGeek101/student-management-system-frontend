import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon?: JSX.Element;
  label: string;
  route: string;
  children?: MenuItem[];
}

interface SidebarDropdownProps {
  items: MenuItem[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ items = [] }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.route}
            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-blue-800 ${
              pathname === item.route ? "text-blue-400" : "text-gray-600"
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
