import { memo } from "react";
import { FirebaseError } from "firebase/app";
import { LuUser, LuPowerOff } from "react-icons/lu";
import { AiFillSignature } from "react-icons/ai";
import LetterAvatar from "./UI/LetterAvatar";
import IconButton from "./UI/IconButton";
import IconLink from "./UI/IconLink";
import DropdownSelectionList from "./UI/DropdownSelectionList";
import { Config } from "../config/appConfig";
import { logout } from "../services/firestoreService";
import { useAppDispatch } from "../redux/store";
import { clearAuthUser } from "../redux/auth/authSlice";
import { clearItems } from "../redux/items/itemsSlice";
import useAuthSelector from "../redux/auth/authSelector";

import Logo from "../dev-hub.svg";
import "../assets/scss/navbar-prime.scss";

// dummy data
import { dummyProjects as projects } from "../types/project";

const MemoizedLetterAvatar = memo(
  LetterAvatar,
  (prevProps, nextProps) => prevProps.text === nextProps.text
);

type Props = {};

function NavbarPrime({}: Props) {
  const {authUser} = useAuthSelector();


  const dispatchX = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatchX(clearAuthUser());
      dispatchX(clearItems());
    } catch (error: FirebaseError | any) {
      console.error("Login error:", error.message);
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
        {!!authUser ? (
          <MemoizedLetterAvatar text={authUser?.first_name || "A"} />
        ) : (
          <IconLink
            routePath={Config.routePaths.auth}
            color={Config.colors.white}
            text="Login"
          >
            <LuUser />
          </IconLink>
        )}
        {!!authUser && (
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
