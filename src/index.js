import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './Components/Homepage';
import ContactUs from "./Components/Contact us";
import Shop from "./Components/Shop";
import Inspire from "./Components/Inspire";
import Product from "./Components/Product";
import NotFound from "./Components/Not Found Page";
import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";
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
            <Route path='/do-do-house/' element={<Homepage />}/>
            <Route path='/do-do-house/Home' element={<Homepage />}/>
            <Route path='/do-do-house/Shop' element={<Shop />}/>
            <Route path='/do-do-house/Product' element={<Product />} />
            <Route path='/do-do-house/Inspire' element={<Inspire />}/>
            <Route path='/do-do-house/Contact us' element={<ContactUs />}/>
            <Route path='/do-do-house/Cart' element={<Cart />}/>
            <Route path="/do-do-house/CheckOut" element={<CheckOut/>}/>
            {/* 找不到路徑時，跳轉此頁面 */}
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
);