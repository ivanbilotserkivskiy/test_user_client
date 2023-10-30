import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import TestsPage from "./pages/tests/TestsPage";
import TestPage from "./pages/test/TestPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import PrivateRoute from "./utils/PrivateRoute";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to={"/tests"} />} />
        <Route path="home" element={<Navigate to={"/tests"} />} />
        <Route path="tests" element={<PrivateRoute />}>
          <Route index element={<TestsPage />} />
          <Route path=":id" element={<TestPage />} />
        </Route>
        <Route path="login" element={<LoginPage />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
