import React, { useState, useEffect } from 'react';
import './GlitchText.css';

interface GlitchTextProps {
  text: string;
  delay?: number;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  onComplete?: () => void;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  delay = 0,
  className = '',
  glitchIntensity = 'medium',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (delay) {
      timeoutId = setTimeout(() => {
        setDisplayText(text);
        setIsComplete(true);
        if (onComplete) onComplete();
      }, delay);
    } else {
      setDisplayText(text);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, text, onComplete]);
  
  return (
    <div className={`glitch-text-container ${className} ${isComplete ? 'complete' : ''}`}>
      <span className="glitch-text">{displayText}</span>
    </div>
  );
};

export default GlitchText;