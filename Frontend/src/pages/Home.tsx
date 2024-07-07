import React from 'react'
import Banner from '../components/user/Banner'
import Footer from '../components/user/Footer/Footer'
import Navbar from '../components/user/Navbar/navbar'
import Body from '../components/user/body'
import FAQ from '../components/user/faq'
import Advertisement from '../components/user/advertisement'

const Home:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Advertisement/>
    <Body/>
    <FAQ />
    <Footer/>
    </>
    
  )
}

export default Home