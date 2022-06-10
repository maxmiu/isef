import { ReactNode, useState } from "react";
import { RoleContext, roleKey } from "../hooks/useRole";
import { Role } from "../../../shared/role";

const getInitialRole = (): Role => {
    const initialValue = localStorage.getItem(roleKey)
    return initialValue ? JSON.parse(initialValue) as Role : "Student";
}

export function RoleProvider(props: { children: ReactNode }) {
    const [role, setRole] = useState<Role | null>(getInitialRole);
    const contextValue = {role, setRole};

    return (
      <RoleContext.Provider value={contextValue}>
          {props.children}
      </RoleContext.Provider>)
}
