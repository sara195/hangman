import * as React from 'react';

export function useRandomWord() {
  const [word, setWord] = React.useState('');
  const [status, setStatus] = React.useState('idle');

  // Fetches random world from WordsAPI
  const fetchRandomWord = React.useCallback(async () => {
    setStatus('pending');

    try {
      const response = await fetch(
        `https://wordsapiv1.p.rapidapi.com/words/?random=true`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          },
        }
      );

      const { word: fetchedWord } = await response.json();

      setStatus('resolved');
      setWord(fetchedWord.toUpperCase());
    } catch (e) {
      setStatus('rejected');

      // console.log(e.message);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  return { status, randomWord: word, fetchRandomWord };
}
