import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Login from './Pages/Login/login.jsx';
import Register from './Pages/Register/register.jsx';
import Upload from './Pages/Upload/upload.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/Upload" element={<Upload />} />
            </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
