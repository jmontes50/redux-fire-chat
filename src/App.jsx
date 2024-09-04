import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import ChatView from "./views/ChatView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/chat" element={<ChatView />} />
    </Routes>
  );
};

export default App;
