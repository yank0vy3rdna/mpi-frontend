import Parent from "../routes/parent";
import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "../routes/home";
import AnonymousRoleChecker from "../components/roleChecker/anonymous";
import Login from "../routes/anonymous/login";
import Register from "../routes/anonymous/register";
import UserRoleChecker from "../components/roleChecker/user";
import Orders, {OrdersLoader} from "../routes/user/orders";
import {Order as CourierOrders, OrdersLoader as CourierOrdersLoader} from "../routes/courier/order";
import Units, {UnitsLoader} from "../routes/user/units";
import Unit, {UnitLoader} from "../routes/user/unit";
import Cart, {CartLoader} from "../routes/user/cart";
import OwnerRoleChecker from "../components/roleChecker/owner";
import CourierRoleChecker from "../components/roleChecker/courier";
import React from "react";
import HireCourier, {HireCourierLoader} from "../routes/user/hireCourier";
import NewCourier from "../routes/owner/newCourier";

const basePath = "/"
const homePartialPath = ""

// anonymous
const anonymousPath = ""
const loginPartialPath = "login/"
const registerPartialPath = "register/"

// user
const userRolePartialPath = "user/"
const ordersPartialPath = "orders/"
const unitsPartialPath = "units/"
const cartPartialPath = "cart/"
const hireCourierPartialPathBuilder = (x: string) => `orders/${x}/hireCourier`
const unitPartialPathBuilder = (x: string) => `units/${x}`
const hireCourierPartialPath = hireCourierPartialPathBuilder(":orderId")
const unitPartialPath = unitPartialPathBuilder(":unitId")

// owner
const ownerRolePartialPath = "owner/"
const newCourierPartialPath = "newCourier"

// courier
const courierRolePartialPath = "courier/"
const courierOrdersPartialPath = "orders/"


const fullPaths = {
    homePath: basePath + homePartialPath,

    // anonymous
    loginPath: basePath + anonymousPath + loginPartialPath,
    registerPath: basePath + anonymousPath + registerPartialPath,

    // user
    ordersPath: basePath + userRolePartialPath + ordersPartialPath,
    unitsPath: basePath + userRolePartialPath + unitsPartialPath,
    cartPath: basePath + userRolePartialPath + cartPartialPath,
    unitPathBuilder: (x: string) => basePath + userRolePartialPath + unitPartialPathBuilder(x),
    hireCourierPathBuilder: (x: string) => basePath + userRolePartialPath + hireCourierPartialPathBuilder(x),

    // owner
    newCourierPath: basePath + ownerRolePartialPath + newCourierPartialPath,

    // courier
    courierOrdersPath: basePath + courierRolePartialPath + courierOrdersPartialPath
}

const routes = [{
    path: basePath,
    element: <Parent><Outlet/></Parent>,
    children: [
        {
            path: homePartialPath,
            element: <Home/>
        },
        {
            path: anonymousPath,
            element: <AnonymousRoleChecker><Outlet/></AnonymousRoleChecker>,
            children: [
                {
                    path: loginPartialPath,
                    element: <Login/>,
                },
                {
                    path: registerPartialPath,
                    element: <Register/>
                },
            ],
        },
        {
            path: userRolePartialPath,
            element: <UserRoleChecker><Outlet/></UserRoleChecker>,
            children: [
                {
                    path: ordersPartialPath,
                    element: <Orders/>,
                    loader: OrdersLoader
                },
                {
                    path: hireCourierPartialPath,
                    element: <HireCourier/>,
                    loader: HireCourierLoader
                },
                {
                    path: unitsPartialPath,
                    element: <Units/>,
                    loader: UnitsLoader,
                },
                {
                    path: unitPartialPath,
                    element: <Unit/>,
                    loader: UnitLoader,
                },
                {
                    path: cartPartialPath,
                    element: <Cart/>,
                    loader: CartLoader,
                }
            ],
        },
        {
            path: ownerRolePartialPath,
            element: <OwnerRoleChecker><Outlet/></OwnerRoleChecker>,
            children: [
                {
                    path: newCourierPartialPath,
                    element: <NewCourier/>,
                }
            ],
        },
        {
            path: courierRolePartialPath,
            element: <CourierRoleChecker><Outlet/></CourierRoleChecker>,
            children: [
                {
                    path: courierOrdersPartialPath,
                    element: <CourierOrders/>,
                    loader: CourierOrdersLoader
                },
            ],
        },
    ],
}]

export const router = createBrowserRouter(routes, {
    basename: "",
});

export default fullPaths;