"use client"
// pages/signup.js
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation'

export default function SignUp({onShowLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmNum, setConfirmNum] = useState('');
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 7 || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        setPasswordIsValid(false);
    } else {
        setPasswordIsValid(true);
    }
};




  const submitConfirm = async () => {
    const response = await fetch('http://culinary-canvas-express.com:80/confirmation-number', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, numberEntered: confirmNum }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        setError(false);
        setUsername('');
        setPassword('');
        setEmail('');
        window.location.reload();
        router.push('/login');
      } else {
        alert(`Sign up failed: ${data.error}`);
        setError(true);
      }

  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call your API here
    const response = await fetch('http://culinary-canvas-express.com:80/signup', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        setError(false);
        setShowConfirm(true);
      } else {
        console.log(data);
        alert(`Sign up failed: ${data}`);
        setError(true);
      }


    // Clear the form

  };

  return (
    <div className={[styles.main, styles.background].join(' ')}>
     {!showConfirm ? <form className={styles.box} onSubmit={handleSubmit}>
        <h1>
          Sign Up
        </h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {!passwordIsValid && <p>Password must be at least 7 characters long and contain at least one special character.</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <button type="button" onClick={onShowLogin}>Login</button>
      </form>
      : 
  
      <div className={styles.confirm}>
      <h1>Thank you for signing up!</h1>
      <p>Please confirm Via Email</p>

      <input value={confirmNum} type='number' min={0} max={99} onChange={(e)=>setConfirmNum(e.target.value)} />
      <button onClick={submitConfirm}>Submit</button>
      </div>
      }

    </div>
  );
}