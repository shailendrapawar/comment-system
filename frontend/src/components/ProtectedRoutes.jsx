import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        // loader  until user token found
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        // user not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // user exists, render childrn
    return children;
};

export default ProtectedRoute