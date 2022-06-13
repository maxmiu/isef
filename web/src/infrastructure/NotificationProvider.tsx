import { Alert, AlertColor, Snackbar } from "@mui/material";

import React, { ReactNode, useContext, useState } from "react";

export type Notification = {
    severity: AlertColor,
    message: string
}

export function useNotification() {
    const {notification, setNotification: showNotification} = useContext(NotificationContext);
    return {notification, showNotification};
}

export const NotificationContext = React.createContext<NotificationContextType>({
    notification: null,
    setNotification: (_: Notification) => {}
});

type NotificationContextType = {
    notification: Notification | undefined | null,
    setNotification: (n: Notification) => void
}

export function NotificationProvider(props: { children: ReactNode }) {
    const [notification, setNotification] = useState<Notification | undefined>();
    const contextValue = {notification: notification, setNotification: (n: Notification) => setNotification(n)}

    const clearNotification = () => setNotification(undefined);

    return (
      <NotificationContext.Provider value={contextValue}>
          <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open={notification !== undefined}
                    autoHideDuration={6000}
                    onClose={clearNotification}>
              <Alert hidden={!notification} severity={notification?.severity}>
                  {notification?.message}
              </Alert>
          </Snackbar>
          {props.children}
      </NotificationContext.Provider>
    )
}