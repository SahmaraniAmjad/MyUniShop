import jwtDecode from "jwt-decode";

export const isAdmin = () => {
  const data = jwtDecode(localStorage.getItem('token'));
  if (data !== null && data !== '') {
    return data.isAdmin === 1;
  }
}