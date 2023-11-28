import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useState } from "react";
import { PacmanLoader } from 'react-spinners';


const SurveyorRouter = ({children}) => {
    const {user, isLoading} = useContext(AuthContext);
    const location = useLocation();

    const axios = useAxiosPublic();
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [axios])

    const userRole = currentUser.find(role => role?.email === user?.email)

    if(isLoading){
        return <PacmanLoader
        color="#016A70"
        cssOverride={{margin: '200px auto'}}
        margin={2}
        size={50}
    />
    }

    if(user && userRole?.role === 'surveyor'){
        return children
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

SurveyorRouter.propTypes = {
    children: PropTypes.node,
}

export default SurveyorRouter;