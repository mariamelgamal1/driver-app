import React, { useState, useEffect } from "react";
import { containerStyle, submitButtonStyle, loginStyle, inputStyle, titleStyle, textStyle } from "./styles";
import useLocalStorage from '../../hooks/useLocalStorage';
import useInput from '../../hooks/useInput';
import { loginUser } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useInput('');
  const password = useInput('');
  const [orgId, setOrganizationId] = useLocalStorage('orgId', null);
  const [userId, setUserId] = useLocalStorage('userId', null);
  const [, setEmail] = useLocalStorage('email', null);
  const [userName, setUserName] = useLocalStorage('userName', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTryingToLogin, setIsTryingToLogin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await token;
      if (token) {
        if (userName || email.value) {
          const NewUserName = userName?.replace(/"/g, '');
          const newEmail = email.value?.replace(/"/g, '');
          userName && window?.$crisp?.push(['set', 'user:name', NewUserName]);
          userName && window?.$crisp?.push(['set', 'user:nickname', NewUserName]);
          email.value && window?.$crisp?.push(['set', 'user:email', newEmail]);
        }
        navigate('/drivers');
      } else {
        return;
      }
    };
    checkAuthStatus();
  }, [token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsTryingToLogin(true);
    await loginUser({
      email: email.value,
      password: password.value,
      setUserName,
      setToken,
      setUserId,
      setOrganizationId,
      setEmail,
    });
    setIsTryingToLogin(false);
  };

  return (
    <div style={containerStyle}>
      <div className="loginform" style={loginStyle}>
        <div className="title" style={titleStyle}>Sign in to your account</div>
        <div className="inputs">
          <form onSubmit={handleFormSubmit} style={{ textAlign: 'center', width: '100%' }}>
            <p style={textStyle}>Email</p>
            <input
              type="text"
              name="email"
              value={email.value}
              onChange={email.onChange}
              style={inputStyle}
            />
            <p style={textStyle}>Password</p>
            <input
              type="password"
              name="password"
              value={password.value}
              onChange={password.onChange}
              style={inputStyle}
            />
            <input
              type="submit"
              value="Submit"
              style={submitButtonStyle}
              disabled={isTryingToLogin}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
