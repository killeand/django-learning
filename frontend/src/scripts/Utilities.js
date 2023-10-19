export function TokensExist() {
    let authtoken = localStorage.getItem("TEST-AUTH") || sessionStorage.getItem("TEST-AUTH");
    let reftoken = localStorage.getItem("TEST-REFRESH") || sessionStorage.getItem("TEST-REFRESH");

    return (authtoken != null && reftoken != null);
}

export function ClearTokens() {
    localStorage.removeItem("TEST-AUTH");
    localStorage.removeItem("TEST-REFRESH");
    sessionStorage.removeItem("TEST-AUTH");
    sessionStorage.removeItem("TEST-REFRESH");
}

export function TokenType() {
    if (localStorage.getItem("TEST-REFRESH") != null) return localStorage;
    if (sessionStorage.getItem("TEST-REFRESH") != null) return sessionStorage;
    return null;
}