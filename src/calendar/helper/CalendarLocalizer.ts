import { format, getDay, parse, startOfWeek } from "date-fns";
import esEs from "date-fns/locale/es";
import { Messages, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  es: esEs,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const getMessagesEs = () => {
  const messages: Messages = {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total: number) => `+ Ver más (${total})`,
    work_week: "Semana_trabajo",
    yesterday: "Ayer",
    tomorrow: "Ma;ana",
  };
  return messages;
};
