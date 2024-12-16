import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAuthSelector = () => {
  return {
    authUser: useSelector((state: RootState) => state.auth.authUser),
    authLoading: useSelector((state: RootState) => state.auth.loading),
    authError: useSelector((state: RootState) => state.auth.authError),
  };
};

export default useAuthSelector;