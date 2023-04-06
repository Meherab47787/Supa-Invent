import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";



const useRedirectLoggedOutUser = (path) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const redirectLoggedOutuser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn.data))
      
      if(!isLoggedIn.data) {
        toast.info('Session expired, please log in to continue')
        navigate(path)
        return
      }
    }
    redirectLoggedOutuser();
  }, [navigate, path, dispatch])
}

export default useRedirectLoggedOutUser