import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { User } from "../../../shared/user";

const loginRequest = {
    scopes: ["User.Read"]
};

const unknownUser: User = {name: "unknown", email: "unknown@example.com"};

export const useAuthentication = () => {
    const isAuthenticated = useIsAuthenticated();
    const account = useAccount();
    const user: User = account ? {email: account.username, name: account.name ?? account.username} : unknownUser;
    const {instance} = useMsal();

    const logout = () => instance.logoutPopup().catch(console.error);
    const login = () => instance.loginPopup(loginRequest)
      .then((res) => instance.setActiveAccount(res.account))
      .catch(console.error);

    return {isAuthenticated, login, logout, user};
}