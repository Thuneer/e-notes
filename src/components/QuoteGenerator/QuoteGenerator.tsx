import React, { useEffect, useState } from 'react';
import {
  Button,
  Paragraph,
  Ingress,
  Heading,
} from '@digdir/design-system-react';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { collection, doc, setDoc } from 'firebase/firestore';

import { getRandomQuote } from '../../services/quoteService';
import { db } from '../../firebase';
import { useAppDispatch } from '../../store/hooks';
import { addQuote } from '../../store/reducers/quoteReducer';

import classes from './QuoteGenerator.module.css';

type QuoteType = {
  content: string;
  author: string;
};

export const QuoteGenerator = () => {
  const dispatch = useAppDispatch();

  const [activeQuote, setActiveQuote] = useState<QuoteType>({
    content:
      'Great ideas often receive violent opposition from mediocre minds.',
    author: 'Albert Einstein',
  });
  const onBtnClicked = async () => {
    const quote = await getRandomQuote();
    setActiveQuote(quote);
  };

  const onSaveClicked = () => {
    const newCityRef = doc(collection(db, 'quotes'));
    setDoc(newCityRef, activeQuote);
    dispatch(addQuote(activeQuote));
  };

  useEffect(() => {
    (async () => {
      const q = await getRandomQuote();
      setActiveQuote(q);
    })();
  }, []);
  return (
    <div className={classes.page}>
      <div className={classes.panel}>
        <Heading
          size='medium'
          spacing={true}
        >
          Generer nytt sitat
        </Heading>
        <Paragraph spacing={true}>
          Sitatet du generer vil vise til høgre. Trykk på lagre knappen om du
          ønskjer å lagre sitatet til lista under.
        </Paragraph>
        <Button onClick={() => onBtnClicked()}>Generer</Button>
      </div>
      <div className={classes.panel}>
        <Button
          className={classes.saveBtn}
          icon={<FloppydiskIcon />}
          variant='quiet'
          color='secondary'
          onClick={() => onSaveClicked()}
        ></Button>
        <div className={classes.quote}>
          <Ingress size='medium'>{activeQuote.content}</Ingress>
          <Paragraph className={classes.author}>{activeQuote.author}</Paragraph>
        </div>
      </div>
    </div>
  );
};
