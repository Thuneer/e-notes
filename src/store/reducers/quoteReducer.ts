import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type QuoteState = {
  quotes: any[];
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
    addQuote: (state, action: PayloadAction<unknown>) => {
      state.quotes = [...state.quotes, action.payload];
    },
    deleteQuote: (state, action: PayloadAction<unknown>) => {
      state.quotes = state.quotes.filter(
        (quote) => quote._id !== action.payload,
      );
    },
  },
});

export const { setQuotes, addQuote, deleteQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
