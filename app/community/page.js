"use client"
import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataGrid, GridColDef, Toolbar } from '@mui/x-data-grid';
import classes from './page.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CommunityPage() {
  const router = useRouter();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data =>{ 
        console.log(data.meals)
        setMeals(data.meals)
      });
  }, []);

  const columns = [
    { field: 'strMeal', headerName: 'Recipe', flex: 1 },
    { field: 'strMealThumb', headerName: 'Meal', flex: 1, renderCell: (params) => <Image src={params.value} alt={params.row.strMeal}  height={50} width={50} /> },
    { field: 'strCategory', headerName: 'Category', flex: 1 },
    { field: 'strArea', headerName: 'Area', flex: 1 },
    { field: 'strTags', headerName: 'Tags', flex: 1 }
  ];

  const [searchText, setSearchText] = useState('');


  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data =>{ 
        console.log(data.meals)
        setMeals(data.meals)
        setFilteredMeals(data.meals); // Initialize filtered meals with all meals
      });
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    const filtered = meals.filter((meal) => {
      for (const column of columns) {
        if (meal[column.field]?.toLowerCase().includes(searchText?.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    setFilteredMeals(filtered);
  };

 
  return (
    <div className={classes.background}>
      <main className={classes.main}>
        <div className={classes.container}>
          <Card title='Community Recipes' className={classes.card}>
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
          </Card>
        </div>
      </main>
    </div>
  );
}
