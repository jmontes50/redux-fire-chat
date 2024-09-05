import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuthListener } from "./app/auth/authSlice";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginView from "./views/LoginView";
import ChatView from "./views/ChatView";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
