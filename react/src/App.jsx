import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./Pages/AuthContext/ProtectedRoute.jsx";
import Login from "./Pages/Login/login.jsx";
import Register from "./Pages/Register/register.jsx";
import Upload from "./Pages/Upload/upload.jsx";
import Library from "./Pages/Library/library.jsx";
import Output from "./Pages/Output/output.jsx";
import { AuthProvider } from "./Pages/AuthContext/AuthContext.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />
              <Route path="/Upload" element={<Upload />} />
              <Route path="/Library" element={<Library />} />
              <Route path="/Output" element={<Output />} />

              {/* <Route path="/Upload" element={<ProtectedRoute><Upload /></ProtectedRoute>}/>
                  <Route path="/Library" element={<ProtectedRoute><Library /></ProtectedRoute>}/>
                  <Route path="/Output" element={<ProtectedRoute><Output /></ProtectedRoute>}/> */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
