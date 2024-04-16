"use client"
// pages/signup.js
import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call your API here
    const response = await fetch('http://culinary-canvas-express.com:40/signup', {
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
        router.push('/login');
      } else {
        alert(`Sign up failed: ${data.error}`);
        setError(true);
      }


    // Clear the form
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div className={[styles.main, styles.background].join(' ')}>
      <form className={styles.box} onSubmit={handleSubmit}>
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
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}