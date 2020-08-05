import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

interface Props {
  timingFunc: (time: number) => number;
  pointsNum: number;
  pointJoin: 'bezierCurve' | 'line' | 'quadraticCurve';
}

const ctxSettings = {
  fillStyle: 'black',
  lineWidth: 3,
};

const Graph: React.FC<Props> = ({ timingFunc, pointJoin, pointsNum = 10 }) => {
  const [dir, setDir] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<HTMLSpanElement>(null);
  // setup canvas
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const height = canvasRef.current.height;
        ctx.fillStyle = ctxSettings.fillStyle;
        ctx.lineWidth = ctxSettings.lineWidth;
        ctx.lineJoin = 'round';
        ctx.scale(1, -1);
        ctx.translate(0, -height);
      }
    }
    return () => {};
  }, []);
  useEffect(() => {
    let ctx: CanvasRenderingContext2D | null;
    if (canvasRef.current) {
      ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // move origin to left-bottom corner
        const height = canvasRef.current.height;
        const width = canvasRef.current.width;
        console.log('clear');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.moveTo(0, 0);
        ctx.beginPath();
        // ctx.strokeRect(0, 0, 100, 100);
        let offset = 1 / pointsNum;
        for (let i = 0; i <= pointsNum; i++) {
          let x = offset * width * i;
          let y = timingFunc(i * offset) * height;
          // ctx.ellipse(x, y, 3, 3, 0, 0, 2 * Math.PI);
          switch (pointJoin) {
            case 'line':
              ctx.lineTo(x, y);
              break;
            case 'bezierCurve':
              // do nothing, for now
              break;
            case 'quadraticCurve':
              // do nothing, for now
              break;
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    }
    return () => {
      if (ctx) {
        ctx.clearRect(0, 0, 300, 300);
      }
    };
  }, [timingFunc]);

  useEffect(() => {
    let id: number;
    let start: number;
    function animated() {
      // duration 2000
      start = Date.now();
      function move() {
        let offset = Date.now() - start;
        let progress = timingFunc(offset / 2000);
        if (animatedRef.current) {
          if (dir) {
            animatedRef.current.style.bottom = '-10px';
            animatedRef.current.style.transform = `translate3d(0,${
              -progress * 290
            }px,0)`;
          } else {
            animatedRef.current.style.bottom = '290px';
            animatedRef.current.style.transform = `translate3d(0,${
              progress * 290
            }px,0)`;
          }
        }
        if (offset >= 2000 || progress >= 1) {
          return;
        }
        id = window.requestAnimationFrame(move);
      }
      move();
    }
    animated();
    return () => {
      console.log('cancel animation', id, dir);
      window.cancelAnimationFrame(id);
      window.webkitCancelAnimationFrame(id);
    };
  }, [dir, timingFunc]);

  return (
    <div
      className='graph'
      data-x=''
      data-y=''
      onClick={e => {
        e.preventDefault();
        // if (canvasRef.current) {
        //   const ctx = canvasRef.current.getContext('2d');
        //   if (ctx) {
        //     ctx.clearRect(0, 0, 300, 300);
        //   }
        // }
      }}
      ref={graphRef}
      onMouseMove={e => {
        if (canvasRef.current) {
          let { left, bottom } = canvasRef.current.getBoundingClientRect();
          let x = (e.clientX - left) / canvasRef.current.width;
          let y = (bottom - e.clientY) / canvasRef.current.height;
          if (x < 0 || y < 0 || x > 1 || y > 1) return;
          if (graphRef.current) {
            graphRef.current.setAttribute('data-x', (x * 100).toFixed(0) + '%');
            graphRef.current.setAttribute('data-y', (y * 100).toFixed(0) + '%');
          }
        }
      }}
    >
      <span className='point start'></span>
      <span className='point end'></span>
      <span
        className='point animated'
        ref={animatedRef}
        onClick={e => {
          e.preventDefault();
          setDir(dir => !dir);
        }}
      ></span>
      <canvas height='300' width='300' ref={canvasRef}></canvas>
    </div>
  );
};

export default Graph;
