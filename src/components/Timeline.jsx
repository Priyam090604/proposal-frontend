import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Chapter({ item, index }) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:'-80px'});
  const even=index%2===0;
  return(
    <motion.div ref={ref} className={'flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-12 '+(even?'':'md:flex-row-reverse')}
      initial={{opacity:0,y:50}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1,ease:[.16,1,.3,1]}}>
      {/* Image */}
      <div className="w-full md:w-5/12 flex-shrink-0">
        <motion.div className="relative group rounded-2xl overflow-hidden w-full"
          style={{aspectRatio:'4/3',boxShadow:'0 24px 60px rgba(0,0,0,.55),0 0 40px rgba(124,58,237,.07)',border:'1px solid rgba(255,255,255,.07)'}}
          whileHover={{scale:1.02}} transition={{duration:.5}}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={e=>{e.target.src='https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&q=80';}}/>
          <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(124,58,237,.12),rgba(236,72,153,.1))'}}/>
          <div className="absolute bottom-3 left-3 glass-xs rounded-full px-2.5 py-1">
            <span className="text-xs text-white/55">{item.date}</span>
          </div>
        </motion.div>
      </div>
      {/* Dot */}
      <div className="hidden md:flex flex-col items-center w-10 flex-shrink-0" style={{paddingTop:'6px'}}>
        <motion.div className="w-5 h-5 rounded-full" animate={inView?{scale:[0,1.4,1]}:{}} transition={{delay:.2,duration:.6,ease:[.34,1.56,.64,1]}}
          style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)',boxShadow:'0 0 24px rgba(236,72,153,.6),0 0 48px rgba(124,58,237,.3)'}}/>
      </div>
      {/* Text */}
      <div className="w-full md:w-5/12 flex-shrink-0">
        <motion.div className="glass rounded-2xl p-5 sm:p-7 md:p-9 lift"
          whileHover={{borderColor:'rgba(236,72,153,.2)',boxShadow:'0 0 40px rgba(236,72,153,.06)'}}>
          <span className="lbl" style={{color:'rgba(167,139,250,.6)'}}>chapter {String(index+1).padStart(2,'0')}</span>
          <h3 className="text-2xl md:text-3xl text-white font-light mt-3 mb-3" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.3}}>{item.title}</h3>
          <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Timeline({ items }) {
  return(
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
        style={{background:'linear-gradient(to bottom,transparent,rgba(124,58,237,.3) 20%,rgba(236,72,153,.3) 80%,transparent)'}}/>
      <div className="flex flex-col gap-12 md:gap-20">
        {items.map((item,i)=><Chapter key={i} item={item} index={i}/>)}
      </div>
    </div>
  );
}
