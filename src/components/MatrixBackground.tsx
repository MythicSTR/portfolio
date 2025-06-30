
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Characters to be displayed (expanded to include more variety for terminal feel)
    const chars = "01アイウエオカキクケコサシスセソタチツテト010101ナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0101";
    
    // Drawing the characters
    function draw() {
      // Set the background with transparency to show a trail effect
      ctx.fillStyle = theme === "dark" 
        ? "rgba(10, 10, 15, 0.03)" 
        : "rgba(240, 240, 245, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = theme === "dark" 
        ? "rgba(0, 200, 100, 0.1)" 
        : "rgba(0, 100, 50, 0.08)";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // A random character from the chars array
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to make the effect look more organic
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Incrementing Y coordinate for the drop
        drops[i]++;
      }
    }
    
    const intervalId = setInterval(draw, 70);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default MatrixBackground;
