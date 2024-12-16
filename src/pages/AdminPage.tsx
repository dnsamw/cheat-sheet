import "../App.css";
import { useNotesFetch } from "../hooks/useNotesFetch";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
import { useEffect } from "react";
import useItemsSelector from "../redux/items/itemsSelector";
import { useAppDispatch } from "../redux/store";
import { getItemsData } from "../redux/items/itemsActions";
import { setItemsError } from "../redux/items/itemsSlice";

type Props = {};

const AdminPage = ({}: Props) => {
  // const { items, error, loading } = useNotesFetch();
  const {items: items2, itemsError: error2, loading: loading2} = useItemsSelector();
  const dispatchX = useAppDispatch();
  useEffect(() => {
    try {
      dispatchX(getItemsData()).unwrap(); 
    } catch (error) {
      dispatchX(setItemsError(error));
    }
  }, []);
  return (
    <MainNavigatorLayout>
      <>
        {<div style={{ marginTop: "20px" }}></div>}
        {items2?.map((cheatItem: any) => (
          <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={true} />
        ))}
      </>
    </MainNavigatorLayout>
  );
};

export default AdminPage;
