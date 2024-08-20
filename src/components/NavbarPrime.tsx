import { memo, useState } from "react";
import "../assets/scss/navbar-prime.scss";
import { useAuth } from "../contexts/authContext";
import LetterAvatar from "./UI/LetterAvatar";
import { Config } from "../config/appConfig";
import { LuUser, LuPowerOff } from "react-icons/lu";
import { AiFillSignature } from "react-icons/ai";
import Logo from "../dev-hub.svg";

// dummy data
import { dummyProjects as projects } from "../types/project";
import IconLink from "./UI/IconLink";
import { AuthActionKind } from "../types/auth";
import { logout } from "../services/firestoreService";
import { FirebaseError } from "firebase/app";
import IconButton from "./UI/IconButton";
import DropdownSelectionList from "./UI/DropdownSelectionList";

const MemoizedLetterAvatar = memo(
  LetterAvatar,
  (prevProps, nextProps) => prevProps.text === nextProps.text
);

type Props = {};

function NavbarPrime({}: Props) {
  const {
    state: { user, role },
    dispatch,
  } = useAuth();

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

  return (
    <div className="navbar-prime">
      <div className="left">
        <div className="brand-logo">
          {Logo ? <img src={Logo} alt="logo" /> : <AiFillSignature />}
        </div>

        <DropdownSelectionList items={projects} onChange={() => {}} />
      </div>

      <div className="right">
        {!!user?.email ? (
          <MemoizedLetterAvatar text={user?.email} />
        ) : (
          <IconLink
            routePath={Config.routePaths.auth}
            color={Config.colors.white}
            text="Login"
          >
            <LuUser />
          </IconLink>
        )}
        {role === "admin" && (
          <IconButton
            onPress={handleLogout}
            color={Config.colors.white}
            text="Logout"
          >
            <LuPowerOff />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default NavbarPrime;
