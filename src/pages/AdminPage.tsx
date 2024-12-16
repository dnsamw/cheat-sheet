import "../App.css";
import { useNotesFetch } from "../hooks/useNotesFetch";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
import { useEffect } from "react";
import useItemsSelector from "../redux/items/itemsSelector";
import { useAppDispatch } from "../redux/store";
import { getItemsData } from "../redux/items/itemsActions";
import { setItemsError } from "../redux/items/itemsSlice";
import Spinner from "../components/UI/Spinner";

type Props = {};

const AdminPage = ({}: Props) => {
  // const { items, error, loading } = useNotesFetch();
  const {items: items2, itemsError: error2, loading: loading2} = useItemsSelector();
  const dispatchX = useAppDispatch();
  useEffect(() => {
    try {
      if (items2.length === 0){
        dispatchX(getItemsData()).unwrap(); 
      }
    } catch (error) {
      dispatchX(setItemsError(error));
    }
  }, []);
  return (
    <MainNavigatorLayout>
      <>
        <div style={{ marginTop: "20px" }}></div>
        {loading2 ? <Spinner /> : items2?.map((cheatItem: any) => (
          <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={true} />
        ))}
      </>
    </MainNavigatorLayout>
  );
};

export default AdminPage;
