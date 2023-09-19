const getRandomQuote = async () => {
  const response = await fetch('https://api.quotable.io/quotes/random');
  const quote = await response.json();
  return quote[0];
};

export { getRandomQuote };
