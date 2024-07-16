import React from "react";
import "../assets/scss/main-layout.scss";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="main-wrapper">
      <div className="main-container responsive">{children}</div>
    </div>
  );
}

export default MainLayout;
