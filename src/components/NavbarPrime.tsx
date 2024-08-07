import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import '../assets/scss/navbar-prime.scss'
import { useAuth } from '../contexts/authContext';
import LetterAvatar from './UI/LetterAvatar';
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import SelectionList from './UI/SelectionList';

type Props = {}

const projects = [
  {id: '1', name: 'FanClub'},
  {id: '2', name: 'Recoveroo Uk'},
  {id: '3', name: 'GameHub'},
  {id: '4', name: 'StudyQuest'},
  {id: '5', name: 'D3 Solutions'},
]

function NavbarPrime({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const {state} = useAuth();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleselectProject = (project:any)=>{
   setProject(project);
   setModalOpen(false)
  }


  return (
    <div className='navbar-prime'>
      <div onClick={() => setModalOpen(!isModalOpen)} className="project-selector">{project.name} &nbsp; 
       {isModalOpen ? <LuChevronUp /> : <LuChevronDown />}
      </div>
      <SelectionList isVisible={isModalOpen} projects={projects} handleSelect={handleselectProject} />
      {!!state.user ? <LetterAvatar text={state.user?.email || "X"}/> : 'Guest'}
    </div>
  )
}

export default NavbarPrime