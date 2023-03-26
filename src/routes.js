import { Navigate, useRoutes } from "react-router-dom";
import React from 'react';
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

export default function Routes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to="/products" />,
        },
        {
            path: '/products',
            element: <ProductList />,
        },
        {
            path: '/products/:id',
            element: <ProductDetail />,
        },
    ]);
    return routes;
}