import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import useHttp from './http-hook';

const useLogout = () => {
  const { sendRequest: logoutUser } = useHttp();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    const logoutStatus = (data) => {
      if (data.status === 'success') {
        toast.success('You have successfully logged out');
        navigate('/auth');
        dispatch(authActions.setIsLoggedIn(false));
      } else {
        toast.error('Something went wrong!');
      }
    };

    logoutUser(
      {
        url: 'http://192.168.0.106:3000/api/v1/users/logout',
      },
      logoutStatus
    );

    navigate('/auth', { replace: true });
  };

  return {
    logout,
  };
};

export default useLogout;
