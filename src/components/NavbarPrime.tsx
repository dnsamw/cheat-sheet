import React from 'react'
import '../assets/scss/navbar-prime.scss'
import { useAuth } from '../contexts/authContext';
import LetterAvatar from './UI/LetterAvatar';

type Props = {}

function NavbarPrime({}: Props) {
  const {state} = useAuth();
  return (
    <div className='navbar-prime'>{!!state.user ? <LetterAvatar text={state.user?.email || "X"}/> : 'Guest'}</div>
  )
}

export default NavbarPrime