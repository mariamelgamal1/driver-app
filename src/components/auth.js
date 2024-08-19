import { noop } from 'lodash';
import apiClient from './login/apiClient';

export const authErrorsEnum = {
  invalidLoginEmail: 'Could not find a user associated with that email!',
  invalidLoginPassword: 'You’ve entered the wrong password',
};

export const loginUser = async ({
  email = '',
  password = '',
  setToken = () => noop,
  setUserId = () => noop,
  setUserName = () => noop,
  setOrganizationId = () => noop,
  setEmail = () => noop,
}) => {
  try {
    const userCredentials = {
      user: {
        email: email,
        password: password,
      },
    };

    const { data } = await apiClient.post(`/user_supplier_auth/sign_in`, userCredentials);
    console.log(data)
    const authToken = data?.token;
    const userId = data?.user?.data?.id;
    const userName = data?.user?.data?.attributes?.name;
    const organizationId = data?.user?.data?.attributes?.organizationId;
    const organizationName = data?.user?.data?.attributes?.organizationName;
    setOrganizationId(organizationId);
    setToken(authToken);
    setUserId(userId);
    setUserName(userName);
    setEmail(email);
   
    return;
  } catch (error) {
    const errorMessage = error.response?.data?.errors?.[0]?.title || 'An error occurred during login';
    if (errorMessage === 'Email or/and password are worng!') {
      console.log(authErrorsEnum.invalidLoginPassword);
    } else if (errorMessage === 'Could not find a user associated with that email!') {
      console.log(authErrorsEnum.invalidLoginEmail);
    } else {
      console.log(errorMessage);
    }
  }
};
