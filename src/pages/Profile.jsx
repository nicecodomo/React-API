import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io';

function Profile() {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        gender: ''
    });

    const loadUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
            setFormData({
                firstname: parsedUser.firstname || '',
                lastname: parsedUser.lastname || '',
                email: parsedUser.email || '',
                country: parsedUser.country || '',
                gender: parsedUser.gender || ''
            });
        } else {
            console.log("ไม่พบข้อมูลผู้ใช้ใน localStorage");
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        loadUserData(); // รีเซ็ตข้อมูลกลับเป็นข้อมูลเดิม
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/users/${userData.id}`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                country: formData.country,
                gender: formData.gender
            });

            // Update local state and localStorage
            const updatedUser = {
                ...userData,
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                country: formData.country,
                gender: formData.gender
            };
            setUserData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setIsEditing(false);
            Swal.fire('Saved!', 'Your profile has been updated.', 'success');
        } catch (error) {
            console.error('Error saving user profile:', error);
            Swal.fire('Error', 'An error occurred while saving your profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
            <div className="card w-full lg:w-1/2 mx-auto bg-base-100 shadow-2xl">
                <div className="card-body">
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Firstname</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstname"
                                className="input input-bordered w-full"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.firstname}</p>
                        )}
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Lastname</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastname"
                                className="input input-bordered w-full"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.lastname}</p>
                        )}
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.email}</p>
                        )}
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Country</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="country"
                                className="input input-bordered w-full"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.country}</p>
                        )}
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Gender</span>
                        </label>
                        {isEditing ? (
                            <select
                                name="gender"
                                className="input input-bordered w-full"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            <p className="text-xl font-semibold">{userData.gender}</p>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        {isEditing ? (
                            <div className="flex space-x-2 justify-center">
                                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : 'Save'}
                                </button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <button className="btn btn-outline btn-primary" onClick={handleEdit}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
