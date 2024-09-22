import { Link, useNavigate } from "react-router-dom";

function Navbar({ onToggleSidebar }) { // รับ callback
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('sidebarOpen');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <div className="navbar bg-primary text-primary-content justify-between">
                <div className="flex items-center text-xl">
                    <div className="flex">
                        <button className="btn btn-square btn-ghost" onClick={onToggleSidebar}>
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
                            className="menu menu-sm dropdown-content bg-primary text-primary-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;

// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             // ลบข้อมูลจาก localStorage
//             localStorage.removeItem('user');

//             // เปลี่ยนเส้นทางไปที่หน้า login
//             navigate('/');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <>
//             <div className="navbar bg-primary text-primary-content justify-between">
//                 <div className="flex items-center text-xl">
//                     <div className="flex">
//                         <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 className="inline-block h-5 w-5 stroke-current"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 ></path>
//                             </svg>
//                         </label>
//                     </div>
//                     <div className="flex">
//                         <Link to="/home" className="btn btn-ghost text-xl">
//                             DaisyUI
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-x-5">
//                     <div className="dropdown dropdown-end">
//                         <button className="btn btn-square btn-ghost">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 className="inline-block h-5 w-5 stroke-current"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//                                 ></path>
//                             </svg>
//                         </button>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                             <li><Link to="/profile">Profile</Link></li>
//                             <li><Link to="/settings">Settings</Link></li>
//                             <li><a onClick={handleLogout}>Logout</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Navbar;