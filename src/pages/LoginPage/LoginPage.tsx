import React from 'react';

import { LoginForm } from '../../components/LoginForm/LoginForm';

import classes from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <div className={classes.page}>
      <LoginForm />
    </div>
  );
};
