import React from 'react';
import { Heading } from '@digdir/design-system-react';

import classes from './Banner.module.css';

export const Banner = () => {
  return (
    <header className={classes.imgContainer}>
      <div className={classes.box}>
        <Heading size='large'>
          Lag deg ei liste over dei beste sitata som fins!
        </Heading>
      </div>
    </header>
  );
};
