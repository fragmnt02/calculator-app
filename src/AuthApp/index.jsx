import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";

export const AuthApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};
