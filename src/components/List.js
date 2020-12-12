import React from 'react';
import wikipedia from '../api/wikipedia';

const list = () => {
  wikipedia
    .get('/w/api.php', {
      params: {
        srsearch: 'cheese',
      },
    })
    .then(({ data }) => console.log(data));
  return <div>List</div>;
};

export default list;
