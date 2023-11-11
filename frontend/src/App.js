import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singup from "./pages/signup_page";
import SignIn from "./pages/signin_page";
import HomePage from "./pages/home_page";

function App() {
  const [userID, setUserID] = useState("652bfa1d28f920a97d04bce8");
  const [emailId, setemailId] = useState("geekrohitking@gmail.com");
  return (
    // <div>
    //   <Singup setUserID={setUserID} />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Singup />} />
        <Route
          path="signin"
          element={<SignIn setUserID={setUserID} setemailId={setemailId} />}
        />
        <Route
          path="homepage"
          element={<HomePage userID={userID} emailId={emailId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
