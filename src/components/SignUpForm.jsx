import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountPinCircleFill } from "react-icons/ri";
import Loading from "./Loading";

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io';

export default function SignUpForm() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled =  isSubmitting || email === "" || password.length < 5 || firstname === "" || lastname === "";

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true); // ปิดปุ่มทันทีหลังจากกด

        const newEmail = email;

        try {
            setIsLoading(true);
            const { data: users } = await axios.get(`${BASE_URL}/users`);

            // ตรวจสอบว่ามี email ซ้ำกันหรือไม่
            const isEmailTaken = users.some(user => user.email === newEmail);

            if (isEmailTaken) {
                setIsSubmitting(false); // เปิดปุ่มอีกครั้งถ้า email ซ้ำกัน
                setIsLoading(false);
                Swal.fire({
                    title: 'Email Already Exists',
                    text: 'This email is already registered.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                await axios.post(`${BASE_URL}/users`, { firstname, lastname, email: newEmail, password });
                setIsLoading(false);
                Swal.fire({
                    title: 'Signup Successful',
                    text: 'You can now login with your credentials.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setIsSubmitting(false); // เปิดปุ่มอีกครั้งถ้าเกิดข้อผิดพลาด
            setIsLoading(false);
            Swal.fire({
                title: 'Signup Failed',
                text: 'An error occurred while signing up. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="flex flex-col text-center mx-auto mb-6">
                    <div className="mx-auto">
                        <RiAccountPinCircleFill fill="#0EA5E9" size="8em" />
                    </div>
                    <div className="text-3xl font-bold">Create an Account</div>
                </div>
                <div className="form-control gap-3">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        className="input input-bordered w-full rounded-lg"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        className="input input-bordered w-full rounded-lg"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="input input-bordered w-full rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password (min. 5 characters)"
                        className="input input-bordered w-full rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-md btn-info text-white font-bold mt-4"
                        disabled={isDisabled}
                    >
                        Next
                    </button>
                </div>
                <div className="form-control mt-3 text-center">
                    <Link to="/" className="btn btn-outline btn-info font-bold mt-2">
                        Go to Home
                    </Link>
                </div>
                <hr className="mt-10" />
                <p className="text-xs text-gray-600 text-center">
                    Copyright © {new Date().getFullYear()} - All right reserved by Watcharapong
                </p>
            </form>
        </div>
    );
}
