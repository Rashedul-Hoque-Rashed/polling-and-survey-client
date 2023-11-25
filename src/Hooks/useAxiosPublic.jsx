import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
  });

const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;