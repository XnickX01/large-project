"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import {Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Fieldset } from 'primereact/fieldset';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { JsonWebToken } from 'jsonwebtoken';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

export default function MealPage() {
    
    const router = useRouter()
    const { meal } = router.query
    const [meals, setMeals] = useState([])
    const [checked, setChecked] = useState()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const token = getLocalStorage('token')

    //get user by token
    useEffect(() => {
        if(token){
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
        }
    }, [token])


    useEffect(() => {
        async function fetchFollowStatus(){
            try{
        fetch('http://culinary-canvas-express.com:40/is-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, recipeId: meals[0]?.idMeal }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.isFavorite);
                setChecked(data.isFavorite);
            });
        }catch(e){
            console.log(e)
        }
        }
        fetchFollowStatus()
    }, [meals, username ]); // removed checked from the dependency array
    


    //get meal from slug using mealId
    useEffect(() => {
        if (router.isReady) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setMeals(data.meals)
                })
        }
    }, [meal, setMeals, router.isReady])

    const handleOnChange = (e) => {
        console.log('handleOnChange')
        setChecked(!checked)
        // if(checked === false){
        //     setChecked(true)
        //     fetch('http://culinary-canvas-express.com:40/favorite-recipe', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ username, recipeId: meals[0].idMeal }),
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        // } else {
        //     console.log('unchecked')
        //     setChecked(false)
        //     fetch('http://culinary-canvas-express.com:40/unfavorite', {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ username, recipeId: meal }),
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        // }
    }

    useEffect((e)=>{
        if(checked){
            fetch('http://culinary-canvas-express.com:40/favorite-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, recipeId: meals[0]?.idMeal }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        }else{
            console.log('unchecked')
            fetch('http://culinary-canvas-express.com:40/unfavorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, recipeId: meals[0]?.idMeal }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        }
    }, [checked, username, meals])

    return (
        <>
            <Header />
            <br />
            <Card title='Meal Details' className={styles.card}>
                <ToggleButton onLabel="Following" offLabel="Follow" onIcon="pi pi-heart" onClick={handleOnChange} offIcon="pi pi-times" checked={checked} className="w-9rem" />                
                <div className={styles.mealPage}>
                    {meals && meals.map(meal => (
                        <div key={meal.idMeal} className="meal">
                            <h2 className={styles.mealTitle}>{meal.strMeal}</h2>
                            <Image src={meal.strMealThumb} alt={meal.strMeal} height={200} width={200} className={styles.mealImage} />
                            <p className={styles.mealCategory}><strong>Category:</strong> {meal.strCategory}</p>
                            <p className={styles.mealArea}><strong>Area:</strong> {meal.strArea}</p>
                            <p className={styles.mealInstructions}><strong>Instructions:</strong> {meals && meals.map(meal => (
                                <div key={meal.idMeal} className="meal">
                                    {meal.strInstructions.split('STEP').map((step, index) => (
                                        <span key={index}>{step}</span>
                                    ))}
                                </div>
                            ))}</p>
                            <p className={styles.mealIngredientsTitle}><strong>Ingredients:</strong></p>
                            <ul className={styles.mealIngredients}>
                                {Object.keys(meal).filter(key => key.startsWith('strIngredient') && meal[key]).map((key, index) => (
                                    <li key={index} className={styles.mealIngredient}>{meal[key]},</li>
                                ))}
                            </ul>
                            <p className={styles.mealMeasuresTitle}><strong>Measures:</strong></p>
                            <ul className={styles.mealMeasures}>
                                {Object.keys(meal).filter(key => key.startsWith('strMeasure') && meal[key] && meal[key].trim() !== '').map((key, index) => (
                                    <li key={index} className={styles.mealMeasure}>{meal[key]}</li>
                                ))}
                            </ul>

                            {meal.strYoutube && (
                                <div className={styles.videoWrapper}>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            
                        </div>
                    ))}
                </div>
            </Card>
            <br />
            <Footer />
        </>
    );
    
}
