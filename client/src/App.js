import { Routes, Route } from "react-router-dom";
import './App.css';
import Clinique from "./components/Clinique";



function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/clinique" element={<Clinique />}> </Route>
         </Routes>
    </div>
  );
}

export default App;
