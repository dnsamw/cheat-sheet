import React from "react";
import MainLayout from "./MainLayout";
import NavbarPrime from "../components/NavbarPrime";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/authContext";

type Props = {
  children: React.ReactNode;
};

function MainNavigatorLayout({ children }: Props) {
  const{state:{user}} = useAuth()
  return (
    <>
      <NavbarPrime />
      <div style={{ display: "flex", top: "90px", position: "relative" }}>
        {!!user && <div style={{ width: "400px"}}>
          <Sidebar />
        </div>}
        <div style={{ width: `${!!user ? "calc(100% - 400px)":"100%"}` }}>
          <MainLayout>{children}</MainLayout>
        </div>
      </div>
    </>
  );
}

export default MainNavigatorLayout;
