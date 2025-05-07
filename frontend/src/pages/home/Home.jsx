import React from 'react'
import Banner from './Banner'
import LatestProducts from './LatestProducts'
import PromotionalBanner from './PromotionalBanner'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'
import Features from './Features'
import AboutDepartment from './AboutDepartment'

const Home = () => {
  return (
    <>
        <Banner/>
        <Features />
        <LatestProducts/>
        <PromotionalBanner />
        <AboutDepartment />
        <Testimonials />
        <Newsletter />
    </>
  )
}

export default Home