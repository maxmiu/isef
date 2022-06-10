import React, { useContext } from "react";
import { Role } from "../../../shared/role";

export const roleKey = "role";

export function useRole() {
    const {role, setRole} = useContext(RoleContext);
    return {role, setRole};
}

export type RoleContextType = {
    role: Role | null,
    setRole: (r: Role) => void
}

export const RoleContext = React.createContext<RoleContextType>({
    role: null,
    setRole: (_) => { }
});


