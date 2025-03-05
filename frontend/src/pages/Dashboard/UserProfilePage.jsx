import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import profile from '../../assets/profile.png';
import { updateUser } from '../../services/UserService';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { getBookingByUser } from '../../services/BookingService';
import { act } from 'react-dom/test-utils';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
};

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { setUser } = useOutletContext();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('user_details')));
    const [originalData, setOriginalData] = useState({ ...userData });
    const [activeTab, setActiveTab] = useState('personalDetails');
    const [bookings, setBookings] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(false);
        setOriginalData({ ...userData });
        // console.log(userData);

        try {
            let res = await updateUser(userData.id, userData);
            // console.log(res);
            toast.success(res.data.message);
            sessionStorage.setItem("user_details", JSON.stringify(userData));
        } catch (error) {
            // console.log(error);       
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUserData({ ...originalData });
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user_details');
        setUser(null);
        // console.log(sessionStorage.getItem('user_details'));
        toast.success("User Logout Successfully!!");
        navigate('/');
    }

    const loadAllBooking = async () => {
        let res = await getBookingByUser(userData.id);
        console.log(res);

        setBookings(res.data);
    }

    useEffect(() => {
        loadAllBooking();
    }, [activeTab]);

    return (
        <div className="container py-5">
            <div className="bg-light p-4 mb-3 d-flex align-items-center">
                <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle mb-0"
                    style={{ width: '100px', height: '100px', backgroundColor: '#fdd835' }}
                />
                <div className="ms-3">
                    <h4 className="fw-bold">{originalData.name}</h4>
                    <p className="mb-0">{originalData.email}</p>
                    <p className='mb-0'>{originalData.phone}</p>
                </div>
            </div>

            <div className="row align-items-start flex-grow-1 h-100">
                <div className="col-lg-3 col-md-4 bg-light p-4 h-100 rounded">
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a
                                href="#"
                                className={`nav-link ${activeTab === 'personalDetails' ? 'active text-dark bg-warning' : 'text-dark'}`}
                                onClick={() => handleTabClick('personalDetails')}
                            >
                                <i className="bi bi-person me-2"></i>Personal Details
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a
                                href="#"
                                className={`nav-link ${activeTab === 'myBookings' ? 'active text-dark bg-warning' : 'text-dark'}`}
                                onClick={() => handleTabClick('myBookings')}
                            >
                                <i className="bi bi-calendar4-week me-2"></i>My Bookings
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link text-dark">
                                <i className="bi bi-bell me-2"></i>Movie Alerts
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link text-dark">
                                <i className="bi bi-gear me-2"></i>Preferences
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link text-dark">
                                <i className="bi bi-credit-card me-2"></i>Saved Cards
                            </a>
                        </li>
                        <li className="nav-item mb-3">
                            <a href="#" className="nav-link text-dark">
                                <i className="bi bi-wallet me-2"></i>Gift Card Balance
                            </a>
                        </li>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </ul>

                </div>

                <div className="col-lg-9 col-md-8">
                    {activeTab === 'personalDetails' ? (
                        <div className='shadow-sm p-4'>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold">Contact Information</h2>

                                {!isEditing && (
                                    <button className="btn btn-link text-decoration-none" onClick={toggleEdit}>
                                        Edit Details
                                    </button>
                                )}
                            </div>

                            {!isEditing ? (
                                <div className="bg-white rounded">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Full Name</strong>
                                            <p>{originalData.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <strong>Email</strong>
                                            <p>{originalData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Phone</strong>
                                            <p>{originalData.phone}</p>
                                        </div>
                                        <div className="col-6">
                                            <strong>Gender</strong>
                                            <p>{originalData.gender}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Marital Status</strong>
                                            <p>{originalData.maritalStatus}</p>
                                        </div>
                                        <div className="col-6">
                                            <strong>Date of Birth</strong>
                                            <p>{formatDate(originalData.dob)}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                                    <div className="row gy-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={userData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={userData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row gy-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={userData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Gender</label>
                                            <select
                                                name="gender"
                                                className="form-select"
                                                value={userData.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="FEMALE">Female</option>
                                                <option value="MALE">Male</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row gy-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Marital Status</label>
                                            <select
                                                name="maritalStatus"
                                                className="form-select"
                                                value={userData.maritalStatus}
                                                onChange={handleInputChange}
                                            >
                                                <option value="UNMARRIED">Unmarried</option>
                                                <option value="MARRIED">Married</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                className="form-control"
                                                value={userData.dob}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-warning">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ) : activeTab === 'myBookings' ? (
                        <div className="bg-white p-4 rounded shadow-sm">
                            {
                                bookings.length===0 ?
                                    <>
                                        <h4>No Booking Available</h4>
                                        <p>Movie bookings & food orders will appear here</p>
                                        <NavLink to='/movies' className="btn btn-warning">Book</NavLink>
                                    </> :
                                    <>
                                        <h3 className='fw-bold mb-4'>All Bookings</h3>
                                        <table className="table table-bordered table-hovered table-striped text-center">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Movie</th>
                                                    <th>Date</th>
                                                    <th>No. Of Seat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td>{booking.bookingDate}</td>
                                                        <td>{booking.showtime.movie.title}</td>
                                                        <td>{booking.showtime.theater.name}</td>
                                                        <td>{booking.noOfSeat}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                            }
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;