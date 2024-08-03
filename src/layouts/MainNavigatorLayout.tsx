import React from 'react'
import MainLayout from './MainLayout'
import NavbarPrime from '../components/NavbarPrime'

type Props = {
    children: React.ReactNode
}

function MainNavigatorLayout({children}: Props) {
  return (
    <>
    <NavbarPrime />
    <MainLayout>
        {children}
    </MainLayout>
    </>
  )
}

export default MainNavigatorLayout