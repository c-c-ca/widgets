import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const renderedItems = items.map(({ title, content }, i) => {
    const active = activeIndex == i ? 'active' : '';

    return (
      <React.Fragment key={title}>
        <div className={`title ${active}`} onClick={() => setActiveIndex(i)}>
          <i className="dropdown icon"></i>
          {title}
        </div>
        <div className={`content ${active}`}>
          <p>{content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
