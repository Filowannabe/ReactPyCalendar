import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const onDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  return {
    //properties
    isDateModalOpen,
    //methods
    onDateModal,
    closeDateModal,
  };
};
