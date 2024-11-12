// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SignUpPage.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     orderNumber: '',
//     lastName: '',
//     firstName: '',
//     birthDate: '',
//     birthPlace: '',
//     neighborhood: '',
//     nationality: '',
//     idCard: '',
//     phoneId1: '',
//     phoneNumber1: '',
//     phoneId2: '',
//     phoneNumber2: '',
//     gender: '',
//     email: '',
//     specialty: '',
//     profilePhoto: null,
//   });

//   const navigate = useNavigate(); // For navigation back to login page

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Doctor Sign Up Data:', formData);

//     // Handle Sign-Up logic (send data to the backend)
//     navigate('/login');
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <div className="form-container">
//           <img src="pdmd.png" alt="App Logo" className="app-logo" />
//           <h2>Register as a Doctor</h2>

//           <form onSubmit={handleSubmit} className="signup-form">
//             {/* Order Number */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Order Number"
//                 name="orderNumber"
//                 value={formData.orderNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Last Name */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Last Name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* First Name */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="First Name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Birth Date */}
//             <div className="input-group mb-3">
//               <input
//                 type="date"
//                 className="form-control rounded-input"
//                 // name="birthDate"
//                 value={formData.birthDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Birth Place */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Birth Place"
//                 name="birthPlace"
//                 value={formData.birthPlace}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Neighborhood */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Neighborhood"
//                 name="neighborhood"
//                 value={formData.neighborhood}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Nationality */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Nationality"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* ID Card/Passport */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="ID Card/Passport"
//                 name="idCard"
//                 value={formData.idCard}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Phone Number 1 with ID */}
//             <div className="phone-number-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Phone ID 1"
//                 name="phoneId1"
//                 value={formData.phoneId1}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Phone Number 1"
//                 name="phoneNumber1"
//                 value={formData.phoneNumber1}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Phone Number 2 with ID */}
//             <div className="phone-number-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Phone ID 2"
//                 name="phoneId2"
//                 value={formData.phoneId2}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Phone Number 2"
//                 name="phoneNumber2"
//                 value={formData.phoneNumber2}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Gender */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="input-group mb-3">
//               <input
//                 type="email"
//                 className="form-control rounded-input"
//                 placeholder="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Specialty */}
//             <div className="input-group mb-3">
//               <input
//                 type="text"
//                 className="form-control rounded-input"
//                 placeholder="Specialty"
//                 name="specialty"
//                 value={formData.specialty}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Profile Photo */}
//             <div className="input-group mb-3">
//               <input
//                 type="file"
//                 className="form-control rounded-input"
//                 name="profilePhoto"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="options d-flex justify-content-between align-items-center">
//               <button type="submit" className="submit-button">Register</button>
//               <button type="button" className="submit-button" onClick={() => navigate('/')}>Cancel</button>
//             </div>
//           </form>

//           <div className="login-text">
//             <p>
//               Already have an account? <span className="login-link" onClick={() => navigate('/')}>Login</span>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
