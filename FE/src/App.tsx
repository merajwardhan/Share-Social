import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Default fallback to all the invalid pages */}
        <Route
          path="*"
          element={<div className="text-center pt-20">Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
