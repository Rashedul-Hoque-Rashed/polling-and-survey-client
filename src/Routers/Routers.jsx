import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Survey from "../Pages/Survey/Survey";
import ProUser from "../Pages/ProUser/ProUser";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import SurveyStatus from "../Pages/Dashboard/SurveyStatus/SurveyStatus";
import AllPayments from "../Pages/Dashboard/AllPayments/AllPayments";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/survey',
                element: <Survey />
            },
            {
                path: '/proUser',
                element: <ProUser />
            },
            {
                path: '/details/:id',
                element: <SurveyDetails />,
                loader: ({params}) => fetch(`http://localhost:5000/surveys/${params.id}`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: '/dashboard/manageUsers',
                element: <ManageUsers/>
            },
            {
                path: '/dashboard/surveyStatus',
                element: <SurveyStatus/>
            },
            {
                path: '/dashboard/allPayments',
                element: <AllPayments/>
            },
        ]
    }
]);

export default router;