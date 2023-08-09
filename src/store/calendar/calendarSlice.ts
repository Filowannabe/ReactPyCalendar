import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { CalendarEventType } from "../../calendar/types/CalendarEvent";

const events: CalendarEventType = {
  _id: new Date().getTime(),
  title: "aaaaa",
  notes: "Hay que comprar",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "felipe",
  },
};

type InitialStateType = {
  events: CalendarEventType[];
  activeEvent: CalendarEventType | null;
};

const initialState: InitialStateType = {
  events: [events],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateNewEvent: (state, action) => {
      console.log(action.payload)
      state.events = state.events.map((it) => {
        if (it._id === action.payload._id) return action.payload;
        return it;
      });
    },
    onDeleteNewEvent: (state) => {
      state.events = state.events.filter(
        (it) => it._id !== state.activeEvent?._id
      );
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateNewEvent,
  onDeleteNewEvent,
} = calendarSlice.actions;
