export const msalConfig = {
    auth: {
        clientId: "517f58de-faa9-4885-9536-5f2260a6c280",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};