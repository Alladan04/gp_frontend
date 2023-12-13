import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Operation from "./components/Operation/OperationPage.tsx";
import Operations from "./components/Operations/OperationsPage.tsx";
//import ReactDOM from "react-dom/client";

function App() {


  return (
    
    <BrowserRouter basename = '/gp_frontend'>
            <Routes>
                <Route path="operation/"  element={<Operations/>}/>
                <Route path="operation/:id" element={<Operation/>} />
            </Routes>
    </BrowserRouter>
  )
}

export default App
