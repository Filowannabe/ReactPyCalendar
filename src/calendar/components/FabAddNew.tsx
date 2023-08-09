import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabAddNew = () => {
  const { onDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  return (
    <button
      className="btn btn-primary fab"
      onClick={(e) => {
        e.preventDefault();
        setActiveEvent(null);
        onDateModal();
      }}
    >
      <i className="fas fa-plus" />
    </button>
  );
};
