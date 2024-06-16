import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";
import Parent from "./routes/parent";
import LoadingFallback from "./routes/loadingFallback";
import Home from "./routes/home";
import Login from "./routes/login";
import Couriers from "./routes/couriers";
import Units, {UnitsLoader} from "./routes/units";
import Orders, {OrdersLoader} from "./routes/orders";
import Unit, {UnitLoader} from "./routes/unit";
import Cart, {CartLoader} from "./routes/cart";

const router = createBrowserRouter([{
    path: "/",
    element: <Parent><Outlet/></Parent>,
    children: [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "login",
            element: <Login/>,
        },
        {
            path: "orders",
            element: <Orders/>,
            loader: OrdersLoader
        },
        {
            path: "couriers",
            element: <Couriers/>,
        },
        {
            path: "units",
            element: <Units/>,
            loader: UnitsLoader,
        },
        {
            path: "units/:unitId",
            element: <Unit/>,
            loader: UnitLoader,
        },
        {
            path: "cart",
            element: <Cart/>,
            loader: CartLoader,
        }
    ],
}], {
    basename: "",
});
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} fallbackElement={<LoadingFallback/>}/>
);

