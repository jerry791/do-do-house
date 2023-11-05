import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './Components/Homepage';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Shop from "./Components/Shop";
import Inspire from "./Components/Inspire";
import NotFound from "./Components/Not Found Page";
import { 
    BrowserRouter as Router,
    Switch,
    Routes,
    Link,
    Route
 } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
//  路徑錯誤畫面
const Err=()=><h2>404</h2>

root.render(
    <Router>
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Signup' element={<Signup />}/>
            <Route path='/Shop' element={<Shop />}/>
            <Route path='/Inspire' element={<Inspire />}/>
            {/* 找不到路徑時，跳轉此頁面 */}
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
);