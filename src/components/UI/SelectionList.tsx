
import '../../assets/scss/selection-list.scss'
type Props = {
    isVisible: boolean;
    projects: {id: string, name: string}[];
    handleSelect: (project: {id: string, name: string}) => void;
}

function SelectionList({isVisible, projects, handleSelect}: Props) {
  return (
    <>
        {isVisible && <div className="projects-list">
        {projects.map(project => <div className='project' key={project.id} onClick={()=>handleSelect(project)}>{project.name}</div>)}
      </div>}
    </>
  )
}

export default SelectionList