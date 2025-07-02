import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Squid Game color palette
    const colors = {
      pink: '#E91E63',
      green: '#16423C',
      orange: '#F7931E',
      darkGreen: '#0D2B26',
      white: '#FFFFFF',
      black: '#000000'
    };
    
    // Floating geometric shapes
    const shapes: Shape[] = [];
    const shapeCount = Math.min(50, Math.floor(window.innerWidth / 40));
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse position for interactive effects
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Shape class for Squid Game geometric elements
    class Shape {
      x: number = 0;
      y: number = 0;
      size: number = 10;
      speedX: number = 0;
      speedY: number = 0;
      rotation: number = 0;
      rotationSpeed: number = 0;
      type: 'triangle' | 'circle' | 'square' = 'triangle';
      color: string = colors.pink;
      opacity: number = 0.3;
      pulsePhase: number = 0;
      
      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        
        // Random shape type - favoring triangles like in the show
        const shapeTypes: ('triangle' | 'circle' | 'square')[] = ['triangle', 'triangle', 'triangle', 'circle', 'square'];
        this.type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        // Random color from Squid Game palette
        const shapeColors = [colors.pink, colors.green, colors.orange];
        this.color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
        
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      
      update() {
        if (!canvas) return;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.02;
        
        // Wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        
        // React to mouse position (shapes move away from cursor)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 1000;
          this.speedX -= dx * force;
          this.speedY -= dy * force;
        }
        
        // Apply some drag and limits
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        
        const maxSpeed = 1;
        this.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedX));
        this.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedY));
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Pulsing effect
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentSize = this.size * pulse;
        const currentOpacity = this.opacity * (0.8 + Math.sin(this.pulsePhase) * 0.2);
        
        ctx.globalAlpha = currentOpacity;
        
        // Draw different shapes based on type
        switch (this.type) {
          case 'triangle':
            this.drawTriangle(currentSize);
            break;
          case 'circle':
            this.drawCircle(currentSize);
            break;
          case 'square':
            this.drawSquare(currentSize);
            break;
        }
        
        ctx.restore();
      }
      
      drawTriangle(size: number) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        // Add subtle border
        ctx.strokeStyle = colors.white;
        ctx.lineWidth = 1;
        ctx.globalAlpha *= 0.6;
        ctx.stroke();
      }
      
      drawCircle(size: number) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle border
        ctx.strokeStyle = colors.white;
        ctx.lineWidth = 1;
        ctx.globalAlpha *= 0.6;
        ctx.stroke();
      }
      
      drawSquare(size: number) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(-size, -size, size * 2, size * 2);
        
        // Add subtle border
        ctx.strokeStyle = colors.white;
        ctx.lineWidth = 1;
        ctx.globalAlpha *= 0.6;
        ctx.strokeRect(-size, -size, size * 2, size * 2);
      }
    }
    
    // Create floating shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape());
    }
    
    // Game field grid pattern
    const drawGameField = () => {
      if (!ctx || !canvas) return;
      
      const gridSize = 60;
      const lineOpacity = 0.08;
      
      ctx.strokeStyle = colors.pink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = lineOpacity;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };
    
    // Draw subtle game symbols
    const drawGameSymbols = () => {
      if (!ctx || !canvas) return;
      
      const symbolCount = 8;
      const symbols = ['△', '○', '□'];
      
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < symbolCount; i++) {
        const x = (canvas.width / symbolCount) * i + (canvas.width / symbolCount) / 2;
        const y = canvas.height * 0.1 + Math.sin(Date.now() * 0.001 + i) * 10;
        
        const symbol = symbols[i % symbols.length];
        const opacity = 0.03 + Math.sin(Date.now() * 0.002 + i) * 0.02;
        
        ctx.fillStyle = colors.green;
        ctx.globalAlpha = opacity;
        ctx.fillText(symbol, x, y);
        
        // Bottom symbols
        const y2 = canvas.height * 0.9 + Math.sin(Date.now() * 0.001 + i + Math.PI) * 10;
        ctx.fillStyle = colors.orange;
        ctx.fillText(symbol, x, y2);
      }
      
      ctx.globalAlpha = 1;
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with subtle gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, colors.black);
      gradient.addColorStop(1, colors.darkGreen);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw game field grid
      drawGameField();
      
      // Draw game symbols
      drawGameSymbols();
      
      // Update and draw floating shapes
      for (const shape of shapes) {
        shape.update();
        shape.draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;