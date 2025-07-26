import { useState, useEffect } from 'react'
import SiteLogo from '../images/logo.png'
import MobileNavLink from './MobileNavLink'
import NavLink from './NavLink'
import Close from './svgs/Close'

function Navigation() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuShown])
  
  // Add scroll event listener to add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    {
      title: "Work with me",
      to: "/work-with-me"
    },
    {
      title: "Portfolio",
      to: "/portfolio"
    },
    {
      title: "Content",
      to: "/#content"
    },
    {
      title: "Contact",
      to: "/#contact"
    },
  ]

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 flex justify-center items-center gap-4 mx-auto w-full py-3 px-4 z-10 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <NavLink to="/" className='flex space-x-2 text-xl items-center text-black'>
          {!isMobileMenuShown && <img src={SiteLogo} alt="Brian Morrison Logo" className='w-[40px]' /> }
        </NavLink>
        {menuItems.map((el, idx) => (
          <NavLink key={`mainnav-${idx}`} className='hidden sm:block' to={el.to}>{el.title}</NavLink>
        ))}
        <div className='flex items-center sm:hidden'>
          {!isMobileMenuShown && (
            <button onClick={() => setIsMobileMenuShown(true)}>
              <NavLink to="#" className='flex space-x-2 text-xl items-center text-black'>
                Menu
              </NavLink>
            </button>
          )}
        </div>
      </div>

      {isMobileMenuShown && (
        <div className='absolute top-0 h-screen w-full bg-neutral-900 bg-opacity-95 text-white z-50'>
          <div className='h-[66px] flex justify-between py-2 px-4'>
            <NavLink to="/" className='flex space-x-2 text-xl items-center text-white'>
              <img src={SiteLogo} alt="BrianMorrison.me Logo" className='w-[40px]' />
              <span className='!text-white'>Brian Morrison II</span>
            </NavLink>
            <div className='space-x-2 items-center flex'>
              <button onClick={() => setIsMobileMenuShown(false)}>
                <Close />
              </button>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            {menuItems.map((el, idx) => (
              <MobileNavLink key={`mob-${idx}`} to={el.to}>{el.title}</MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation