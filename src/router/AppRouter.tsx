import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";

export const AppRouter = () => {
  const authenticated = true;
  return (
    <Routes>
      {authenticated ? (
        <Route path="/*" element={<CalendarPage />} />
      ) : (
        <Route path="/auth/*" element={<LoginPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
