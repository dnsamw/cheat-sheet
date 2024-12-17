import { useEffect, useState } from "react";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
import Spinner from "../components/UI/Spinner";
import useItemsSelector from "../redux/items/itemsSelector";
import useUiSelector from "../redux/ui/uiSelector";
import { sortByUpdatedDate } from "../utils";
import { useAppDispatch } from "../redux/store";
import { setItemsError } from "../redux/items/itemsSlice";
import { getItemsData } from "../redux/items/itemsActions";
import { getTagsData } from "../redux/ui/uiActions";

import "../App.css";
import { Tag } from "../redux/ui/uiSlice";

  type Props = {};

  const AdminPage = ({}: Props) => {
    const { items, loading } = useItemsSelector();
    const { tags,selectedTags } = useUiSelector();
    const dispatch = useAppDispatch();
    const [filteredItems, setFilteredItems] = useState<any[]>([]);

    useEffect(() => {
      try {
        if (items.length === 0) dispatch(getItemsData()).unwrap();
        if (tags.length === 0) dispatch(getTagsData()).unwrap();
      } catch (error) {
        dispatch(setItemsError(error));
      }
    }, []);

    useEffect(() => {
      const filteredItems = items.filter((item: any) => {
        return selectedTags.some((tag: Tag) => item.tags.includes(tag.name));
      })

      setFilteredItems(filteredItems);
    },[selectedTags.length]);

    const itemsToRender = selectedTags.length > 0 ? filteredItems : items;

    return (
      <MainNavigatorLayout>
        <>
          <div style={{ marginTop: "20px" }}></div>
          {loading ? (
            <Spinner />
          ) : (
            sortByUpdatedDate(itemsToRender)?.map((cheatItem: any) => (
              <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={true} />
            ))
          )}
        </>
      </MainNavigatorLayout>
    );
  };

  export default AdminPage;
