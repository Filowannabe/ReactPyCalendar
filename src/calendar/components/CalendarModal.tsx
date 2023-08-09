import { differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import { CalendarEventType } from "../types/CalendarEvent";
registerLocale("es", es);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { setActiveEvent, activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValue, setFormValue] = useState<CalendarEventType>({
    title: "",
    notes: "",
    start: new Date(),
    end: new Date(),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValue.title.length > 0 ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent) setFormValue({ ...activeEvent });
  }, [activeEvent]);

  const onCloseModal = () => {
    setActiveEvent(null);
    closeDateModal();
  };
  const onInputChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValue.end, formValue.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar", "error");
      return;
    }
    if (formValue.title.length <= 0) {
      return;
    }
    const calendarEvent: CalendarEventType = {
      _id: formValue._id,
      end: formValue.end,
      notes: formValue.notes,
      start: formValue.start,
      title: formValue.title,
    };
    await startSavingEvent(calendarEvent);
    closeDateModal();
  };
  const onDateChange = (date: Date | null, changign: string) => {
    if (!date) return;

    setFormValue({
      ...formValue,
      [changign]: date,
    });
  };
  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            selected={formValue.start}
            onChange={(date) => onDateChange(date, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale={"es"}
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValue.start}
            className="form-control"
            selected={formValue.end}
            onChange={(date) => onDateChange(date, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale={"es"}
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValue.title}
            onChange={(e) => onInputChange(e)}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValue.notes}
            onChange={(e) => onInputChange(e)}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
