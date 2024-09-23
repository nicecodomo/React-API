// import { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Loading from "../components/Loading";

// const Layout = () => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [sidebarOpen, setSidebarOpen] = useState(() => {
//         // ดึงค่าจาก localStorage ถ้ามี
//         const savedState = localStorage.getItem('sidebarOpen');
//         return savedState ? JSON.parse(savedState) : true; // ถ้าไม่มีค่าก็ให้ค่าเริ่มต้นเป็น true
//     });

//     const checkAuth = () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setIsAuthenticated(true);
//         } else {
//             Swal.fire({
//                 title: 'Authentication Failed',
//                 text: 'Please login to continue.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 navigate('/');
//             });
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         checkAuth();
//     }, [navigate]);

//     useEffect(() => {
//         localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
//     }, [sidebarOpen]);

//     if (loading) {
//         return <Loading />
//     }

//     return (
//         <div className="flex flex-col min-h-screen lg:flex-row md:flex-row sm:flex-col">
//             <div className='hidden lg:block'>
//                 <Sidebar isOpen={sidebarOpen} />
//             </div>
//             <div className="flex flex-col flex-1 overflow-x-auto">
//                 <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> {/* ส่ง props */}
//                 <div className="flex-1 p-4">
//                     <Outlet />
//                 </div>
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default Layout;

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loading from "../components/Loading";

const Layout = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const savedState = localStorage.getItem('sidebarOpen');
        return savedState ? JSON.parse(savedState) : true;
    });

    const checkAuth = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsAuthenticated(true);
        } else {
            Swal.fire({
                title: 'Authentication Failed',
                text: 'Please login to continue.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col min-h-screen lg:flex-row md:flex-col sm:flex-col">
            {/* Sidebar สำหรับหน้าจอใหญ่ */}
            <div className='hidden lg:block'>
                <Sidebar isOpen={sidebarOpen} />
            </div>
            <div className="flex flex-col flex-1 overflow-x-auto">
                <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
