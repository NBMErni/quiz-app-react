import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./features/ProtectedRoute";
import AuthRedirect from "./features/AuthRedirect";
import "./App.css";

// PAGES
import Login from "./Pages/Login/Login";
import Home from "./Pages/Homepage/Home";
import Admin from "./Pages/Admin/Admin";
import Examinee from "./Pages/Examinee/Examinee";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthRedirect redirectTo="/">
              <Login />
            </AuthRedirect>
          }
        />
        <Route path="/works" element={<HowItWorks />} />
        <Route
          path="/register"
          element={
            <AuthRedirect redirectTo="/">
              <Register />
            </AuthRedirect>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/examinee"
          element={
            <ProtectedRoute>
              <Examinee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
