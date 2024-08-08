import React from "react";
import "../App.css";
import { useData } from "../hooks/useData";
import Loading from "../components/UI/Loading";
import CheatForm from "../components/CheatForm";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";

type Props = {};

function AdminPage({}: Props) {
  const { items, error, loading } = useData();
  return (
    <MainNavigatorLayout>
      <>
        {/* <CheatForm /> */}
        { <div style={{marginTop: '20px'}}></div>}
        {items?.map((cheatItem: any) => (
          <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={true}/>
        ))}
      </>
    </MainNavigatorLayout>
  );
}

export default AdminPage;
