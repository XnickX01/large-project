'use client'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import Link from 'next/link'
import Image from 'next/image'

export default function Home () {
  const [categories, setCategories] = useState([])



  //get meals by category from mealdb api
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => {
        console.log(data.categories)
        setCategories(data.categories)
      })
  }, [])
  


  return (
    <>
        <main className={[styles.main, styles.background].join(' ')}>
          <main className={styles.container}>
            <Card title={`Select Categories for your upcoming meal`} className={styles.card}>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <Link href='/community'>Browse Recipies and Meals</Link>
                  </li>
                  <li>
                    <Link href='/favorite'>Favorites Meals</Link>
                  </li>
                </ul>
                <ul className={styles.categories}>
                  {categories.slice(0, 12).map(category => (
                    <Link href={`/category/${category.strCategory}`} key={category.idCategory}>
                    <li key={category.idCategory} >
                      {category.strCategory}
                      <br />
                      <Image src={category.strCategoryThumb} alt={category.strCategory} width={60} height={40} />
                    </li>
                    </Link>
                  ))}
                </ul> 
              </div>
            </Card>
          </main>
        </main>
    </>
  )
}
