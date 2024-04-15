"use client"
import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ToggleButton } from 'primereact/togglebutton';
        



export default function Favorite() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token')
    const [favoriteMeals, setFavoriteMeals] = useState([])

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

    //get favorite meals by user using post to /favorite and passing username
    fetch('http://localhost:4000/favorite', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
    
       },
       body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
       console.log(data)
         setFavoriteMeals(data)
       
    })





    return (
        <div>
            <h1>Favorite Meals</h1>
            <Card className={styles.card}>
            <h1>{username}</h1>
            <hr />
            <ul>
                {favoriteMeals.map((meal) => (
                    <Card key={meal.id} className={styles.card}>
                    <li >
                        <h2>{meal.name}</h2>
                        <p>{meal.description}</p>
                    </li>
                    </Card>
                ))}
            </ul>
            <Button label='Back' onClick={() => router.push('/')} />
            </Card>


        </div>
    );
}
