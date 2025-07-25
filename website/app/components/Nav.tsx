import { useState, useEffect } from 'react'
// @ts-ignore
import SiteLogo from '../images/logo.png'
import MobileNavLink from './MobileNavLink'
import NavLink from './NavLink'
import Close from './svgs/Close'
import Menu from './svgs/Menu'

function Navigation() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false)

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

  const menuItems = [
    {
      title: "Home",
      to: "/"
    },
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
      to: "/content"
    },
    {
      title: "Contact",
      to: "/contact"
    },
  ]

  return (
    <>
      <div className='h-[66px] flex justify-between py-2 px-4'>
        <NavLink to="/" className='flex space-x-2 text-xl items-center text-black'>
          <img src={SiteLogo} alt="BrianMorrison.me Logo" className='w-[40px]' />
          <span>Brian Morrison II</span>
        </NavLink>
        <div className='space-x-4 items-center hidden sm:flex'>
          {menuItems.map((el, idx) => (
            <NavLink key={`mainnav-${idx}`} to={el.to}>{el.title}</NavLink>
          ))}
        </div>
        <div className='flex items-center sm:hidden'>
          {!isMobileMenuShown && (
            <button onClick={() => setIsMobileMenuShown(true)}>
              <Menu />
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