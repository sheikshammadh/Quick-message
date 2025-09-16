import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { em } from 'framer-motion/client';

const LoginPage = () => {
  const [currtState, setCurrState] = useState("Signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currtState === 'Signup' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currtState === "Signup" ? "signup" : "login", { fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen big-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      
      {/* Left */}
      <img 
        onClick={() => setIsDataSubmitted(false)} 
        src={assets.logo_big} 
        alt="" 
        className="w-[min(30vw,250px)]" 
      />

      {/* Right */}
      <form 
        onSubmit={onSubmitHandler} 
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currtState}
          {isDataSubmitted &&
            <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />}
        </h2>

        {!isDataSubmitted && (
          <>
            {currtState === "Signup" && (
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currtState === "Signup" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currtState === "Signup" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currtState === 'Signup' ? (
            <p className='text-sm text-gray-600'>
              Already have an account? 
              <span 
                onClick={() => {
                  setCurrState('Login');
                  setIsDataSubmitted(false); // ✅ FIXED
                }} 
                className='font-medium text-violet-500 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account 
              <span
                onClick={() => {
                  setCurrState('Signup'); // switch to Signup
                  setIsDataSubmitted(false); // ✅ FIXED
                }} 
                className='font-medium text-violet-500 cursor-pointer'
              >
                Signup here
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
