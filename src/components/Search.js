import React, { useState, useEffect } from 'react';
import wikipedia from '../api/wikipedia';

const DELAY = 500;

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, DELAY);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await wikipedia.get('/w/api.php', {
        params: { srsearch: debouncedTerm },
      });

      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  const renderedResults = results.map(({ title, snippet, pageid }) => {
    return (
      <div key={pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{title}</div>
          <span dangerouslySetInnerHTML={{ __html: snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
