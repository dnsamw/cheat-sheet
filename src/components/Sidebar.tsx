import { useState, useEffect } from "react";
import "../assets/scss/sidebar.scss";
import IconButton from "./UI/IconButton";
import { LuNewspaper, LuPencilRuler, LuPlus, LuRocket, LuStickyNote, LuTags, LuUsers } from "react-icons/lu";
import { Config } from "../config/appConfig";
import SubjectSelector from "./SubjectSelector";
import { subjects } from "../data";
import { Link } from "react-router-dom";
import { ModalActionKind, ModalMethods, ModalTypes } from "../types/modal";
import CreateEditArticleModal from "./Modals/CreateEditArticleModal";
import CreateEditNoteModal from "./Modals/CreateEditNoteModal";
import CreateEditProjectModal from "./Modals/CreateEditProjectModal";
import { useModal } from "../contexts/modalContext";

const Sidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const {state:{isOpen,modal,method}, dispatch} = useModal();

  const handleOpenModal = (modalType: ModalTypes) => {
    dispatch({ type: ModalActionKind.OPEN, payload: {isOpen: true, modal: modalType, method: ModalMethods.CREATE } });
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

  const renderModal = (method:ModalMethods | null, modalType:ModalTypes | null) => {
    switch (modalType) {
      case ModalTypes.CREATE_EDIT_ARTICLE_MODAL:
        return method !== null ? <CreateEditArticleModal method={method} onModalClose={() => dispatch({ type: ModalActionKind.CLOSE, payload: {isOpen: false, modal: null, method: null} })}/> : null;
      case ModalTypes.CREATE_EDIT_NOTE_MODAL:
        return method !== null ?  <CreateEditNoteModal  method={method}  onModalClose={() => dispatch({ type: ModalActionKind.CLOSE, payload: {isOpen: false, modal: null, method: null} })}/> : null;
      case ModalTypes.CREATE_EDIT_PROJECT_MODAL:
        return method !== null ?  <CreateEditProjectModal  method={method}  onModalClose={() => dispatch({ type: ModalActionKind.CLOSE, payload: {isOpen: false, modal: null, method: null} })} /> : null;
      default:
        return null;
    }
  };

  return (
    <div style={{width:Config.uiMeasurements.sidebarWidth}} className={`sidebar ${false ? "hidden" : ""}`}>
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
      {/* {isModalOpen && <div>{modalType}</div>} */}
      {isOpen && renderModal(method, modal)}
    </div>
  );
};

export default Sidebar;
