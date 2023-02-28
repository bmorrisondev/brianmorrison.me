import React from 'react'
// @ts-ignore
import SiteLogo from '../images/logo.png'
import Container from './Container'
import NavLink from './NavLink'

function Navigation() {
  return (
    <Container className='h-[66px] flex justify-between p-2'>
      <div className='flex space-x-2 text-xl items-center'>
        <img src={SiteLogo} alt="BrianMorrison.me Logo" className='w-[40px]' />
        <span>Brian Morrison II</span>
      </div>
      <div className='flex space-x-2 items-center'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/uses">Uses</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </Container>
  )
}

export default Navigation