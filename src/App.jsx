import React, { useState } from 'react';
import Box from './components/Box';

const COLOR_SEQUENCE = [
  '#ff4757',
  '#ffa502',
  '#2ed573',
  '#1e90ff',
  '#9b59b6',
  '#e84393',
  '#00cec9',
  '#f1c40f',
  '#6c5ce7',
];
const DEFAULT_BOX_COLOR = '#2ed573';

const createRandomTargetOrder = () => {
  const targetOrder = Array.from({ length: COLOR_SEQUENCE.length }, (_, index) => index);

  for (let index = targetOrder.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [targetOrder[index], targetOrder[randomIndex]] = [
      targetOrder[randomIndex],
      targetOrder[index],
    ];
  }

  if (targetOrder.every((target, index) => target === index)) {
    [targetOrder[0], targetOrder[1]] = [targetOrder[1], targetOrder[0]];
  }

  return targetOrder;
};

export default function App() {
  const [gridColors, setGridColors] = useState(Array(9).fill(DEFAULT_BOX_COLOR));
  const [currentStep, setCurrentStep] = useState(0);
  const [targetOrder, setTargetOrder] = useState(createRandomTargetOrder);
  const [message, setMessage] = useState('');

  const handleBoxClick = (index) => {
    if (currentStep >= COLOR_SEQUENCE.length) {
      return;
    }

    const expectedColor = COLOR_SEQUENCE[currentStep];

    if (targetOrder[currentStep] === index) {
      const updatedGrid = [...gridColors];
      updatedGrid[index] = expectedColor;
      setGridColors(updatedGrid);

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep === COLOR_SEQUENCE.length) {
        setMessage('Great job! Start a new game when you are ready.');
      }
    } else {
      const resetGrid = Array(9).fill(DEFAULT_BOX_COLOR);
      setGridColors(resetGrid);
      setCurrentStep(0);
      setMessage('Not quite. Try this same grid pattern again.');
    }
  };

  const handleNewGame = () => {
    setGridColors(Array(9).fill(DEFAULT_BOX_COLOR));
    setCurrentStep(0);
    setTargetOrder(createRandomTargetOrder());
    setMessage('');
  };

  return (
    <div className="app-container">
      <div className="palette">
        {COLOR_SEQUENCE.map((col, idx) => (
          <div 
            key={idx} 
            className={`palette-color ${idx === currentStep ? 'active-step' : ''}`} 
            style={{ backgroundColor: col }}
          />
        ))}
      </div>

      <p className="game-message" role="status" aria-live="polite">{message}</p>

      <div className="grid">
        {gridColors.map((color, idx) => (
          <Box 
            key={idx} 
            color={color} 
            onClick={() => handleBoxClick(idx)} 
          />
        ))}
      </div>

      {currentStep === COLOR_SEQUENCE.length && (
        <button className="new-game-btn" onClick={handleNewGame}>New Game</button>
      )}

    </div>
  );
}