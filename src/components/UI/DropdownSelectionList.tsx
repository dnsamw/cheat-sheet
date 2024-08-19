import { useEffect, useRef, useState } from "react";
import SelectionList from "./SelectionList";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import "../../assets/scss/dropdown-selection-list.scss";
import { I_Project } from "../../types/project";

type Props = {
  items: I_Project[];
};

function DropdownSelectionList({ items }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ name: string }>(items[0]);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleselectItem = (project: any) => {
    setSelectedItem(project);
    setModalOpen(false);
  };

  return (
    <div>
      <div onClick={() => setModalOpen(!isModalOpen)} className="item-selector">
        {selectedItem.name} &nbsp;
        {isModalOpen ? <LuChevronUp /> : <LuChevronDown />}
        <SelectionList
          isVisible={isModalOpen}
          items={items}
          handleSelect={handleselectItem}
        />
      </div>
    </div>
  );
}

export default DropdownSelectionList;
