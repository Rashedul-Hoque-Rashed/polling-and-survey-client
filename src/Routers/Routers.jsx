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
import SurveyResponse from "../Pages/Dashboard/SurveyResponse/SurveyResponse";
import CreateSurvey from "../Pages/Dashboard/CreateSuevey/CreateSurvey";
import MySurvey from "../Pages/Dashboard/MySurvey/MySurvey";
import Update from "../Pages/Dashboard/Update/Update";
import Feedback from "../Pages/Dashboard/Feedback/Feedback";
import PrivateRouter from "./PrivateRouter";
import AdminRouter from "./AdminRouter";
import SurveyorRouter from "./SurveyorRouter";


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
                loader: ({ params }) => fetch(`http://localhost:5000/surveys/${params.id}`)
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
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        children: [
            {
                path: '/dashboard/manageUsers',
                element: <AdminRouter><ManageUsers /></AdminRouter>
            },
            {
                path: '/dashboard/surveyStatus',
                element: <AdminRouter><SurveyStatus /></AdminRouter>
            },
            {
                path: '/dashboard/allPayments',
                element: <AdminRouter><AllPayments /></AdminRouter>
            },
            {
                path: '/dashboard/surveyResponse',
                element: <SurveyResponse />
            },
            {
                path: '/dashboard/createSurvey',
                element: <SurveyorRouter><CreateSurvey /></SurveyorRouter>
            },
            {
                path: '/dashboard/mySurvey',
                element: <SurveyorRouter><MySurvey /></SurveyorRouter>
            },
            {
                path: '/dashboard/mySurvey/update/:id',
                element: <SurveyorRouter><Update /></SurveyorRouter>,
                loader: ({ params }) => fetch(`http://localhost:5000/surveys/${params.id}`)
            },
            {
                path: '/dashboard/feedback',
                element: <SurveyorRouter><Feedback /></SurveyorRouter>
            },
        ]
    }
]);

export default router;