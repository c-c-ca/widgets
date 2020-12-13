import React from 'react';
import Link from './Link';

const views = [
  { path: '', label: 'Accordion' },
  { path: 'list', label: 'Search' },
  { path: 'dropdown', label: 'Dropdown' },
  { path: 'translate', label: 'Translate' },
];

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      {views.map(({ path, label }, i) => (
        <Link key={i} href={`/${path}`} className="item">
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Header;
