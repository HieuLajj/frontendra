import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeView from '@/src/views/invests'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return(
    <HomeView/>
  )
}
