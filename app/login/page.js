"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link'
import classes from './page.module.css';
import { useRouter } from 'next/navigation'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'


function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };



        const handleLogin = () => {
            // Perform login logic here
            fetch('http://culinary-canvas-express.com:40/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message, data.token);
                    // Handle the response data here
                    if (data.message === 'Yay you\'re logged in!') {
                        console.log('Logging in with username and password:', username, password);
                        onLogin(username, password);
                        console.log('Logging in with username and password:', username, password);
                        //set jwt token in local storage
                        localStorage.setItem('token', data.token);
                        setLocalStorage('token', data.token);
                        console.log('Logging in with username and password:', username, password);
                        router.push('/');

                    } else {
                        console.alert("User doesn't exist")
                    }
                   
                })
                .catch(error => {
                    // Handle any errors here
                    console.error('Error:', error);
                });
        };
    
    


    return (
        <main className={[classes.main, classes.background].join(' ')}> 

        <div className={classes.container}>
            <div className={classes.box}>
                <h1>Login</h1>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button onClick={handleLogin} disabled={!username || !password} className={username || password ? '' : classes.disabled}>Login</button>
                <br />
                <Link href="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
        </main>
    );
}

export default LoginPage;