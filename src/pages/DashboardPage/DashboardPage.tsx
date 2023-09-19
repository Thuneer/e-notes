import React from 'react';

import { Container } from '../../components/Container/Container';
import { QuoteGenerator } from '../../components/QuoteGenerator/QuoteGenerator';
import { QuoteList } from '../../components/QuoteList/QuoteList';

import classes from './DashboardPage.module.css';

export const DashboardPage = () => {
  return (
    <div>
      <Container className={classes.container}>
        <QuoteGenerator />
        <QuoteList />
      </Container>
    </div>
  );
};
