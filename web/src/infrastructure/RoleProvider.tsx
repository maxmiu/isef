import { ReactNode, useEffect } from "react";
import { RoleContext, roleKey } from "../hooks/useRole";
import { Role } from "../../../shared/role";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function RoleProvider(props: { children: ReactNode }) {
    const [role, setRole] = useLocalStorage<Role>("role", "Student");
    const contextValue = {role, setRole};

    useEffect(() => {
        localStorage.setItem(roleKey, JSON.stringify(role));
    }, [role])

    return (
      <RoleContext.Provider value={contextValue}>
          {props.children}
      </RoleContext.Provider>)
};