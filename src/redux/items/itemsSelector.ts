import { useSelector } from "react-redux";
import { RootState } from "../store";

const useItemsSelector = () => {
  return {
    items: useSelector((state: RootState) => state.items.items),
    loading: useSelector((state: RootState) => state.items.loading),
    itemsError: useSelector((state: RootState) => state.items.itemsError),
  };
};

export default useItemsSelector;
