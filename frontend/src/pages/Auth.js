import React, { useState } from 'react';


export default function Auth() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  //login user function
  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:5500/login/user', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      alert('Login Successful');
      //this console is here to make sure the data is being fetched correctly (**remove in final product**)
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log(data);


      // Clear form after successful login
      setEmail('');
      setPassword('');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };


  //logout user function
  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logout Successful');
  }


  //create a new user function
  const createUser = async () => {
    try {
      const response = await fetch('http://localhost:5500/create/user', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });


      if (!response.ok) {
        throw new Error('User creation failed');
      }
      alert('User Created Successfully');
      const data = await response.json();
      console.log(data);


      // Clear form after successful user creation
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('User creation error:', error.message);
    }
  };


  //if the user is login in it calls the login function, if not it calls the create user function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      loginUser();
    } else {
      createUser();
    }
  };


  //toggles between login and create user forms
  const toggleForm = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  return (
    <div>
      {isLoggedIn ? <button onClick={logoutUser}>Logout</button> : null}
      <h2>{isLoggedIn ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </>
        )}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isLoggedIn ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLoggedIn ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" onClick={toggleForm}>
          {isLoggedIn ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

