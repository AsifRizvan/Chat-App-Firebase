import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 
import './Register.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'Login Successful!',
      });
      navigate('/chat'); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check the credentials and try again...', 
      });
    } 
  };

  return (
    <div className="container-fluid login-container d-flex align-items-center justify-content-center">
      <div className="login-container d-flex flex-column flex-lg-row">
        <div className="image-section">
          <img
            src="https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif"
            alt="ChatterBox Login"
          />
        </div>
        <div className="form-section">
          <h1 className="text-gold text-center">ChatterBox</h1>
          <h2 className="text-gold text-center mb-4 mt-3">Log In</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-gold fw-bolder w-100 mt-3"><span className='text-gold'>Log In</span></button>
          </form>
          <p className="mt-4 text-center"><span className='text-white'>Don't have an account? </span><a href="/register" className="text-gold">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
