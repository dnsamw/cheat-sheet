import "../App.css";
import { useNotesFetch } from "../hooks/useNotesFetch";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
// import { useAuth } from "../contexts/authContext";
import useItemsSelector from "../redux/items/itemsSelector";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { getItemsData } from "../redux/items/itemsActions";
import { setItemsError } from "../redux/items/itemsSlice";
import useAuthSelector from "../redux/auth/authSelector";
import Spinner from "../components/UI/Spinner";

type Props = {};

function GuestPage({}: Props) {
  // const { items, error, loading } = useNotesFetch();
  // const { state } = useAuth();

  const { authUser, authLoading, authError } = useAuthSelector();
  const {
    items: items2,
    itemsError: error2,
    loading: loading2,
  } = useItemsSelector();
  const dispatchX = useAppDispatch();
  useEffect(() => {
    try {
      if (items2.length === 0) {
        console.log("fetching notes");
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
          <CheatItem
            key={cheatItem.id}
            item={cheatItem}
            // isLoggedIn={!!state?.user}
            isLoggedIn={!!authUser}
          />
        ))}
      </>
    </MainNavigatorLayout>
  );
}

export default GuestPage;
