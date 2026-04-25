import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const V={
  enter:d=>({x:d>0?'105%':'-105%',opacity:0,scale:.95}),
  center:{x:0,opacity:1,scale:1},
  exit:d=>({x:d>0?'-105%':'105%',opacity:0,scale:.95}),
};

export default function Slider({ items }) {
  const [cur,setCur]=useState(0);
  const [dir,setDir]=useState(1);
  const [paused,setPaused]=useState(false);
  const touchX=useRef(null);

  const go=useCallback(d=>{setDir(d);setCur(c=>(c+d+items.length)%items.length);},[items.length]);
  useEffect(()=>{if(paused||items.length<=1)return;const t=setInterval(()=>go(1),4200);return()=>clearInterval(t);},[go,paused,items.length]);

  if(!items.length)return null;
  const item=items[cur];

  return(
    <div className="w-full flex flex-col items-center"
      onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
      onTouchStart={e=>{touchX.current=e.touches[0].clientX;}}
      onTouchEnd={e=>{if(!touchX.current)return;const dx=e.changedTouches[0].clientX-touchX.current;if(Math.abs(dx)>45)go(dx<0?1:-1);touchX.current=null;}}>

      <div className="relative w-full" style={{maxWidth:'920px'}}>
        {/* Main frame */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden w-full select-none"
          style={{aspectRatio:'16/9',boxShadow:'0 0 0 1px rgba(255,255,255,.07),0 40px 100px rgba(0,0,0,.75),0 0 80px rgba(124,58,237,.07),0 0 50px rgba(236,72,153,.05)'}}>
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.div key={cur} custom={dir} variants={V} initial="enter" animate="center" exit="exit"
              transition={{duration:.72,ease:[.32,.72,0,1]}} className="absolute inset-0">
              {/* Image */}
              <motion.img src={item.image} alt="" className="w-full h-full object-cover"
                initial={{scale:1.09}} animate={{scale:1}} transition={{duration:9,ease:'linear'}}
                onError={e=>{e.target.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=90';}}/>
              {/* Overlays */}
              <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(4,4,14,.95) 0%,rgba(4,4,14,.5) 30%,rgba(4,4,14,.05) 65%,transparent 100%)'}}/>
              <div className="absolute inset-0" style={{background:'linear-gradient(to right,rgba(4,4,14,.3) 0%,transparent 25%,transparent 75%,rgba(4,4,14,.3) 100%)'}}/>
              {/* Caption — centred */}
              <motion.div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6 md:pb-9 px-4"
                initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.7}}>
                <div className="glass-lg rounded-xl md:rounded-2xl px-5 py-3 md:px-9 md:py-4 text-center"
                  style={{borderColor:'rgba(236,72,153,.2)',boxShadow:'0 8px 32px rgba(0,0,0,.4)',maxWidth:'580px',width:'100%'}}>
                  <p className="text-base md:text-xl lg:text-2xl text-white font-light italic leading-snug" style={{fontFamily:'Cormorant Garamond,serif'}}>
                    "{item.caption}"
                  </p>
                </div>
              </motion.div>
              {/* Counter */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 glass-xs rounded-full px-2.5 py-1 md:px-3 md:py-1.5">
                <span className="text-xs text-white/45 tabular-nums tracking-widest font-mono">
                  {String(cur+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none" style={{boxShadow:'inset 0 0 0 1px rgba(236,72,153,.1)'}}/>
          {/* Arrows */}
          {[{d:-1,pos:'left-2 md:-left-5',I:FiChevronLeft},{d:1,pos:'right-2 md:-right-5',I:FiChevronRight}].map(({d,pos,I})=>(
            <motion.button key={d} type="button" onClick={()=>go(d)} whileHover={{scale:1.12}} whileTap={{scale:.92}}
              className={'absolute top-1/2 -translate-y-1/2 '+pos+' z-20 w-9 h-9 md:w-11 md:h-11 rounded-full glass-md flex items-center justify-center text-white/60 hover:text-white transition-all'}
              style={{boxShadow:'0 4px 24px rgba(0,0,0,.5)'}}>
              <I size={18}/>
            </motion.button>
          ))}
        </div>

        {/* Progress + dots */}
        <div className="mt-4 flex items-center gap-3 px-1">
          <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.08)'}}>
            <motion.div className="h-full rounded-full" style={{background:'linear-gradient(90deg,#7c3aed,#ec4899)'}}
              key={cur+'p'} initial={{width:'0%'}} animate={{width:'100%'}} transition={{duration:paused?0:4.2,ease:'linear'}}/>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {items.map((_,i)=>(
              <button key={i} type="button" onClick={()=>{setDir(i>cur?1:-1);setCur(i);}}
                className="rounded-full transition-all duration-300"
                style={{width:i===cur?'18px':'6px',height:'6px',background:i===cur?'linear-gradient(90deg,#7c3aed,#ec4899)':'rgba(255,255,255,.2)'}}/>
            ))}
          </div>
        </div>

        {/* Thumbs */}
        <div className="flex gap-2 justify-center mt-3 overflow-x-auto pb-1">
          {items.map((itm,i)=>(
            <motion.button key={i} type="button" onClick={()=>{setDir(i>cur?1:-1);setCur(i);}}
              whileHover={{scale:1.08,y:-2}} whileTap={{scale:.93}}
              className="flex-shrink-0 relative rounded-lg md:rounded-xl overflow-hidden"
              style={{width:'60px',height:'42px',border:i===cur?'2px solid #ec4899':'2px solid rgba(255,255,255,.1)',boxShadow:i===cur?'0 0 16px rgba(236,72,153,.55)':'none',opacity:i===cur?1:.45,transition:'all .25s'}}>
              <img src={itm.image} alt="" className="w-full h-full object-cover"/>
              {i===cur&&<div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(124,58,237,.12),rgba(236,72,153,.08))'}}/>}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
