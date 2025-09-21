'use client';
import { useEffect, useRef, useState } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 150 });
  const [isClient, setIsClient] = useState(false);

  // Este Hook garante que o componente só renderize o canvas após ser "montado" no cliente.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // O Hook principal com a lógica do canvas agora depende de `isClient`.
  // Ele só será executado quando o componente estiver com certeza no navegador.
  useEffect(() => {
    if (!isClient) {
      return; // Não executa a lógica do canvas no servidor.
    }

    const canvas = canvasRef.current;
    if (!canvas) return; // Garante que o canvas exista antes de tentar usá-lo.
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      let particleCount = (canvas.height * canvas.width) / 20000;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          originX: Math.random() * canvas.width,
          originY: Math.random() * canvas.height,
          vx: Math.random() * 0.4 - 0.2,
          vy: Math.random() * 0.4 - 0.2,
          radius: Math.random() * 2 + 1,
          density: (Math.random() * 30) + 10,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
      
      particles.forEach(p => {
        let dx = mouse.current.x - p.x;
        let dy = mouse.current.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.current.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * p.density;
          let directionY = forceDirectionY * force * p.density;

          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Return to origin
          if (p.x !== p.originX) {
            let dxo = p.x - p.originX;
            p.x -= dxo / 20;
          }
           if (p.y !== p.originY) {
            let dyo = p.y - p.originY;
            p.y -= dyo / 20;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Wall collision
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    drawParticles();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]); // A lógica do canvas é acionada quando `isClient` se torna true.

  // Não renderiza nada no servidor ou na primeira renderização do cliente.
  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, opacity: 0.5 }}
    />
  );
};

export default ParticleCanvas;

