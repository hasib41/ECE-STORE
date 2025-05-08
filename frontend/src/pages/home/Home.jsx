import React from 'react'
import Banner from './Banner'
import LatestProducts from './LatestProducts'
import Testimonials from './Testimonials'
import Features from './Features'
import AboutDepartment from './AboutDepartment'

const Home = () => {
  return (
    <>
        <Banner/>
        <Features />
        <LatestProducts/>
        <AboutDepartment />
        <Testimonials />
    </>
  )
}

export default Home