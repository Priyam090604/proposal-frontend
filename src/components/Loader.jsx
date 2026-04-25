import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeartSVG from './HeartSVG.jsx';

export default function Loader() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const stars = Array.from({length:180}, () => ({
      x:Math.random()*cv.width, y:Math.random()*cv.height,
      r:Math.random()*1.6+.2, a:Math.random(), s:(Math.random()-.5)*.007,
      c:Math.random()>.8?'249,168,212':Math.random()>.6?'167,139,250':'226,232,240',
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,cv.width,cv.height);
      stars.forEach(s => {
        s.a+=s.s; if(s.a>1){s.a=1;s.s*=-1;} if(s.a<.1){s.a=.1;s.s*=-1;}
        if(s.r>1.2){ctx.shadowColor='#a78bfa';ctx.shadowBlur=5;}else ctx.shadowBlur=0;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle='rgba('+s.c+','+s.a+')'; ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(raf);
  },[]);

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{background:'radial-gradient(ellipse at 40% 30%,#110a2e 0%,#04040e 70%)'}}
      exit={{opacity:0}} transition={{duration:1.4}}>
      <canvas ref={ref} className="absolute inset-0 pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(circle at 50% 50%,rgba(124,58,237,.1),transparent 60%)'}}/>

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:[0,1.2,1],opacity:1}} transition={{duration:1.2,ease:[.34,1.56,.64,1]}}>
          <motion.div animate={{scale:[1,1.08,1]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
            <HeartSVG size={80} className="drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]"/>
          </motion.div>
        </motion.div>

        <motion.div className="mt-10" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.7,duration:.9}}>
          <p className="lbl tracking-[.4em] mb-3 opacity-60">a message just for you</p>
          <h1 className="text-3xl md:text-4xl text-white font-light" style={{fontFamily:'Cormorant Garamond,serif',letterSpacing:'.04em'}}>
            Preparing something<br/><span className="italic grad-text">special…</span>
          </h1>
        </motion.div>

        <motion.div className="mt-12 w-56" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
          <div className="h-[1.5px] w-full rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.08)'}}>
            <motion.div className="h-full rounded-full" style={{background:'linear-gradient(90deg,#7c3aed,#ec4899,#f472b6)'}}
              initial={{width:'0%'}} animate={{width:'100%'}} transition={{delay:.4,duration:3.1,ease:'easeInOut'}}/>
          </div>
          <motion.div className="flex gap-1.5 justify-center mt-4" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}>
            {[0,.18,.36].map((d,i)=>(
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{background:'#ec4899'}}
                animate={{scale:[1,1.6,1],opacity:[.4,1,.4]}} transition={{duration:1,delay:d,repeat:Infinity}}/>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.p className="absolute bottom-8 text-xs tracking-[.3em] text-white/15"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}>
        BARSHA · UNDER THIS SKY
      </motion.p>
    </motion.div>
  );
}
