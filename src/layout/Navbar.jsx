import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdAccountCircle, MdOutlineDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

function Navbar({ onToggleSidebar }) { // รับ callback
    const navigate = useNavigate();
    const [isContentVisible, setIsContentVisible] = useState(false);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('sidebarOpen');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    return (
        <>
            <div className="navbar bg-primary text-primary-content justify-between">
                <div className="flex items-center text-xl">
                    <div className="flex">
                        {/* Hamburger button ที่เปลี่ยนการทำงานตามขนาดหน้าจอ */}
                        <button
                            className="btn btn-square btn-ghost lg:hidden"
                            onClick={toggleContentVisibility}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                        {/* Button สำหรับหน้าจอขนาดใหญ่กว่า lg */}
                        <button
                            className="btn btn-square btn-ghost hidden lg:block"
                            onClick={onToggleSidebar}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex">
                        <Link to="/home" className="btn btn-ghost text-xl">
                            DaisyUI
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-x-5">
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-primary text-primary-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Content ที่จะแสดงเป็น dropdown สำหรับหน้าจอเล็ก */}

            <div className=
                {
                    `lg:hidden transition-all duration-500 ease-in-out overflow-hidden
                    ${isContentVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`
                }
            >
                <div className="menu bg-base-200 p-4">
                    <li>
                        <Link to="/home" className="flex items-center">
                            <MdOutlineDashboard className='h-6 w-6 mr-2' />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="flex items-center">
                            <MdAccountCircle className='h-6 w-6 mr-2' />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="flex items-center">
                            <IoIosSettings className='h-6 w-6 mr-2' />
                            <span>Settings</span>
                        </Link>
                    </li>
                </div>
            </div>
        </>
    );
}

export default Navbar;
