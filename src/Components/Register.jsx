import React, { useState } from 'react';
import './Register.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }
    try {
      const validate = await createUserWithEmailAndPassword(auth, email, password);
      if (validate) {
        Swal.fire({
          icon: 'success',
          title: 'Registered!',
          text: 'User registered successfully!',
        }).then(() => {
          navigate('/'); 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User already exists!',
      });
    }
  };

  return (
    <div className="container-fluid register-container d-flex align-items-center justify-content-center">
      <div className="registration-container">
        <div className="image-section">
          <img
            src="https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif"
            alt="ChatterBox Registration"
          />
        </div>
        <div className="form-section">
          <h1 className="text-gold text-center">ChatterBox</h1>
          <h2 className="text-gold text-center mb-4 mt-3">Create an Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-gold">Email</label>
              <input
                type="email"
                className="form-control input-field"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-gold">Password</label>
              <input
                type="password"
                className="form-control input-field"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-gold">Confirm Password</label>
              <input
                type="password"
                className="form-control input-field"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-gold fw-bolder w-100 mt-3"><span className='text-gold'>Register</span></button>
          </form>
          <p className="mt-4 text-center"><span className='text-white'>Already have an account? </span><a href="/" className="text-gold">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
