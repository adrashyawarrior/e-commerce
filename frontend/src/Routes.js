import Logout from './admin/components/auth/Logout'
import UserIndex from './admin/components/users/UserIndex';


const protectedRoutes = [
    {
        path: "/",
        element: <h1>Welcome User.</h1>,
    },
    {
        path: "/products",
        element: <h1>Products.</h1>,
    },
    {
        path: "/users",
        element: <UserIndex />,
    },
    {
        path: "/logout",
        element: <Logout />,
    }
];

export default protectedRoutes