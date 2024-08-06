import React, { useState } from 'react'
import '../assets/scss/navbar-prime.scss'
import { useAuth } from '../contexts/authContext';
import LetterAvatar from './UI/LetterAvatar';
import { LuChevronDown } from "react-icons/lu";

type Props = {}

const projects = [
  {id: '1', name: 'FanClub'},
  {id: '2', name: 'Recoveroo Uk'},
  {id: '3', name: 'GameHub'},
  {id: '4', name: 'StudyQuest'},
  {id: '5', name: 'D3 Solutions'},
]

function NavbarPrime({}: Props) {
  const [isProjectSelectorOpen, setProjectSelectorOpen] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const {state} = useAuth();


  const handleselectProject = (project:any)=>{
   setProject(project);
   setProjectSelectorOpen(false)
  }

  return (
    <div className='navbar-prime'>
      <div onClick={() => setProjectSelectorOpen(!isProjectSelectorOpen)} className="project-selector">{project.name} &nbsp; <LuChevronDown /></div>
      {isProjectSelectorOpen && <div className="projects-list">
        {projects.map(project => <div className='project' key={project.id} onClick={()=>handleselectProject(project)}>{project.name}</div>)}
      </div>}
      {!!state.user ? <LetterAvatar text={state.user?.email || "X"}/> : 'Guest'}
    </div>
  )
}

export default NavbarPrime