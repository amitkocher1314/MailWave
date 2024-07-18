import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmaeQ6QdfLAaUSs_A4xXwGlNdsq5oPrsI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log(data); // Handle success response
      alert(`Account created successfully you can now login`)
    } catch (error) {
     alert(error); // Handle error
    }
    setConfirmPassword('');
    setEmail('');
    setPassword('')
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="rounded-3xl bg-white w-11/12 m-auto px-5 sm:px-10 py-10 sm:w-[50rem] flex flex-col gap-8 sm:flex-row justify-between relative top-10 sm:top-20 drop-shadow-md">
        <div>
          <img className="w-10 mb-4" src="https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_640.png" alt="mail icon" />
          <h1 className="font-normal text-3xl">Create a Mail wave Account</h1>
          <h3 className="mt-4">Enter email and password</h3>
        </div>
        <div className="mt-3 sm:w-80">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-semibold text-sm text-gray-800 mb-1" htmlFor="email">Email</label>
              <input
                className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-blue-700"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-sm text-gray-800 mb-1" htmlFor="password">Password</label>
              <input
                className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-blue-700"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-sm text-gray-800 mb-1" htmlFor="confirm-password">Confirm Password</label>
              <input
                className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-blue-700"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <button className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-blue-700 focus:outline-offset-2" type="submit">Sign up</button>
            </div>
          </form>
          <div className="text-center text-sm">
            <p className="inline-block">Already have an account?</p>
            <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
