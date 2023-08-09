/* eslint-disable @typescript-eslint/no-explicit-any */

import { CalendarEventType } from "../types/CalendarEvent";

export const CalendarEvent = (props: any) => {
  const event: CalendarEventType = props.event;
  return (
    <>
      <strong>{event.title}</strong>
      <span>-{event.user?.name}</span>
    </>
  );
};
