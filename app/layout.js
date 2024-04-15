'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import LoginPage from './login/page'
const inter = Inter({ subsets: ['latin'] })
import jwt from 'jsonwebtoken';
import styles from './layout.module.css'
// export const metadata = {
//   title: 'Culinary Canvas',
//   description: 'Website for Chefs to Collaborate and Share Recipes',
//   image: '/images/trout_11590467.png',
//   url: 'https://culinarycanvas.com',
//   type: 'website'
// }

export default function RootLayout ({ children }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwt.decode(token);
      const dateNow = new Date();
      console.log(decodedToken)
      if(decodedToken && decodedToken.exp > dateNow.getTime()/1000){
        setIsLoggedIn(true)
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

      } else {
        console.log("Token has expired.");
        setIsLoggedIn(false)
      }
    }
  }, [])

  //implement login logic here
  const handleLogin = (username, password) => {
    setUsername(username)
    setPassword(password)
    setIsLoggedIn(true)
  }


  return (
    <>
    <Head>
      <title>{'Culinary Canvas'}</title>
      <meta name='description' content={'Website for Chefs to Collaborate and Share Recipes'} />
      <meta property='og:title' content={'Culinary Canvas'} />
      <link rel='icon' href='/trout_11590467.png' />
    </Head>
      <html lang='en'>
        <body suppressHydrationWarning={true} className={inter.className}>
          <PrimeReactProvider>
              <Header username={username} password={password} />
              <div className='background'>
                <div className='container'>
                  {isLoggedIn ? (
                    children
                  ) : (
                    <LoginPage onLogin={handleLogin} />
                  )}
                  </div>
              </div>
              <Footer className={styles.footer} />
          </PrimeReactProvider>
        </body>
      </html>
    </>
  )
}
