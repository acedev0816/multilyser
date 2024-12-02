import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, redirectTo ,children}) => {
	 
    
	return !isAuthenticated
		? <Navigate to ={redirectTo}/>
		: children
  };
 
export default ProtectedRoute;

