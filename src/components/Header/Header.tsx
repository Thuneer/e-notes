import React from 'react';
import { Link, Button } from '@digdir/design-system-react';
import { LeaveIcon, EnterIcon, PersonIcon } from '@navikt/aksel-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { Container } from '../Container/Container';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth, db } from '../../firebase';
import { setUser } from '../../store/reducers/userReducer';
import { addQuote } from '../../store/reducers/quoteReducer';

import classes from './Header.module.css';

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onAddNoteClicked = async () => {
    try {
      await addDoc(collection(db, 'notes'), {
        title: 'title',
        description: 'desc',
      });
      dispatch(
        addQuote({
          title: 'ffff',
          description: 'rrrrrrr',
        }),
      );
    } catch (error) {
      // Handle error
    }
  };

  const onLogoutClicked = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        dispatch(
          setUser({
            email: '',
            auth: false,
          }),
        );
      })
      .catch(() => {
        // Handle error
      });
  };

  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.left}>
          <RouterLink to='/'>
            <img
              src='logo.svg'
              alt=''
            />
          </RouterLink>
        </div>

        <div className={classes.right}>
          {user.auth && (
            <>
              <Button
                variant='quiet'
                color='secondary'
                onClick={() => onAddNoteClicked()}
              >
                <PersonIcon fontSize={24} /> {user.email}
              </Button>
              <Button
                variant='quiet'
                color='secondary'
                onClick={() => onLogoutClicked()}
              >
                <LeaveIcon fontSize={24} /> Logg ut
              </Button>
            </>
          )}
          {!user.auth && (
            <Link
              as={RouterLink}
              to='/login'
              className={classes.link}
            >
              <EnterIcon fontSize={24} /> Logg inn
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};
