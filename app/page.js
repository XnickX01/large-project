'use client'
import LoginPage from './login/page'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import Link from 'next/link'

import { Galleria } from 'primereact/galleria'
import fs from 'fs'
const path = require('path');
export default function Home () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //check if user is logged in through local storage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (username, password) => {
    setUsername(username)
    setPassword(password)
    setIsLoggedIn(true)
    
  }

  // const [images, setImages] = useState([])

  // useEffect(() => {
  //   const imagesDir = path.join(process.cwd(), 'public', 'images')
  //   const imageFileNames = fs.readdirSync(imagesDir)
  //   const images = imageFileNames.map(fileName => ({
  //     source: `/images/${fileName}`,
  //     alt: fileName,
  //     title: fileName
  //   }))
  //   setImages(images)
  // }, [])

  return (
    <>
      {isLoggedIn ? (
        <main className={[styles.main, styles.background].join(' ')}>
          <main className={styles.container}>
            <Card title={`Welcome ${username}`} className={styles.card}>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <Link href='/community'>Browse recipies and meals</Link>
                  </li>
                  <li>
                    <Link href='/addrecipe'>Add your own recipies</Link>
                  </li>
                  <li>
                    <Link href='/accountsettings'>Account</Link>
                  </li>
                </ul>
              </div>
              <div className={styles.cardImage}>
                {/* Image on the right */}
                {/* <Image
                src='/images/pexels-dominika-roseclay-2090903.jpg'
                alt='Picture of pizza smoked salmon'
                width={100}
                height={100}
              /> */}
              </div>
            </Card>
          </main>
        </main>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  )
}
