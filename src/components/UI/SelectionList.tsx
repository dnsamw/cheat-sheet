import '../../assets/scss/selection-list.scss'
import { I_Project } from '../../types/project';

type ItemType = I_Project;

type Props<T extends ItemType> = {
  isVisible: boolean;
  items: T[];
  handleSelect: (item: T) => void;
}

function SelectionList<T extends ItemType>({ isVisible, items, handleSelect }: Props<T>) {
  return (
    <>
      {isVisible && (
        <ul className="selection-list">
          {items.map(item => (
            <li
              key={item.id}
              className="selection-list__item"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default SelectionList;