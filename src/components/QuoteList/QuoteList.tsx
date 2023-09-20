import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Heading, Paragraph } from '@digdir/design-system-react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQuotes } from '../../store/reducers/quoteReducer';
import { db } from '../../firebase';
import { Quote } from '../Quote/Quote';

import classes from './QuoteList.module.css';

export const QuoteList = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector((state) => state.quotes);

  useEffect(() => {
    const setInitialNotes = async () => {
      const querySnapshot = await getDocs(collection(db, 'quotes'));
      const quoteArray = querySnapshot.docs.map((doc) => doc.data());
      console.log(quoteArray);
      dispatch(
        setQuotes({
          quotes: quoteArray,
        }),
      );
    };

    setInitialNotes();
  }, [dispatch]);

  return (
    <div className={classes.list}>
      <Heading size='medium'>Mine lagra sitat</Heading>
      <div className={classes.grid}>
        {quotes.quotes.length === 0 && (
          <Paragraph>Du har ingen lagra sitat.</Paragraph>
        )}
        {quotes.quotes.map((data, index) => (
          <Quote
            key={index}
            content={data.content}
            author={data.author}
            id={data._id}
          />
        ))}
      </div>
    </div>
  );
};
