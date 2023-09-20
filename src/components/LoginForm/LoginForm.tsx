import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Heading,
  ErrorMessage,
  Alert,
  Paragraph,
} from '@digdir/design-system-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { setUser } from '../../store/reducers/userReducer';
import { useAppDispatch } from '../../store/hooks';

import classes from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Skriv inn en gyldig e-post addresse.')
    .required('E-post feltet er påkrevd.'),
  password: Yup.string()
    .min(8, 'Passordet må være minst 8 tegn.')
    .required('Passord feltet er påkrevd.'),
});

const initialValues = {
  email: '',
  password: '',
};

type ValuesType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firebaseAuthError, setFirbaseAuthError] = useState(false);

  const tryToLoginUser = async (values: ValuesType) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      dispatch(
        setUser({
          email: values.email,
          auth: true,
        }),
      );
      navigate('/dashboard');
    } catch (e) {
      setFirbaseAuthError(true);
    }
  };

  return (
    <div className={classes.form}>
      {firebaseAuthError && (
        <Alert
          severity='danger'
          className={classes.alert}
        >
          <Paragraph>Feil brukernavn eller passord.</Paragraph>
        </Alert>
      )}

      <Heading
        level={1}
        size='small'
        className={classes.heading}
      >
        Logg inn
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => tryToLoginUser(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name='email'
              label='E-post'
            />

            {errors.email && touched.email ? (
              <ErrorMessage
                size='small'
                className={classes.errorText}
              >
                {errors.email}
              </ErrorMessage>
            ) : null}

            <Field
              as={TextField}
              name='password'
              label='Passord'
              type='password'
            />

            {errors.password && touched.password ? (
              <ErrorMessage
                className={classes.errorText}
                size='small'
              >
                {errors.password}
              </ErrorMessage>
            ) : null}

            <Button
              type='submit'
              fullWidth
              className={classes.button}
            >
              Logg inn
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
