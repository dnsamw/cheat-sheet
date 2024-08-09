import { useState, useEffect } from "react";
import "../assets/scss/sidebar.scss";
import IconButton from "./UI/IconButton";
import { LuNewspaper, LuPencilRuler, LuPlus, LuRocket, LuStickyNote, LuTags, LuUsers } from "react-icons/lu";
import { Config } from "../config/appConfig";
import SubjectSelector from "./SubjectSelector";
import { subjects } from "../data";
import { Link } from "react-router-dom";
import { ModalTypes } from "../types/modal";
import CreateEditArticleModal from "./Modals/CreateEditArticleModal";
import CreateEditNoteModal from "./Modals/CreateEditNoteModal";
import CreateEditProjectModal from "./Modals/CreateEditProjectModal";

const Sidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes | null>(null);

  const handleOpenModal = (modalType: ModalTypes) => {
    setModalType(modalType);
    setModalOpen(true);
    console.log("isModalOpen", isModalOpen);
    console.log("modalType", modalType);   
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderModal = () => {
    switch (modalType) {
      case ModalTypes.CREATE_EDIT_ARTICLE_MODAL:
        return <CreateEditArticleModal onModalClose={() => setModalOpen(false)}/>;
      case ModalTypes.CREATE_EDIT_NOTE_MODAL:
        return <CreateEditNoteModal onModalClose={() => setModalOpen(false)}/>;
      case ModalTypes.CREATE_EDIT_PROJECT_MODAL:
        return <CreateEditProjectModal onModalClose={() => setModalOpen(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className={`sidebar ${false ? "hidden" : ""}`}>
      <section className="sidebar-section">
        <h3>Create</h3>
        <div className="sidebar-item">
          <IconButton
            text="New project"
            color={Config.colors.white}
            onPress={() => handleOpenModal(ModalTypes.CREATE_EDIT_PROJECT_MODAL)}
          >
            <LuPlus />
          </IconButton>
        </div>
        <div className="sidebar-item">
          <IconButton
            text="New article"
            color={Config.colors.white}
            onPress={() => handleOpenModal(ModalTypes.CREATE_EDIT_ARTICLE_MODAL)}
          >
            <LuPlus />
          </IconButton>
        </div>
        <div className="sidebar-item">
          <IconButton
            text="New note"
            color={Config.colors.white}
            onPress={() => handleOpenModal(ModalTypes.CREATE_EDIT_NOTE_MODAL)}
          >
            <LuPlus />
          </IconButton>
        </div>
      </section>
      <section className="sidebar-section">
        <h3>Filter</h3>
        <SubjectSelector subjects={subjects} onChange={console.log} />
      </section>

      <section className="sidebar-section">
        <h3>Manage</h3>
        <ul className="sidebar-item-list">
          <Link to={"/projects"}><LuRocket /> Projects</Link>
          <Link to={"/subjects"}><LuPencilRuler /> Subjects</Link>
          <Link to={"/posts"}><LuNewspaper /> Posts</Link>
          <Link to={"/notes"}><LuStickyNote /> Notes</Link>
          <Link to={"/tsgs"}><LuTags /> Tags</Link>
          <Link to={"/users"}><LuUsers /> Users</Link>
        </ul>
      </section>
      {isModalOpen && <div>{modalType}</div>}
      {isModalOpen && renderModal()}
    </div>
  );
};

export default Sidebar;
