import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { PacmanLoader } from 'react-spinners';


const PrivateRouter = ({children}) => {

    const {user, isLoading} = useContext(AuthContext);
    const location = useLocation();

    if(isLoading){
        return <PacmanLoader
        color="#016A70"
        cssOverride={{margin: '200px auto'}}
        margin={2}
        size={50}
    />
    }

    if(user){
        return children
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

PrivateRouter.propTypes = {
    children: PropTypes.node,
}

export default PrivateRouter;