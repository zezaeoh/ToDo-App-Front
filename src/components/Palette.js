import React from 'react';
import './Palette.css'

const Color = ({ color, active, onClick, index }) => {
  return (
    <div 
      className={`color ${active ? 'active' : ''}`} 
      style={{ background: color}}
      onClick={onClick}
    >{index}</div>
  )
}

const Palette = ({colors, selected, onSelect}) => {
  const mapedColors = colors.map((c, i) => (
    <Color 
      color={c}
      active={selected === c}
      onClick={() => onSelect(c)}
      index={i}
      key={i}
    />
  ));

  return (
    <div className="palette">
      {mapedColors}
    </div>
  );
  
};

export default Palette;