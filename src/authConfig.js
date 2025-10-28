export const msalConfig = {
  auth: {
    clientId: "a2fd7e7f-2a4b-4f3f-aa07-c099deaa6a3e",
    authority: "https://login.microsoftonline.com/8e21bfe2-a2c0-46ee-a4d9-1759f7df45b7",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
