"use client"
import { use, useState } from 'react';
import styles from './page.module.css';
import { Button } from 'primereact/button'
import { ToggleButton } from 'primereact/togglebutton';
import { useEffect } from 'react';
import Link from 'next/navigation';
import { useRouter } from 'next/navigation';



export default function Favorite() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token')
    const [meals, setMeals] = useState([])
    const [favoriteMeals, setFavoriteMeals] = useState([])
    
    
    const router = useRouter();

    //get user by token
    useEffect(() => {
     fetch('http://culinary-canvas-express.com:40/user', {
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
    }, [token])

    //get favorite meals by user using post to /favorite and passing username
    useEffect(() => {
        fetch('http://culinary-canvas-express.com:40/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMeals(data)

                //after getting meal ids, get the meal from the mealdb api
                if (data.length > 0) {
                const mealIds = data.map((meal) => meal.recipeId)
                console.log(mealIds)
                mealIds.forEach((mealId) => {
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.meals[0])
                            setFavoriteMeals((prev) => [...prev, data.meals[0]])
                        })


            })}})
        
        }, [username])


 
        

        return (
        <div className={styles.background}>
            <div className={styles.container}>
                {favoriteMeals.length > 0 && favoriteMeals.map((meal, index) => (
                    <a href={`/meal/${meal.idMeal}`} key={`${meal.idMeal} ${index}`} className={styles.link}>
                        <div  className={styles.card}>
                            <h2 className={styles.header}>{meal.strMeal}</h2>
                            <img src={meal.strMealThumb} alt={meal.strMeal} height={100} width={100}/>
                        </div>
                    </a>
                ))}

                {favoriteMeals.length === 0 && <h2>No favorite meals yet</h2>}
                
            </div>
        </div>
        );
    
}
