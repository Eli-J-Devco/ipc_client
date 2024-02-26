// Desc: Error handling for the client
export const LoginErrors = (err) => {
  if (!err?.response) {
    return "No Server Response";
  } else if (err.response?.status === 400) {
    return "Missing Username or Password";
  } else if (err.response?.status === 401 || err.response?.status === 403) {
    return "Unauthorized";
  } else {
    return "Login Failed";
  }
};
