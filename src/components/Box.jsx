import React from 'react';

export default function Box({ color, onClick }) {
  return (
    <div 
      className="grid-box" 
      style={{ backgroundColor: color }} 
      onClick={onClick}
    />
  );
}