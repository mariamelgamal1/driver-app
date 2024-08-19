import App1 from "./components/login";
import DriverTable from "./components/drivers/table";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverPage from "./components/drivers";
function App() {
  return ( 
     <Router>
    <Routes>
    <Route path="/" element={<App1/>} />
    <Route path="/drivers" element={<DriverPage/>} />
    </Routes>
    </Router>
  );
}

export default App;
