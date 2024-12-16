import React from "react";
import MainLayout from "./MainLayout";
import NavbarPrime from "../components/NavbarPrime";
import Sidebar from "../components/Sidebar";
// import { useAuth } from "../contexts/authContext";
import { Config } from "../config/appConfig";
import useAuthSelector from "../redux/auth/authSelector";

type Props = {
  children: React.ReactNode;
};

function MainNavigatorLayout({ children }: Props) {
  // const{state:{user}} = useAuth();
  const {authUser} = useAuthSelector();
  return (
    <>
      <NavbarPrime />
      <div style={{ display: "flex", top: "90px", position: "relative" }}>
        {!!authUser && <div style={{ width: Config.uiMeasurements.sidebarWidth}}>
          <Sidebar />
        </div>}
        <div style={{ width: `${!!authUser ? `calc(100% - ${Config.uiMeasurements.sidebarWidth})`:"100%"}` }}>
          <MainLayout>{children}</MainLayout>
        </div>
      </div>
    </>
  );
}

export default MainNavigatorLayout;
