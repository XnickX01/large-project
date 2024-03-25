"use client"
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import classes from './page.module.css';


export default function AddRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    
    const handleRecipeName = (event) => {
        setRecipeName(event.target.value);
    };
    
    const handleRecipeInstructions = (event) => {
        setRecipeInstructions(event.target.value);
    };
    
    const handleRecipeIngredients = (event) => {
        setRecipeIngredients(event.target.value);
    };
    
    const handleRecipeImage = (event) => {
        setRecipeImage(event.target.value);
    };
    
    const handleAddRecipe = () => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipeName,
            recipeInstructions,
            recipeIngredients,
            recipeImage,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    };
    
    return (
        <div className={classes.background}>
        <main className={classes.main}>
            <div className={classes.container}>
            <Card title='Add Recipe' className={classes.card}>
                <div className={classes.cardContent}>
                <input
                    type="text"
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={handleRecipeName}
                    className={classes.input}
                />
                <textarea
                    placeholder="Recipe Instructions"
                    value={recipeInstructions}
                    onChange={handleRecipeInstructions}
                    className={classes.input}
                />
                <textarea
                    placeholder="Recipe Ingredients"
                    value={recipeIngredients}
                    onChange={handleRecipeIngredients}
                    className={classes.input}
                />
                <input
                    type="text"
                    placeholder="Recipe Image"
                    value={recipeImage}
                    onChange={handleRecipeImage}
                    className={classes.input}
                />
                <button onClick={handleAddRecipe} className={classes.button}>
                    Add Recipe
                </button>
                </div>
            </Card>
            </div>
        </main>
        </div>
    );
    }