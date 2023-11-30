import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../config/firebase.config";


const instance = axios.create({
  baseURL: 'https://b8a12-server-side-rashedul-hoque-rashed.vercel.app',
  withCredentials: true
});

const useAxios = () => {
  
  instance.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      await signOut(auth);

    }
    return Promise.reject(error);
  });

  return instance
};

export default useAxios;