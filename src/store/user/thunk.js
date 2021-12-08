/* eslint-disable no-unused-vars */
import { clearStorage } from '../../helpers/clearStorage';
import { saveUserToStorage, saveRoleToStorage } from '../../helpers/saveToStorage';
import { getUserRole, performLogin, performLogout } from '../../services';
import { userLogin, userLogout } from './actionCreators';

export const userLoginThunk = userData => async dispatch => {
  const loginRes = await performLogin(...userData);
  if (!loginRes.successful) {
    alert(loginRes.result);
    return;
  }
  saveUserToStorage(loginRes.user.name, loginRes.user.email, loginRes.result);

  const response = await getUserRole(loginRes.result);
  const role = response.successful ? response.result.role : '';

  saveRoleToStorage(role);

  dispatch(userLogin({
    name: loginRes.user.name || '',
    email: loginRes.user.email,
    token: loginRes.result,
    role,
  }));
};

export const userLogoutThunk = () => async (dispatch, getState) => {
  const { user } = getState();
  const response = await performLogout(user.token);
  if (response.ok) {
    clearStorage();
    dispatch(userLogout());
  } else {
    alert('something went wrong');
  }
};
