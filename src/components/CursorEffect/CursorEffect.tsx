import React, { useEffect, useRef } from 'react';
import './CursorEffect.css';

const CursorEffect: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const onMouseMove = (e: MouseEvent) => {
      // Move the cursor elements to follow the mouse
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Add a slight delay to the dot for a trailing effect
      setTimeout(() => {
        if (cursorDot) {
          cursorDot.style.left = `${e.clientX}px`;
          cursorDot.style.top = `${e.clientY}px`;
        }
      }, 50);
    };
    
    const onMouseDown = () => {
      cursor.classList.add('clicked');
      cursorDot.classList.add('clicked');
    };
    
    const onMouseUp = () => {
      cursor.classList.remove('clicked');
      cursorDot.classList.remove('clicked');
    };
    
    const onMouseEnterInteractive = () => {
      cursor.classList.add('on-interactive');
      cursorDot.classList.add('on-interactive');
    };
    
    const onMouseLeaveInteractive = () => {
      cursor.classList.remove('on-interactive');
      cursorDot.classList.remove('on-interactive');
    };
    
    // Add event listeners for mouse movement and clicks
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, .feature-card, .project-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', onMouseEnterInteractive);
      element.addEventListener('mouseleave', onMouseLeaveInteractive);
    });
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', onMouseEnterInteractive);
        element.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);
  
  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
    </>
  );
};

export default CursorEffect;