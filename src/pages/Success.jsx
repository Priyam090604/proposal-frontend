import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../components/Stars.jsx';
import FloatingHearts from '../components/FloatingHearts.jsx';
import Moon from '../components/Moon.jsx';
import HeartSVG from '../components/HeartSVG.jsx';
import confetti from 'canvas-confetti';

function useTimer() {
  const [t,setT]=useState('00:00');
  useEffect(()=>{
    const s0=Date.now();
    const id=setInterval(()=>{
      const s=Math.floor((Date.now()-s0)/1000);
      setT(String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'));
    },1000);
    return()=>clearInterval(id);
  },[]);
  return t;
}

export default function Success() {
  const navigate = useNavigate();
  const timer    = useTimer();
  const date     = new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});

  useEffect(()=>{
    const c=['#ec4899','#a78bfa','#f472b6','#c084fc','#fde68a','#fff'];
    const b=()=>confetti({particleCount:70,spread:120,origin:{x:Math.random(),y:.4},colors:c,scalar:1.3,ticks:320});
    [0,600,1300,2100].forEach(d=>setTimeout(b,d));
  },[]);

  return(
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{background:'radial-gradient(ellipse at 50% 60%,#1e0040 0%,#08041a 45%,#04040e 100%)'}}>
      <Stars count={300} shooting/>
      <Moon size={220} bright/>
      <FloatingHearts rate={700}/>
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(236,72,153,.08),transparent 65%)'}}/>

      <div className="relative z-10 text-center px-5 max-w-2xl mx-auto py-20">
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:[0,1.3,1],opacity:1}} transition={{duration:1.4,ease:[.34,1.56,.64,1]}} className="mb-8 md:mb-10">
          <motion.div animate={{scale:[1,1.08,1]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
            <HeartSVG size={80} className="mx-auto md:w-24 md:h-24 drop-shadow-[0_0_50px_rgba(236,72,153,0.7)]"/>
          </motion.div>
        </motion.div>

        {['Our new story','begins now'].map((t,i)=>(
          <motion.h1 key={i} initial={{opacity:0,y:50,filter:'blur(16px)'}} animate={{opacity:1,y:0,filter:'blur(0)'}}
            transition={{delay:.4+i*.4,duration:1.2,ease:[.16,1,.3,1]}}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-light"
            style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.1}}>{t}</motion.h1>
        ))}

        <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:1.4,duration:1}} className="mt-10 mb-8">
          <div className="inline-block glass-md rounded-2xl px-6 md:px-8 py-4 md:py-5" style={{boxShadow:'0 0 40px rgba(124,58,237,.1)'}}>
            <p className="lbl mb-2 opacity-50">Together since</p>
            <p className="text-white/75 text-base md:text-lg font-light" style={{fontFamily:'Cormorant Garamond,serif'}}>{date}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="lbl opacity-40">Love timer</span>
              <span className="font-mono text-pink-300 text-sm">{timer}</span>
            </div>
          </div>
        </motion.div>

        <motion.blockquote initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2,duration:1}}
          className="text-white/30 text-base md:text-lg italic font-light mb-10 max-w-sm mx-auto" style={{fontFamily:'Cormorant Garamond,serif'}}>
          "Every star up there witnessed this moment."
        </motion.blockquote>

        <motion.button type="button" onClick={()=>navigate('/')} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.8}}
          className="btn btn-outline" whileHover={{scale:1.05}}>Relive Our Story</motion.button>
      </div>

      <motion.p className="absolute bottom-6 lbl opacity-15 tracking-[.35em]" initial={{opacity:0}} animate={{opacity:.15}} transition={{delay:3}}>BARSHA · UNDER THIS SKY</motion.p>
    </div>
  );
}
