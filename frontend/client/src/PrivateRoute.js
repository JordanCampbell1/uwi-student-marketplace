import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ children}) => {
    const user=useSelector(state=>state.User);
    if (user) {
      return children
    }
    return <Navigate to="/login" replace={true} />
  }
export default PrivateRoute