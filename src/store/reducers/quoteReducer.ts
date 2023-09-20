import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { DocumentData } from 'firebase/firestore';

type QuoteState = {
  quotes: DocumentData[];
};

const initialState: QuoteState = {
  quotes: [],
};

export const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state, action: PayloadAction<QuoteState>) => {
      state.quotes = action.payload.quotes;
    },
    addQuote: (state, action: PayloadAction<DocumentData>) => {
      state.quotes = [...state.quotes, action.payload];
    },
    deleteQuote: (state, action: PayloadAction<string>) => {
      state.quotes = state.quotes.filter(
        (quote) => quote._id !== action.payload,
      );
    },
  },
});

export const { setQuotes, addQuote, deleteQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
