import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMusic, FiPause, FiPlay, FiVolume2, FiVolumeX, FiX } from 'react-icons/fi';

export default function MusicPlayer({ music }) {
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [vol, setVol]           = useState(.65);
  const [open, setOpen]         = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [blocked, setBlocked]   = useState(false);
  const aRef    = useRef(null);
  const tried   = useRef(false);

  /* ── Auto-play muted as soon as audio element is ready ── */
  useEffect(()=>{
    if (!aRef.current || !music?.url || tried.current) return;
    tried.current = true;
    const audio = aRef.current;
    audio.volume = 0;
    audio.muted  = true;
    audio.play()
      .then(()=>{
        setPlaying(true);
        setMuted(true);
        setTimeout(()=>setShowHint(true), 1800);
        setTimeout(()=>setShowHint(false), 7000);
      })
      .catch(()=>{ setBlocked(true); setMuted(false); });
  },[music]);

  /* ── Sync audio element ── */
  useEffect(()=>{
    if(!aRef.current)return;
    if(playing) aRef.current.play().catch(()=>setPlaying(false));
    else        aRef.current.pause();
  },[playing]);

  useEffect(()=>{
    if(!aRef.current)return;
    aRef.current.volume = muted ? 0 : vol;
    aRef.current.muted  = muted;
  },[vol,muted]);

  /* ── Unmute on first user gesture ── */
  useEffect(()=>{
    const unmute=()=>{
      if(muted && playing){
        setMuted(false);
        setShowHint(false);
        if(aRef.current){ aRef.current.muted=false; aRef.current.volume=vol; }
      }
    };
    ['click','touchstart','scroll'].forEach(ev=>window.addEventListener(ev,unmute,{once:true,passive:true}));
    return()=>['click','touchstart','scroll'].forEach(ev=>window.removeEventListener(ev,unmute));
  },[muted,playing,vol]);

  if (!music?.url) return null;

  return(
    <div className="fixed z-40 flex flex-col items-end gap-2 safe-bottom" style={{bottom:'1.1rem',right:'0.75rem'}}>
      <audio ref={aRef} src={music.url} loop preload="auto"/>

      {/* Unmute hint toast */}
      <AnimatePresence>
        {showHint&&(
          <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:16}} transition={{duration:.35}}
            className="glass-lg rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 max-w-[200px] md:max-w-[220px]"
            style={{borderColor:'rgba(236,72,153,.3)',boxShadow:'0 8px 32px rgba(0,0,0,.4),0 0 20px rgba(236,72,153,.1)'}}>
            <motion.div animate={{scale:[1,1.25,1]}} transition={{duration:1.2,repeat:Infinity}}>
              <FiVolume2 size={14} className="text-pink-400 flex-shrink-0"/>
            </motion.div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium">Music is playing</p>
              <p className="text-white/45 text-xs">Tap to unmute</p>
            </div>
            <button type="button" onClick={()=>setShowHint(false)} className="text-white/25 hover:text-white/60 flex-shrink-0 ml-1"><FiX size={11}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blocked prompt */}
      <AnimatePresence>
        {blocked&&!playing&&(
          <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="glass-lg rounded-2xl px-3.5 py-2.5 flex items-center gap-2" style={{borderColor:'rgba(236,72,153,.3)',maxWidth:'200px'}}>
            <FiMusic size={13} className="text-pink-400 flex-shrink-0"/>
            <p className="text-white/60 text-xs">Tap ▶ for music</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,y:8,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:.95}} transition={{duration:.25}}
            className="glass-lg rounded-2xl p-4 md:p-5 max-w-[calc(100vw-1.5rem)]" style={{width:'260px',borderColor:'rgba(236,72,153,.2)',boxShadow:'0 24px 60px rgba(0,0,0,.5),0 0 30px rgba(236,72,153,.1)'}}>
            <div className="flex items-start justify-between mb-4">
              <div className="min-w-0 flex-1">
                <p className="lbl mb-1 opacity-60">Now Playing</p>
                <p className="text-white text-sm font-medium truncate">{music.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{music.artist}</p>
              </div>
              <button type="button" onClick={()=>setOpen(false)} className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0 ml-3"><FiX size={15}/></button>
            </div>
            {/* Waveform */}
            <div className="flex items-end gap-[3px] h-6 mb-4">
              {[.8,.4,1,.6,.9,.5,.7,.3,.95,.55].map((h,i)=>(
                <motion.div key={i} className="flex-1 rounded-full"
                  style={{background:playing&&!muted?'linear-gradient(to top,#7c3aed,#ec4899)':'rgba(255,255,255,.15)'}}
                  animate={(playing&&!muted)?{scaleY:[h,1,h,.5,h]}:{scaleY:h*.25}} transition={{duration:.6+i*.07,repeat:Infinity,ease:'easeInOut',delay:i*.05}}/>
              ))}
            </div>
            {muted&&playing&&(
              <div className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-xl" style={{background:'rgba(236,72,153,.08)',border:'1px solid rgba(236,72,153,.18)'}}>
                <FiVolumeX size={11} className="text-pink-400 flex-shrink-0"/>
                <p className="text-white/55 text-xs">Muted · tap anywhere to unmute</p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <button type="button" onClick={()=>setMuted(m=>!m)} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
                {muted?<FiVolumeX size={15}/>:<FiVolume2 size={15}/>}
              </button>
              <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.12)'}}>
                <div className="absolute left-0 top-0 h-full rounded-full" style={{width:(muted?0:vol)*100+'%',background:'linear-gradient(90deg,#7c3aed,#ec4899)'}}/>
                <input type="range" min="0" max="1" step=".05" value={muted?0:vol} onChange={e=>{setVol(+e.target.value);setMuted(false);}} className="absolute inset-0 w-full opacity-0 cursor-pointer"/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating controls */}
      <div className="flex items-center gap-2">
        {playing&&(
          <motion.div className="flex items-end gap-[2px] h-4 px-1" initial={{opacity:0}} animate={{opacity:1}}>
            {[.7,1,.5,.9,.6].map((h,i)=>(
              <motion.div key={i} className="w-[3px] rounded-full"
                style={{background:muted?'rgba(255,255,255,.3)':'linear-gradient(to top,#7c3aed,#ec4899)'}}
                animate={{scaleY:[h,1,h]}} transition={{duration:.5+i*.1,repeat:Infinity,ease:'easeInOut'}}/>
            ))}
          </motion.div>
        )}
        <motion.button type="button" onClick={()=>setOpen(o=>!o)} whileHover={{scale:1.08}} whileTap={{scale:.95}}
          className="w-10 h-10 rounded-full glass-md flex items-center justify-center transition-colors"
          style={{borderColor:open?'rgba(236,72,153,.3)':'rgba(255,255,255,.1)',color:open?'rgba(249,168,212,1)':'rgba(255,255,255,.5)'}}>
          <FiMusic size={14}/>
        </motion.button>
        <motion.button type="button"
          onClick={()=>{
            if(blocked&&!playing){ setBlocked(false); setPlaying(true); setMuted(false); return; }
            setPlaying(p=>!p);
            if(muted){ setMuted(false); }
          }}
          whileHover={{scale:1.1}} whileTap={{scale:.93}}
          className="rounded-full flex items-center justify-center text-white"
          style={{width:'46px',height:'46px',background:'linear-gradient(135deg,#ec4899,#7c3aed)',boxShadow:'0 0 24px rgba(236,72,153,.55)'}}>
          {playing&&!muted?<FiPause size={17}/>:muted&&playing?<FiVolume2 size={17}/>:<FiPlay size={17} style={{marginLeft:'2px'}}/>}
        </motion.button>
      </div>
    </div>
  );
}
