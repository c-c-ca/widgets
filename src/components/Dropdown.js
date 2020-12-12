import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [active, toggleActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      toggleActive(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options
    .filter(option => option != selected)
    .map(option => {
      return (
        <div
          key={option.value}
          className="item"
          onClick={() => {
            onSelectedChange(option);
            toggleActive(!active);
          }}
        >
          {option.label}
        </div>
      );
    });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${active ? 'visible active' : ''}`}
          onClick={e => {
            e.stopPropagation();
            toggleActive(!active);
          }}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${active ? 'visible active transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
