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

    const checkAuth = () => {
        // ตรวจสอบการรับรองความถูกต้องจาก localStorage
        const user = localStorage.getItem('user');
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

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <div className='drawer'>
                    <div className="drawer-content p-4">
                        {/* Main Content */}
                        <Outlet />
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
