import React from "react"
import Helmet from 'react-helmet'

const HelmetWrapper = ({
  pageTitle
}) => ( 
  <Helmet title={`${pageTitle}`}>
    <link rel="icon" href="/favicon.ico" />
  </Helmet>
)

export default HelmetWrapper
