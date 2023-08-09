/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useState } from "react";
import { Calendar } from "react-big-calendar";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { NavBar } from "../components/NavBar";
import { getMessagesEs, localizer } from "../helper/CalendarLocalizer";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { onDateModal } = useUiStore();
  const [lastView, setLastView] = useState<string>(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = () => {
    const style: CSSProperties = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event: any) => {
    setActiveEvent(event);
    onDateModal();
  };
  const onSelect = (event: any) => {
    setActiveEvent(event);
  };
  const onViewChanged = (event: any) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView as any}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 115px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent as any,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  );
};
