import React from 'react'
import Navbar from '../../components/doctor/Navbar/Navbar'
import Banner from '../../components/doctor/Banner'
import Footer from '../../components/doctor/Footer/Footer'
import Body from '../../components/doctor/Body'
// import OurValues from '../../components/doctor/our_values'

const doctorDashboard:React.FC = () => {
  return (
    <>
    <Navbar/> 
    <Banner/>
    <Body/>
    {/* <OurValues /> */}
    <Footer/>
    </>
    
  )
}

export default doctorDashboard