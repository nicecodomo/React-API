import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UserEditModal from '../components/UserEditModal';
import Loading from '../components/Loading';

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io/users';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(''); // state สำหรับผู้ใช้ที่กำลังถูกแก้ไข
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false); // state สำหรับเปิด/ปิด modal

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(BASE_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const addUser = async () => {
        if (!selectedUser.firstname || !selectedUser.lastname || !selectedUser.email || !selectedUser.country || !selectedUser.gender) {
            Swal.fire('Warning', 'Please fill in all fields.', 'warning');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(BASE_URL, selectedUser);
            setUsers([...users, response.data]);
            Swal.fire('Success', 'User added successfully', 'success');
            resetForm();
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (confirmed.isConfirmed) {
            setLoading(true);
            try {
                await axios.delete(`${BASE_URL}/${id}`);
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting user:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user); // ตั้งค่าผู้ใช้ที่เลือกสำหรับการแก้ไข
        setEditing(true); // เปิด modal
    };

    const updateUser = async (updatedUser) => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/${updatedUser.id}`, updatedUser);
            const updatedUsers = users.map(user => (user.id === response.data.id ? response.data : user));
            setUsers(updatedUsers);
            Swal.fire('Updated!', 'User information has been updated.', 'success');
            resetForm();
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedUser(null); // ล้างข้อมูลผู้ใช้ที่ถูกเลือก
        setEditing(false); // ปิด modal
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={selectedUser?.firstname || ""}
                    onChange={handleInputChange}
                    className="input input-bordered mr-2"
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={selectedUser?.lastname || ""}
                    onChange={handleInputChange}
                    className="input input-bordered mr-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={selectedUser?.email || ""}
                    onChange={handleInputChange}
                    className="input input-bordered mr-2"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={selectedUser?.country || ""}
                    onChange={handleInputChange}
                    className="input input-bordered mr-2"
                />
                <select
                    name="gender"
                    value={selectedUser?.gender || ""}
                    onChange={handleInputChange}
                    className="input input-bordered mr-2"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button onClick={addUser} className="btn btn-info">Add User</button>
            </div>

            <div className='overflow-x-auto'>
                <table className="table w-full table-zebra border">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.country}</td>
                                <td>{user.gender}</td>
                                <td className='flex'>
                                    <button onClick={() => openEditModal(user)} className="btn btn-warning mr-2">Edit</button>
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ใช้ UserEditModal ที่นำเข้ามา */}
            {selectedUser && (
                <UserEditModal
                    user={selectedUser}
                    isOpen={editing}
                    onClose={resetForm}
                    onUpdate={updateUser}
                />
            )}

            {loading && <Loading />}
        </div>
    );
}
