import "./App.css";
import SigIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { TodoWrapper } from "./pages/TodoWrapper";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signin" element={<SigIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SigIn />} />
          <Route path="/addtask" element={<TodoWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
