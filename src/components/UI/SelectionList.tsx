import '../../assets/scss/selection-list.scss'

interface ListItem {
  id: string;
  name: string;
}

type Props<T extends ListItem> = {
  isVisible: boolean;
  items: T[];
  handleSelect: (item: T) => void;
}

function SelectionList<T extends ListItem>({isVisible, items, handleSelect}: Props<T>) {
  return (
    <>
      {isVisible && (
        <div className="selection-list">
          {items.map(item => (
            <div 
              className='list-item' 
              key={item.id} 
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SelectionList;