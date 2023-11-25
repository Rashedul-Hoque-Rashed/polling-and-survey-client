import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Survey from "../Pages/Survey/Survey";
import ProUser from "../Pages/ProUser/ProUser";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";


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
        ]
    },
]);

export default router;