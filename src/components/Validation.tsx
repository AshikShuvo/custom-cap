import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Validation.css';

interface ValidationProps {
  imageSrc: string;
  boxPosition: { top: string; left: string };
  maxAttempts: number;
  onBlocked: () => void;
}

const generateWatermarks = () => {
  const shapes = ['triangle', 'square', 'circle'];
  const colors = ['red', 'green', 'blue'];
  return Array.from({ length: 9 }, () => ({
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    selected: false,
  }));
};

const Validation = forwardRef(({ imageSrc, boxPosition, maxAttempts, onBlocked }: ValidationProps, ref) => {
  const [watermarks, setWatermarks] = useState(generateWatermarks());
  const [selectedShape, setSelectedShape] = useState('triangle');
  const [selectedColor, setSelectedColor] = useState('red');
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const shapes = ['triangle', 'square', 'circle'];
    const colors = ['red', 'green', 'blue'];
    setSelectedShape(shapes[Math.floor(Math.random() * shapes.length)]);
    setSelectedColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [attempts]);

  useImperativeHandle(ref, () => ({
    validate() {
      const correctSelections = watermarks.filter(
        (wm) => wm.shape === selectedShape && wm.color === selectedColor && wm.selected
      );
      if (correctSelections.length > 0) {
        setValidationResult('Passed');
      } else {
        if (attempts < maxAttempts - 1) {
          setAttempts(attempts + 1);
          setWatermarks(generateWatermarks());
        } else {
          onBlocked();
        }
        setValidationResult('Failed');
      }
    }
  }));

  if (validationResult === 'Passed') {
    return <h2>Validation Passed</h2>;
  }

  if (validationResult === 'Failed' && attempts >= maxAttempts) {
    return <h2>Validation Failed. You have been blocked from further attempts.</h2>;
  }

  return (
    <div className="validation-container">
      <h2>Select {selectedShape} with {selectedColor} tint</h2>
      <div className="captured-image" >
        <img src={imageSrc} alt="captured" />
        <div className="watermarks" style={boxPosition}>
          {watermarks.map((wm, index) => (
            <div
              key={index}
              className={`sector ${wm.shape} ${wm.color} ${wm.selected ? 'selected' : ''}`}
              onClick={() => setWatermarks(prev =>
                prev.map((wm, i) =>
                  i === index ? { ...wm, selected: !wm.selected } : wm
                )
              )}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Validation;
