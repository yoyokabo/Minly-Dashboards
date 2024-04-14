import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";

global.atob = decode;

async function isLogged() {
  try {
    let value = await AsyncStorage.getItem(token).then(async (token) => {
      if (token) {
        const decoded = await jwtDecode(token);
        const expires = decoded.exp;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < Number(expires)) {
          return true;
        }
      }
      return false;
    });
    console.log(value);
    return value;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default isLogged;
