import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ theme }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        const particleCount = 120;
        const mouse = { x: null, y: null, radius: 250 };

        const colors = theme === 'dark' ? [
            'rgba(168, 85, 247, 0.4)', // Purple
            'rgba(34, 211, 238, 0.4)', // Cyan
            'rgba(255, 255, 255, 0.3)', // White
            'rgba(99, 102, 241, 0.4)', // Indigo
        ] : [
            'rgba(126, 34, 206, 0.3)', // Darker Purple
            'rgba(8, 145, 178, 0.3)',  // Darker Cyan
            'rgba(0, 0, 0, 0.1)',      // Soft Black
            'rgba(67, 56, 202, 0.3)',  // Darker Indigo
        ];

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 15) + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.velocity = {
                    x: (Math.random() - 0.5) * 1,
                    y: (Math.random() - 1) * 0.5 // Bias upwards slightly
                };
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        this.x += (dx / distance) * force * 5;
                        this.y += (dy / distance) * force * 5;
                    }
                }

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (mouse.x !== null && mouse.y !== null) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, mouse.radius
                );
                
                const glowColor = theme === 'dark' ? 'rgba(168, 85, 247,' : 'rgba(147, 51, 234,';
                gradient.addColorStop(0, `${glowColor} 0.15)`);
                gradient.addColorStop(0.5, `${glowColor} 0.05)`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            particles.forEach(p => {
                p.draw();
                p.update();
            });
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {
                        const opacity = theme === 'dark' ? 0.1 : 0.05;
                        const strokeColor = theme === 'dark' ? '255, 255, 255' : '147, 51, 234';
                        ctx.strokeStyle = `rgba(${strokeColor}, ${opacity * (1 - distance / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.offsetWidth;
                canvas.height = containerRef.current.offsetHeight;
                createParticles();
            }
        };

        const handleMouseMove = (event) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouse.x = event.clientX - rect.left;
                mouse.y = event.clientY - rect.top;
            }
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-run when theme changes

    return (
        <div ref={containerRef} className="absolute inset-0 -z-0 pointer-events-none overflow-hidden opacity-70">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: 'blur(0.8px)' }}
            />
        </div>
    );
};

export default ParticleBackground;
