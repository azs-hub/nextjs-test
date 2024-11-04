// components/Toggle.js
import React from 'react';

const Toggle = ({ option1, option2, selected, onToggle }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="toggle">
      <span style={{ color: selected === option1 ? 'blue' : 'black' }}>{option1}</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={selected === option2}
          onChange={() => onToggle(selected === option1 ? option2 : option1)}
        />
        <span className="slider round"></span>
      </label>
      <span style={{ color: selected === option2 ? 'blue' : 'black' }}>{option2}</span>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 4px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 24px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Toggle;
