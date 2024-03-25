import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Head from 'next/head'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Culinary Canvas',
  description: 'Website for Chefs to Collaborate and Share Recipes',
  image: '/images/trout_11590467.png',
  url: 'https://culinarycanvas.com',
  type: 'website'
}

export default function RootLayout ({ children }) {

  //implement login logic here




  return (
    <>
    <Head>
      <title>{metadata.title}</title>
      <meta name='description' content={metadata.description} />
      <meta property='og:title' content={metadata.title} />
      <link rel='icon' href='/trout_11590467.png' />
    </Head>
      <html lang='en'>
        <body suppressHydrationWarning={true} className={inter.className}>
          <PrimeReactProvider>
              <Header />
              <div className='background'>
                <div className='container'>{children}</div>
              </div>
              <Footer />
          </PrimeReactProvider>
        </body>
      </html>
    </>
  )
}
