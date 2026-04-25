import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeartSVG from './HeartSVG.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',h,{passive:true});
    return()=>window.removeEventListener('scroll',h);
  },[]);
  return(
    <nav className={'fixed top-0 inset-x-0 z-50 transition-all duration-500 '+(scrolled?'py-2.5':'py-4')}
      style={scrolled?{background:'rgba(4,4,14,.85)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',borderBottom:'1px solid rgba(255,255,255,.06)'}:{}}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-center">
        <div className="flex items-center gap-2.5">
          <motion.div animate={{scale:[1,1.1,1]}} transition={{duration:3,repeat:Infinity}}>
            <HeartSVG size={22} className="drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"/>
          </motion.div>
          <span className="text-white/70 text-base font-light" style={{fontFamily:'Cormorant Garamond,serif',letterSpacing:'.04em'}}>Under This Sky</span>
        </div>
      </div>
    </nav>
  );
}
