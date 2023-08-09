import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {
  const { deleteEvent, hasDeletedEvent } = useCalendarStore();
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={(e) => {
        e.preventDefault();
        deleteEvent();
      }}
      style={{
        display: hasDeletedEvent ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
