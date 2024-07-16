import React from "react";
import "../App.css";
import { useData } from "../hooks/useData";
import Loading from "../components/UI/Loading";
import CheatForm from "../components/CheatForm";
import CheatItem from "../components/CheatItem";

type Props = {};

function AdminPage({}: Props) {
  const { items, error, loading } = useData();
  return (
    <>
      <div style={{ color: "white" }}>AdminPage</div>
      <div className="App">
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <CheatForm />
      {items?.map((cheatItem:any)=><CheatItem key={cheatItem.id} item={cheatItem} />)}
    </div>
    </>
  );
}

export default AdminPage;
