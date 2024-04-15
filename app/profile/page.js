"use client"
import { JsonWebToken } from "jsonwebtoken";
import { useState } from "react";
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card'

export default function Profile() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token')

    //get user by token
     fetch('http://localhost:4000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setUsername(data.username)
        setPassword(data.password)
    })


    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Logging out with username and password:', username
        , password);
        window.location.reload();
        router.push('/');
    }

    return (
        <div className={styles.content}>
            <Card className={styles.card}>
            <h1>{username}</h1>
            <hr />
            <ul>
                <li>
                    <Link href='/community'>Browse Recipies and Meals</Link>
                </li>
                <li>
                    <Link href='/favorite'>Favorites Meals</Link>
                </li>
            </ul>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
            </Card>

            </div>
            
    );
}