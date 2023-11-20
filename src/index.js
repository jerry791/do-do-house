import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './Components/Homepage';
import ContactUs from "./Components/Contact us";
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

root.render(
    <Router>
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/Home' element={<Homepage />}/>
            <Route path='/Shop' element={<Shop />}/>
            <Route path='/Inspire' element={<Inspire />}/>
            <Route path='/Contact us' element={<ContactUs />}/>
            {/* 找不到路徑時，跳轉此頁面 */}
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
);