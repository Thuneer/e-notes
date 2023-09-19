import React from 'react';
import { Paragraph, Button } from '@digdir/design-system-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../../firebase';
import { useAppDispatch } from '../../store/hooks';
import { deleteQuote } from '../../store/reducers/quoteReducer';

import classes from './Quote.module.css';

type QuoteType = {
  content: string;
  author: string;
  id: string;
};

export const Quote = ({ content, author, id }: QuoteType) => {
  const dispatch = useAppDispatch();

  const onDeletBtnClicked = async () => {
    const quoteRef = collection(db, 'quotes');
    const q = query(quoteRef, where('_id', '==', id));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      deleteDoc(doc.ref);
      dispatch(deleteQuote(id));
    });
  };

  return (
    <div className={classes.quote}>
      <Button
        className={classes.deleteBtn}
        variant='quiet'
        color='secondary'
        icon={<XMarkIcon />}
        onClick={() => onDeletBtnClicked()}
      ></Button>
      <Paragraph>{content}</Paragraph>
      <Paragraph
        className={classes.author}
        size='small'
      >
        {author}
      </Paragraph>
    </div>
  );
};
