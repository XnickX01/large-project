"use client"
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DataGrid, GridColDef, Toolbar } from '@mui/x-data-grid';
import classes from './page.module.css';

export default function Category() {

    const columns = [
        { field: 'strMeal', headerName: 'Recipe', flex: 1 },
        { field: 'strMealThumb', headerName: 'Meal', flex: 1, renderCell: (params) => <Image src={params.value} alt={params.row.strMeal}  height={50} width={50} /> }
      ];
    const [meals, setMeals] = useState([])

  const router = useRouter()
  const { category } = router.query

  //get meals by category from mealdb api
  useEffect(() => {
    if (router.isReady) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
          console.log(data, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          console.log(data.meals)
          setMeals(data.meals)
            //get collumns from data
            
        })
    }
  }, [category, setMeals, router.isReady])


  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredMeals = meals.filter((meal) => {
    return meal.strMeal.toLowerCase().includes(searchText.toLowerCase());
  });


  return (
    <>
    <Header />
        <h1>{category} Meals</h1>
        <div className={classes.searchBar}>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchText}
                onChange={handleSearch}
                className={classes.searchInput}
              />
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filteredMeals.map((meal) => ({ ...meal, id: meal.idMeal }))}
                columns={columns}
                components={{
                  Toolbar: Toolbar,
                }}
                
                onCellClick={(newSelection) => {
                  //setSelectionModel(newSelection.selectionModel);

                  //route to meal page
                  console.log(newSelection.row.idMeal, newSelection)
                  router.push(`/meal/${newSelection.row.idMeal}`);
                }}
              />
            </div>


    <Footer />
    </>
  )
} 