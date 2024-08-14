import "../../assets/scss/icon-dropdown-list.scss"
import { LuShare, LuSave, LuTrash } from "react-icons/lu";
type Props = {
  isActive: boolean
}

function IconDropdownList({isActive}: Props) {
  if (!isActive) return null
  return (
    <div className="icon-dropdown-list">
        <ul>
            <li> <span>Copy Link</span> <LuShare /></li>
            <li><span>Save</span> <LuSave /></li>
            <li><span>Delete</span> <LuTrash /> </li>
        </ul>
    </div>
  )
}

export default IconDropdownList