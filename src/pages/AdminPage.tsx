import "../App.css";
import { useNotesFetch } from "../hooks/useNotesFetch";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
import { useEffect } from "react";

type Props = {};

const AdminPage = ({}: Props) => {
  const { items, error, loading } = useNotesFetch();
  // console.log("ITEMS", items);

  // useEffect(() => {
  //   console.log("AdminPage mounted");
  //   return () => {
  //     console.log("AdminPage unmounted");
  //   }
  // }, [])
  return (
    <MainNavigatorLayout>
      <>
        {<div style={{ marginTop: "20px" }}></div>}
        {items?.map((cheatItem: any) => (
          <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={true} />
        ))}
      </>
    </MainNavigatorLayout>
  );
};

export default AdminPage;
