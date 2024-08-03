import { useEffect, useRef } from 'react'

type Props = {}

function MatrixWrapper({}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      // Setting up the letters
      let letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ".split("");

      let fontSize = 10;
      let drops: number[] = [];

      // Function to set up canvas dimensions and drops
      const setupCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = canvas.width / fontSize;
        drops = Array(Math.floor(columns)).fill(1);
      };

      // Initial setup
      setupCanvas();

      // Setting up the draw function
      function draw() {
        ctx!.fillStyle = "rgba(0, 0, 0, .1)";
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
        for (let i = 0; i < drops.length; i++) {
          let text = letters[Math.floor(Math.random() * letters.length)];
          ctx!.fillStyle = "#0f0";
          ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
          drops[i]++;
          if (drops[i] * fontSize > canvas!.height && Math.random() > 0.95) {
            drops[i] = 0;
          }
        }
      }

      // Loop the animation
      const intervalId = setInterval(draw, 33);

      // Window resize event listener
      const handleResize = () => {
          
          setupCanvas();
        };
        
        window.addEventListener('resize', handleResize);
    //     const resizeObserver = new ResizeObserver(entries => {
    //       console.log("resize..");
        
    //   });

      // Cleanup function
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
      <div style={{ width: "100%", height: "100%", position: "absolute", zIndex: -1 }}>
        <canvas style={{ maxWidth: "100%", maxHeight: "100%",}} ref={canvasRef}></canvas>
      </div>
    )
}

export default MatrixWrapper