export const TOKEN_STORAGE_KEY = "token";

export const setToken = (data) => {
  window.sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data));
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    let token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      token = JSON.parse(token);
    }

    return token;
  } else {
    console.log("You are on the server");
  }
};

export const getRefresh = () => {
  if (typeof window !== "undefined") {
    let token = window.sessionStorage.getItem("refresh");
    if (token) {
      token = JSON.parse(token);
    }
    return token;
  } else {
    console.log("You are on the server");
  }
};

export const clearToken = () => {
  window.sessionStorage.removeItem("claim");
  window.sessionStorage.removeItem("refresh");
};
