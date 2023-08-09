import { useDispatch, useSelector } from "react-redux";
import { CalendarEventType } from "../calendar/types/CalendarEvent";
import {
  onAddNewEvent,
  onDeleteNewEvent,
  onSetActiveEvent,
  onUpdateNewEvent,
} from "../store/calendar/calendarSlice";
import { RootState } from "../store/store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const dispatch = useDispatch();
  const setActiveEvent = (event: CalendarEventType | null) => {
    dispatch(onSetActiveEvent(event));
  };

  const startSavingEvent = async (event: CalendarEventType) => {
    if (event._id) {
      dispatch(onUpdateNewEvent({ ...event }));
    } else {
      dispatch(onAddNewEvent({ ...event, _id: new Date() }));
    }
  };

  const deleteEvent = async () => {
    dispatch(onDeleteNewEvent());
  };
  return {
    //properties
    events,
    activeEvent,
    hasDeletedEvent: !!activeEvent,
    //methods
    setActiveEvent,
    startSavingEvent,
    deleteEvent,
  };
};
