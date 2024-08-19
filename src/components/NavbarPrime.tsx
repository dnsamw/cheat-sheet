import { memo, useEffect, useRef, useState } from "react";
import "../assets/scss/navbar-prime.scss";
import { useAuth } from "../contexts/authContext";
import LetterAvatar from "./UI/LetterAvatar";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import SelectionList from "./UI/SelectionList";
import { Config } from "../config/appConfig";
import { LuUser, LuPowerOff } from "react-icons/lu";
import { AiFillSignature } from "react-icons/ai";
import Logo from "../dev-hub.svg"

// dummy data
import { I_Project, dummyProjects as projects } from "../types/project";
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
      <div className="left">
      <div className="brand-logo">
      {Logo ? <img src={Logo} alt="logo" /> : <AiFillSignature />}
      </div>
     
      <div
        onClick={() => setModalOpen(!isModalOpen)}
        className="project-selector"
      >
        {project.name} &nbsp;
        {isModalOpen ? <LuChevronUp /> : <LuChevronDown />}
      </div>
      <SelectionList
        isVisible={isModalOpen}
        items={projects as I_Project[]}
        handleSelect={handleselectProject}
      />
      </div>

      <div className="right">
      {!!user?.email ? (
        <MemoizedLetterAvatar text={user?.email} />
      ) : (
        <IconLink routePath={Config.routePaths.auth} color={Config.colors.white} text="Login">
          <LuUser />
        </IconLink>
      )}
      {role==="admin" && <IconButton onPress={handleLogout} color={Config.colors.white} text="Logout"><LuPowerOff /></IconButton>}
    
      </div>
    </div>
  );
}

export default NavbarPrime;
