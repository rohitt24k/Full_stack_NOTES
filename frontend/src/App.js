import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singup from "./pages/signup_page";
import SignIn from "./pages/signin_page";
import HomePage from "./pages/home_page";

function App() {
  return (
    // <div>
    //   <Singup setUserID={setUserID} />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Singup />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
