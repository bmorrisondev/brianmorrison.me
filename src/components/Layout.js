import React from 'react'

import HelmetWrapper from './HelmetWrapper'
import Navbar from './Navbar'
import Footer from './Footer'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <HelmetWrapper pageTitle="Home" />
    <Navbar />
    <div>
      {children}
    </div>
    <Footer />
  </div>
)

export default TemplateWrapper
