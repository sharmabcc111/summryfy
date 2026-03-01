import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/Home";
import Register from "./assets/Register";
import UploadPage from "./assets/UploadPage";
import SummaryPage from "./assets/SummaryPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/auth" element={<Register />} />
          <Route path="/upload" element={<UploadPage />} />
           <Route path="/summary/:id" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;