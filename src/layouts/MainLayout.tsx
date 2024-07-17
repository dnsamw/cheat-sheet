import React from "react";
import "../assets/scss/main-layout.scss";
import { useData } from "../hooks/useData";
import Loading from "../components/UI/Loading";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const { error, loading } = useData();
  return (
    <div className="main-wrapper">
        {loading && <Loading />}
        {error && <p>Error: {error}</p>}
      <div className="main-container responsive">{children}</div>
    </div>
  );
}

export default MainLayout;
