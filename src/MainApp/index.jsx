import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { OperationsPage } from "./pages/Operation";
import { RecordsPage } from "./pages/Records";
import { NavBar } from "./components/Navbar";

export const MainApp = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/records" element={<RecordsPage />} />
        <Route exact path="/" element={<OperationsPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};
