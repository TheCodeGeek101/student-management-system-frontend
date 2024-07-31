import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import ClickOutside from "@/components/ClickOutside";
import ClickOutside from "../ClickOutside";
import placeholder from "../../../public/images/placeholder.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from '../../../types/user'; // Import User type from the correct file


  interface DropDownUserLayoutProps {
    user: User;
  }
  

  const DropdownUser: React.FC<DropDownUserLayoutProps> = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    // Extract the user information based on the type
    let displayName = 'User';
    let role ='';
    if ('student' in user) {
      displayName = user.student.first_name + ' ' + user.student.last_name;
      role = user.student.role;
    } else if ('tutor' in user) {
      displayName = user.tutor.first_name + ' ' + user.tutor.last_name;
      role = user.tutor.role;
    } else if ('admin' in user) {
      displayName = user.admin.full_name;
      role = user.admin.position;
    }
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/logout');
      if (response.status === 200) {
        // toast.success(response.data.message);
        setTimeout(() => {
          router.push('/');
        }, 1500); // Delay navigation by 2000 milliseconds (2 seconds)
      } else {
        toast.error('failed to sign out user');
      }
    } catch (error:any) {
      console.error('error logging out user:' + error);
      toast.error(error.response?.status);
    } finally {
      setLoading(false);
    }
  };
  
    return (
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {displayName}
            </span>
            <span className="block text-xs">{role}</span>
          </span>
  
          <span className="h-12 w-12 rounded-full">
            <Image
              width={80}
              height={80}
              src={placeholder}
              style={{
                width: "auto",
                height: "auto",
              }}
              alt="User"
            />
          </span>
  
          <svg
            className="hidden fill-current sm:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>
        </Link>
  
        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                      fill=""
                    />
                    <path
                      d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                      fill=""
                    />
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V15.0625H16.9469V18.5625ZM16.9469 12.4531H6.77185V11.0687H16.9469V12.4531ZM16.9469 5.70624H6.77185V4.28074H15.6406C16.3625 4.28074 16.9469 4.83074 16.9469 5.70624V5.70624ZM15.675 2.64999H7.42498V3.84874H15.675C16.3625 3.84874 16.9469 4.41562 16.9469 5.70624V5.70624H15.675V2.64999Z"
                      fill=""
                    />
                  </svg>
                  My Settings
                </Link>
              </li>
            </ul>
            <div className="flex w-full flex-col px-6 pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5  p-2 hover:text-primary text-sm font-medium text-black dark:text-white"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6719 7.99688C16.3444 7.99688 16.0469 8.29437 16.0469 8.62188C16.0469 8.94937 16.3444 9.24688 16.6719 9.24688H17.0938C17.4213 9.24688 17.7188 8.94937 17.7188 8.62188V7.99688C17.7188 7.66937 17.4213 7.37188 17.0938 7.37188H16.6719ZM18.7812 7.99688C18.7812 6.1475 17.1508 4.59375 15.2469 4.59375H6.7531C4.8492 4.59375 3.21875 6.1475 3.21875 7.99688V10.0031C3.21875 11.8525 4.8492 13.4063 6.7531 13.4063H15.2469C17.1508 13.4063 18.7812 11.8525 18.7812 10.0031V7.99688Z"
                    fill=""
                  />
                </svg>
                {loading ? 'Sigining out...' : 'Sign out'}
              </button>
            </div>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </ClickOutside>
    );
  };
  
export default DropdownUser;
