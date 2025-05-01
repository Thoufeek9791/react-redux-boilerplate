import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../slice/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, userType } = useSelector((state) => state.auth);

  const loginUser = (token, userType) => {
    dispatch(login({ token, userType }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { token, userType, loginUser, logoutUser };
};
