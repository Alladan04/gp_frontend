import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Operation from "./components/Operation/OperationPage.tsx";
//import Operations from "./components/Operations/OperationsPage.tsx";
//import ReactDOM from "react-dom/client";
import OperationPage from "./page/OperationPage/OperationPage"
function App() {


  return (
    
    <BrowserRouter basename = '/gp_frontend'>
            <Routes>
               
                <Route path="operation/:id" element={<OperationPage/>} />
            </Routes>
    </BrowserRouter>
  )
}

export default App
