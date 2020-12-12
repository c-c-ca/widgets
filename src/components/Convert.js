import React, { useState, useEffect } from 'react';
import googleTranslate from '../api/googleTranslate';

const Convert = ({ language, text }) => {
  const [translation, setTranslation] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  useEffect(() => {
    (async () => {
      const { data } = await googleTranslate.post(
        '/language/translate/v2',
        {},
        {
          params: { q: debouncedText, target: language.value },
        }
      );
      setTranslation(data.data.translations[0].translatedText);
    })();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translation}</h1>
    </div>
  );
};

export default Convert;
