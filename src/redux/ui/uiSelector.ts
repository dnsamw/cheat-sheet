import { useSelector } from "react-redux";
import { RootState } from "../store";


const useUiSelector = () => {
    return {
        tags: useSelector((state: RootState) => state.ui.tags),
        selectedTags: useSelector((state: RootState) => state.ui.selectedTags),
        loading: useSelector((state: RootState) => state.ui.loading),
        uiError: useSelector((state: RootState) => state.ui.uiError),
        isMobile: useSelector((state: RootState) => state.ui.isMobile),
    };
};

export default useUiSelector;