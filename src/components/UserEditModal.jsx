import { useState } from "react";
import Swal from "sweetalert2";

export default function UserEditModal({ user, isOpen, onClose, onUpdate }) {
    const [newUser, setNewUser] = useState(user);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const updateUser = async () => {
        if (!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.country || !newUser.gender) {
            Swal.fire('Warning', 'Please fill in all fields.', 'warning');
            return;
        }
        setLoading(true);
        const { id } = JSON.parse(localStorage.getItem('user'));
        try {
            await onUpdate(newUser);
            if (newUser.id === id) {
                localStorage.setItem('user', JSON.stringify(newUser));
            }
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h2 className="text-lg font-bold mb-2">Edit User</h2>
                <p className="text-sm mb-4">Update the user information below:</p>

                {/* First Name Field */}
                <label className="label">
                    <span className="label-text">First Name</span>
                    <span className="label-text-alt text-gray-500 text-xs">Enter the user's first name.</span>
                </label>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={newUser.firstname}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2 w-full"
                />

                {/* Last Name Field */}
                <label className="label">
                    <span className="label-text">Last Name</span>
                    <span className="label-text-alt text-gray-500 text-xs">Enter the user's last name.</span>
                </label>
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={newUser.lastname}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2 w-full"
                />

                {/* Email Field */}
                <label className="label">
                    <span className="label-text">Email</span>
                    <span className="label-text-alt text-gray-500 text-xs">Enter the user's email address.</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2 w-full"
                />

                {/* Country Field */}
                <label className="label">
                    <span className="label-text">Country</span>
                    <span className="label-text-alt text-gray-500 text-xs">Enter the user's country of residence.</span>
                </label>
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={newUser.country}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2 w-full"
                />

                {/* Gender Field */}
                <label className="label">
                    <span className="label-text">Gender</span>
                    <span className="label-text-alt text-gray-500 text-xs">Select the user's gender.</span>
                </label>
                <select
                    name="gender"
                    value={newUser.gender}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <div className="modal-action">
                    <button
                        onClick={updateUser}
                        className={`btn btn-warning ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update User"}
                    </button>
                    <button onClick={onClose} className="btn">Cancel</button>
                </div>
            </div>
        </div>
    );
}
