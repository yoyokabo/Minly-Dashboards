import { jwtDecode } from "jwt-decode";
interface TokenData {
  _id: string;
  exp: number;
}

function isLogged(token: string | null): boolean {
  if (token) {
    const decoded = jwtDecode<TokenData>(token);
    const expires = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < Number(expires)) {
      return true;
    }
  }
  return false;
}

export default isLogged;
