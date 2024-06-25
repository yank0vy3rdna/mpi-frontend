import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    RouterProvider,
} from "react-router-dom";
import LoadingFallback from "./routes/loadingFallback";
import {router} from "./router/routes";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} fallbackElement={<LoadingFallback/>}/>
);

