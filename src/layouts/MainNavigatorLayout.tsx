import React from "react";
import MainLayout from "./MainLayout";
import NavbarPrime from "../components/NavbarPrime";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function MainNavigatorLayout({ children }: Props) {
  return (
    <>
      <NavbarPrime />
      <div style={{ display: "flex", top: "90px", position: "relative" }}>
        <div style={{ width: "400px"}}>
          <Sidebar />
        </div>
        <div style={{ width: "calc(100% - 400px)" }}>
          <MainLayout>{children}</MainLayout>
        </div>
      </div>
    </>
  );
}

export default MainNavigatorLayout;
