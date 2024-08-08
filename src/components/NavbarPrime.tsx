import { memo, useEffect, useRef, useState } from "react";
import "../assets/scss/navbar-prime.scss";
import { useAuth } from "../contexts/authContext";
import LetterAvatar from "./UI/LetterAvatar";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import SelectionList from "./UI/SelectionList";

// dummy data
import { dummyProjects as projects } from "../types/project";

const MemoizedLetterAvatar = memo(
  LetterAvatar,
  (prevProps, nextProps) => prevProps.text === nextProps.text
);

type Props = {};

function NavbarPrime({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const {
    state: { user },
  } = useAuth();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setModalOpen(true);
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

  const handleselectProject = (project: any) => {
    setProject(project);
    setModalOpen(false);
  };

  return (
    <div className="navbar-prime">
      <div
        onClick={() => setModalOpen(!isModalOpen)}
        className="project-selector"
      >
        {project.name} &nbsp;
        {isModalOpen ? <LuChevronUp /> : <LuChevronDown />}
      </div>
      <SelectionList
        isVisible={isModalOpen}
        items={projects}
        handleSelect={handleselectProject}
      />
      {!!user?.email ? <MemoizedLetterAvatar text={user?.email} /> : "Guest"}
    </div>
  );
}

export default NavbarPrime;
