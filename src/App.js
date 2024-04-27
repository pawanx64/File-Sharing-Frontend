import './App.css';
import {Home} from './Pages/Home'
import { Routes,Route } from 'react-router-dom';
import { Upload } from './Pages/Upload';
import { About } from './Pages/About';

function App() {
  return (
    <div>
      
        <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/Upload"  element={<Upload/>} />
              <Route path="/About"  element={<About/>} />
              
        </Routes>
      
    </div>
  );
}

export default App;
