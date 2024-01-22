/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.createRoot(document.getElementById('myroot')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
//import Operations from "./pages/OperationsPage/OperationsPage.tsx";
import OperationPage from "./page/OperationPage/OperationPage.tsx"
import OperationsPage from "./page/OperationsPage/OperationsPage.tsx"
import LoginPage from "./page/LoginPage/LoginPage.tsx";
//import Breaches from "./pages/BreachesPage/BreachesPage.tsx";
import ReactDOM from "react-dom/client";
//import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Provider } from "react-redux";
import store from "./slices/store.ts";
import "./page/OperationPage/OperationPage.css"
//import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
//import Navbar from "./components/Navbar/Navbar.tsx";
//import "./styles/styles.scss"
//import BreachPage from "./pages/BreachPage/BreachPage";
import {QueryClient, QueryClientProvider} from "react-query";
import ProfilePage from "./page/ProfilePage/ProfilePage.tsx";
import RequestPage from "./page/RequestPage/RequestPage.tsx";
import RequestsPage from "./page/RequestsPage/RequestsPage.tsx";
import OperationsAdminPage from "./page/OperationsAdminPage/OperationsAdminPage.tsx";
import OperationEdit from "./page/OperationEditPage/OperationEditPage.tsx";
import OperationAddPage from "./page/OperationAddPage/OperationAddPage.tsx";
import MyNavbar from "./components/NavBar/NavBar.tsx";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs.tsx";
import SignUpPage from "./page/SignUpPage/SignUpPage.tsx";
//import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";

const root = ReactDOM.createRoot(
    document.getElementById('myroot') as HTMLElement
);
console.log("in main")
const queryClient = new QueryClient()
/*<Route path="fines/" element={<Operations/>}/>
                        <Route path="breaches/" element={<Breaches/>}/>
                        <Route path="breaches/draft/" element={<BreachPage/>}/>
                        <Route path="login/" element={<LoginPage/>}/>
                        <Route path="profile/" element={<ProfilePage/>}/> */
root.render(
    <QueryClientProvider client={queryClient}>

        <Provider store={store}>

            <BrowserRouter >
                <MyNavbar ></MyNavbar>
                <BreadCrumbs></BreadCrumbs>

                    <Routes>
                        <Route path="/" element={<Navigate to="/operation" replace />} />
                        <Route path="/operation" element={<OperationsPage/>}/>
                        <Route path="operation/:id" element={<OperationPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="profile/" element={<ProfilePage/>}/> 
                        <Route path="request/:id" element={<RequestPage/>}/> 
                        <Route path = "request/" element = {<RequestsPage/>}/>
                        <Route path = "operation/edit" element = {<OperationsAdminPage/>}/>
                        <Route path = "operation/edit/:id" element = {<OperationEdit/>}/>
                        <Route path = "operation/add" element = {<OperationAddPage/>}/>
                        <Route path = "signup" element = {<SignUpPage/>}/>
                        <Route path="*" element={<p>Path not resolved</p>} />
                    </Routes>

              
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);