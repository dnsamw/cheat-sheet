import { memo, useEffect, useRef, useState } from "react";
import "../assets/scss/navbar-prime.scss";
import { useAuth } from "../contexts/authContext";
import LetterAvatar from "./UI/LetterAvatar";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import SelectionList from "./UI/SelectionList";
import { Config } from "../config/appConfig";
import { LuLogIn, LuUser2, LuLogOut } from "react-icons/lu";

// dummy data
import { dummyProjects as projects } from "../types/project";
import IconLink from "./UI/IconLink";
import { AuthActionKind } from "../types/auth";
import { logout } from "../services/firestoreService";
import { FirebaseError } from "firebase/app";
import IconButton from "./UI/IconButton";

const MemoizedLetterAvatar = memo(
  LetterAvatar,
  (prevProps, nextProps) => prevProps.text === nextProps.text
);

type Props = {};

function NavbarPrime({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const {
    state: { user,role }, dispatch
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

  const handleLogout = async () => {
    // console.log("Data",data);
    dispatch({ type: AuthActionKind.SET_LOADING, payload: true });
    try {
      const userCredential = await logout();
      dispatch({
        type: AuthActionKind.LOGOUT,
      });
      dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
    } catch (error: FirebaseError | any) {
      // console.error("Login error:", error.message); 
      dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
      dispatch({
        type: AuthActionKind.SET_AUTH_ERROR,
        payload: "Cannot Logout. Please try again",
      });
    }
  };


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
      {!!user?.email ? (
        <MemoizedLetterAvatar text={user?.email} />
      ) : (
        <IconLink routePath={Config.routePaths.auth} color={Config.colors.primary}>
          <LuLogIn />
        </IconLink>
      )}

      {role==="admin" && <IconButton onPress={handleLogout} color={Config.colors.error}><LuLogOut /></IconButton>}
      
    </div>
  );
}

export default NavbarPrime;
