import axios from "axios";


const instance = axios.create({
    baseURL: 'https://b8a12-server-side-rashedul-hoque-rashed.vercel.app',
    withCredentials: true
  });

const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;