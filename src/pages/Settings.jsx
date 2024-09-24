import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io';

function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    // โหลดข้อมูล user จาก localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserId(parsedUser.id);  // เอา userId จาก localStorage มาเก็บ
        } else {
            console.log('ไม่พบข้อมูลผู้ใช้ใน localStorage');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire('Error!', 'New passwords do not match.', 'error');
            return;
        }

        // ตรวจสอบความยาวของรหัสผ่านใหม่ (ขั้นต่ำ 5 ตัวอักษร)
        if (newPassword.length < 5) {
            Swal.fire('Error!', 'Password must be at least 5 characters long.', 'error');
            return;
        }

        try {
            setLoading(true);
            // ดึงข้อมูล user จาก mockAPI
            const { data: user } = await axios.get(`${BASE_URL}/users/${userId}`);

            // เช็คว่า currentPassword ตรงกับ password ในฐานข้อมูลหรือไม่
            if (user.password !== currentPassword) {
                Swal.fire('Error!', 'Current password is incorrect.', 'error');
                return;
            }

            // หาก currentPassword ตรงกัน ให้ทำการอัปเดตรหัสผ่านใหม่
            const response = await axios.put(`${BASE_URL}/users/${userId}`, {
                ...user,
                password: newPassword
            });
            Swal.fire('Success!', 'Password updated successfully.', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating settings:', error);
            Swal.fire('Error!', 'There was an error updating your settings.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default Settings;
