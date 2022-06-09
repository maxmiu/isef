import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

export function RequireAuth(props: PropsWithChildren): JSX.Element {
    const isAuthenticated = useIsAuthenticated();

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return props.children as JSX.Element;
}