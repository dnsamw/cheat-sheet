import React from 'react'
import '../assets/scss/navbar-prime.scss'
import { useAuth } from '../contexts/authContext';

type Props = {}

function NavbarPrime({}: Props) {
  const {state} = useAuth();
  return (
    <div className='navbar-prime'>{!!state.user ? state.user?.email : 'Guest'}</div>
  )
}

export default NavbarPrime