import React from "react";
import "../assets/scss/main-layout.scss";
import Loading from "../components/UI/Loading";
import { useDataOperations } from "../hooks/useDataOperations";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const { error, loading } = useDataOperations();
  return (
    <div className="main-wrapper">
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <div className="main-container responsive">{children}</div>
    </div>
  );
}

export default MainLayout;
