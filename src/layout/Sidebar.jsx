import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboard } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Sidebar = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // ดึงข้อมูลจาก localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        } else {
            console.log("ไม่พบข้อมูลผู้ใช้ใน localStorage");
        }
    }, []);

    return (
        <div className="drawer">
            {/* Input Toggle สำหรับควบคุมการเปิด/ปิด drawer */}
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            {/* Sidebar */}
            <div className="drawer-side">
                {/* ปิด Sidebar */}
                <label htmlFor="my-drawer" className="drawer-overlay" aria-label="close sidebar"></label>

                {/* Sidebar Menu */}
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
                    {/* User panel */}
                    <div className="flex items-center p-4 bg-primary text-primary-content rounded-lg">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src={userData.image ||
                                    `https://ui-avatars.com/api/?name=${userData.firstname+' '+userData.lastname}&size=150`}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold">{userData.firstname+' '+userData.lastname}</h4>
                            <p className="text-sm">{userData.email}</p>
                        </div>
                    </div>

                    {/* Sidebar items */}
                    <li className="mt-4">
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
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
