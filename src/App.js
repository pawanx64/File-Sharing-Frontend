import './App.css';
import {Home} from './Pages/Home'
import { Routes,Route } from 'react-router-dom';
import { Upload } from './Pages/Upload';
import { About } from './Pages/About';
import {Download} from './Pages/Download';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import  MyFiles  from './Pages/MyFiles';
import  Changepassword from './Pages/Changepassword';
import ForgotPassword from './Pages/ForgetPassword';
function App() {
  return (
        <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/Upload"  element={<Upload/>} />
              <Route path="/About"  element={<About/>} />
              <Route path="/download/:id"  element={<Download/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/my-files" element={<MyFiles />} />
              <Route path="/changepassword" element={<Changepassword />} />
              <Route path="/forgetpassword" element={<ForgotPassword />} />
        </Routes>
    
  );
}

export default App;