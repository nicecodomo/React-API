import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountPinCircleFill } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "./Loading";

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io';

export default function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = isSubmitting || email === "" || password.length < 5;

    async function handleLogin(event) {
        event.preventDefault();

        setIsSubmitting(true);
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${BASE_URL}/users`, { email: email, password: password , withCredentials: false });
            const user = data.find((u) => u.email === email && u.password === password);
            if (user) {
                // เก็บข้อมูลผู้ใช้ใน Local Storage (ไม่รวมรหัสผ่าน)
                const { password, ...userWithoutPassword } = user;
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                setIsSubmitting(false);
                setIsLoading(false);
                Swal.fire({
                    title: 'Login Successful',
                    text: `Welcome back, ${user.firstname}!`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/home')
                })
            } else {
                setIsSubmitting(false);
                setIsLoading(false);
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid email or password',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        } catch (error) {
            setIsLoading(false);
            setIsSubmitting(false);
            console.error('Error logging in:', error);
            if (error.response?.status === 404) {
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid email or password',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while logging in. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <form className="card-body" onSubmit={handleLogin} method="POST">
                <div className="flex flex-col text-center mx-auto mb-6">
                    <div className="mx-auto">
                        <RiAccountPinCircleFill fill="#0EA5E9" size="8em" />
                    </div>
                    <div className="text-3xl font-bold">
                        Login
                    </div>
                </div>
                <div className="form-control gap-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail address"
                        className="input input-bordered w-full rounded-lg"
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full rounded-lg"
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                        required
                    />

                    <button
                        type="submit"
                        className={"btn btn-md btn-info text-white font-bold mt-4"}
                        disabled={isDisabled}
                    >
                        Login
                    </button>
                </div>

                <div className="form-control mt-3 text-center">
                    <span className="text-sm">Don't have an account?</span>
                    <Link to="/signup" className="btn btn-outline btn-info font-bold mt-2">
                        Create an account
                    </Link>
                </div>

                <hr className="mt-10" />
                <p className="text-xs text-gray-600 text-center">
                    Copyright © {new Date().getFullYear()} - All right reserved by Watcharapong
                </p>
            </form>
        </div>
    )
}
