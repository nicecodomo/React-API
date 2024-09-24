import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboard } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Sidebar = ({ isOpen }) => { // รับ prop isOpen
    const [userData, setUserData] = useState({});

    // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก localStorage
    const loadUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        } else {
            console.log("ไม่พบข้อมูลผู้ใช้ใน localStorage");
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    // ติดตามการเปลี่ยนแปลงของ localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            loadUserData();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className={`transition-all duration-300 bg-base-200 ${isOpen ? `w-64` : 'w-20'} min-h-full`}>
            <ul className="menu space-y-2">
                {isOpen && (
                    <div className="flex items-center p-4 bg-primary text-primary-content rounded-lg">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src={userData.image ||
                                    `https://ui-avatars.com/api/?name=${userData.firstname + ' ' + userData.lastname}&size=150`}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold">{userData.firstname + ' ' + userData.lastname}</h4>
                            <p className="text-sm">{userData.email}</p>
                        </div>
                    </div>
                )}
                {!isOpen && (
                    <div className="flex items-center justify-center p-2 bg-primary text-primary-content rounded-lg">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src={userData.image ||
                                    `https://ui-avatars.com/api/?name=${userData.firstname + ' ' + userData.lastname}&size=150`}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <li>
                    <Link to="/home" className="flex items-center">
                        <MdOutlineDashboard className='h-6 w-6 mr-2' />
                        {isOpen && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="flex items-center">
                        <MdAccountCircle className='h-6 w-6 mr-2' />
                        {isOpen && <span>Profile</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="flex items-center">
                        <IoIosSettings className='h-6 w-6 mr-2' />
                        {isOpen && <span>Settings</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;