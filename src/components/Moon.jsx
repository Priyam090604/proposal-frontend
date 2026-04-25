import React from 'react';
import { motion } from 'framer-motion';
export default function Moon({ size=280, bright=false }) {
  const g=bright?.45:.18;
  return(
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[2.6,2.0,1.55].map((m,i)=>(
        <motion.div key={i} className="absolute rounded-full"
          style={{width:size*m,height:size*m,border:'1px solid rgba(254,243,199,'+(.5-i*.12)*g*2+')'}}
          animate={{scale:[1,1.02+i*.01,1],opacity:[.4,.8+i*.1,.4]}} transition={{duration:4+i*1.5,repeat:Infinity,ease:'easeInOut',delay:i*.8}}/>
      ))}
      <motion.div className="absolute rounded-full overflow-hidden"
        style={{width:size,height:size,background:'radial-gradient(circle at 32% 32%,#fffbeb,#fef3c7 35%,#fde68a 65%,#f59e0b 85%,#d97706)',
          boxShadow:'0 0 '+(size*.6)+'px rgba(254,243,199,'+g*.9+'), 0 0 '+(size*1.2)+'px rgba(254,243,199,'+g*.4+'), 0 0 '+(size*2.5)+'px rgba(254,243,199,'+g*.15+')'}}
        animate={{scale:[1,1.015,1]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}>
        <div className="absolute w-8 h-8 rounded-full bg-yellow-400/15" style={{top:'18%',left:'22%'}}/>
        <div className="absolute w-5 h-5 rounded-full bg-yellow-400/12" style={{top:'55%',left:'60%'}}/>
        <div className="absolute w-3 h-3 rounded-full bg-yellow-400/10" style={{top:'32%',left:'58%'}}/>
        <div className="absolute inset-0 rounded-full" style={{background:'radial-gradient(circle at 25% 25%,rgba(255,255,255,.2),transparent 60%)'}}/>
      </motion.div>
    </div>
  );
}
