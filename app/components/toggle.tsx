import React from 'react';
import './Toggle.css';

const Toggle = ({ option1, option2, selected, onToggle }) => {
  const isOption1Selected = selected === option1;

  const handleToggle = () => {
    onToggle(isOption1Selected ? option2 : option1);
  };

  const getTextColor = (option) => (selected === option ? 'blue' : 'black');


  return (
    <div className="toggle">
      <span style={{ color: getTextColor(option1) }}>{option1}</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={!isOption1Selected}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
      <span style={{ color: getTextColor(option2) }}>{option2}</span>
    </div>
  );
};

export default Toggle;
