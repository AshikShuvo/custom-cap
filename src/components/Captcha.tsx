import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import Validation from './Validation';
import './Captcha.css';

const MAX_ATTEMPTS = 3;

const Captcha: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const validationRef = useRef<{ validate: () => void }>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [boxPosition, setBoxPosition] = useState({ top: '50%', left: '50%' });
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxPosition({
        top: `${Math.random() * 20 }%`,
        left: `${Math.random() * 40}%`
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setImageSrc(imageSrc);
  };

  const handleBlocked = () => {
    setBlocked(true);
  };

  const reset = () => {
    setImageSrc(null);
  };

  if (blocked) {
    return <h2>You have been blocked from further attempts.</h2>;
  }

  return (
    <div className="captcha-container">
      
      <div className='image-app'>
        <div>
        <h2>Take Selfie</h2>
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
        />
        </div>
        {imageSrc &&  <Validation
        ref={validationRef}
        imageSrc={imageSrc}
        boxPosition={boxPosition}
        maxAttempts={MAX_ATTEMPTS}
        onBlocked={handleBlocked}
      />}
      </div>
      
     
      {imageSrc? (
        <button onClick={() => validationRef.current?.validate()} className="btn">Validate</button>
      ):( <button onClick={capture} className="btn">Continue</button>)}
    </div>
  );
};

export default Captcha;
