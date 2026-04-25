import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Stars from '../components/Stars.jsx';
import FloatingHearts from '../components/FloatingHearts.jsx';
import HeartSVG from '../components/HeartSVG.jsx';
import { postComment } from '../utils/api.js';

const MOODS=[{v:'happy',l:'Happy',e:'😊'},{v:'emotional',l:'Emotional',e:'🥹'},{v:'excited',l:'Excited',e:'💖'},{v:'shy',l:'Shy',e:'🌸'}];

export default function Comment() {
  const [form,setForm] = useState({name:'',message:'',mood:'happy',rating:5});
  const [busy,setBusy] = useState(false);
  const [err,setErr]   = useState('');
  const [done,setDone] = useState(false);
  const navigate       = useNavigate();
  const set = (k,v)   => setForm(p=>({...p,[k]:v}));

  const submit = async () => {
    if(!form.name.trim()||!form.message.trim()){ setErr('Please fill your name and message.'); return; }
    setBusy(true); setErr('');
    try { await postComment(form); setDone(true); setTimeout(()=>navigate('/success'),3800); }
    catch { setErr('Could not send. Please try again.'); }
    setBusy(false);
  };

  return(
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 md:py-20"
      style={{background:'radial-gradient(ellipse at 30% 20%,#0d0a2a 0%,#04040e 70%)'}}>
      <Stars count={180} shooting={false}/>
      {done && <FloatingHearts rate={600}/>}

      <AnimatePresence>
        {done && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(4,4,14,.65)'}}>
            <motion.div initial={{scale:.7,opacity:0,y:40}} animate={{scale:1,opacity:1,y:0}} transition={{type:'spring',stiffness:160,damping:18}}
              className="max-w-xs md:max-w-sm w-full rounded-2xl md:rounded-3xl p-8 md:p-10 text-center"
              style={{background:'linear-gradient(135deg,rgba(124,58,237,.2),rgba(236,72,153,.18))',border:'1px solid rgba(236,72,153,.28)',backdropFilter:'blur(40px)'}}>
              <div className="text-5xl mb-5">💌</div>
              <h2 className="text-2xl md:text-3xl text-white font-light mb-2" style={{fontFamily:'Cormorant Garamond,serif'}}>Your words are now</h2>
              <p className="grad-text text-xl md:text-2xl font-light italic" style={{fontFamily:'Cormorant Garamond,serif'}}>my favourite memory</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md md:max-w-lg mx-auto px-4 md:px-6">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-center mb-10">
          <HeartSVG size={48} className="mx-auto mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"/>
          <div className="hr mb-5 max-w-[200px] mx-auto"><span className="lbl opacity-60">a note from your heart</span></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-light" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.2}}>
            Now tell me what<br/><span className="italic grad-text">your heart says</span>
          </h1>
        </motion.div>

        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.9}}
          className="glass-md rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-5"
          style={{boxShadow:'0 40px 80px rgba(0,0,0,.4),0 0 40px rgba(124,58,237,.06)'}}>
          {/* Name */}
          <div>
            <label className="block text-white/35 text-xs uppercase tracking-widest mb-2">Your Name</label>
            <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name…" className="inp"/>
          </div>
          {/* Message */}
          <div>
            <label className="block text-white/35 text-xs uppercase tracking-widest mb-2">Your Message</label>
            <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={5} placeholder="Tell me what your heart says…" className="inp resize-none"/>
          </div>
          {/* Mood */}
          <div>
            <label className="block text-white/35 text-xs uppercase tracking-widest mb-3">Your Mood</label>
            <div className="grid grid-cols-4 gap-2">
              {MOODS.map(m=>(
                <button key={m.v} type="button" onClick={()=>set('mood',m.v)}
                  className="flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-xl transition-all text-xs"
                  style={form.mood===m.v?{background:'linear-gradient(135deg,rgba(124,58,237,.3),rgba(236,72,153,.25))',border:'1px solid rgba(236,72,153,.3)',color:'#fff'}:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.45)'}}>
                  <span className="text-2xl">{m.e}</span>{m.l}
                </button>
              ))}
            </div>
          </div>
          {/* Rating */}
          <div>
            <label className="block text-white/35 text-xs uppercase tracking-widest mb-3">Your Rating</label>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map(n=>(
                <motion.button key={n} type="button" onClick={()=>set('rating',n)} whileHover={{scale:1.3}} whileTap={{scale:.9}}
                  className="text-2xl md:text-3xl" style={{filter:n<=form.rating?'none':'grayscale(1) opacity(.25)',background:'none',border:'none',cursor:'pointer'}}>⭐</motion.button>
              ))}
            </div>
          </div>

          {err && <motion.p initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="text-red-400 text-sm px-3 py-2 rounded-xl" style={{background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.15)'}}>{err}</motion.p>}

          <div className="flex gap-3 pt-1">
            <motion.button type="button" onClick={submit} disabled={busy} className="btn btn-rose flex-1 justify-center py-4" whileHover={!busy?{scale:1.03}:{}} whileTap={!busy?{scale:.97}:{}}>
              {busy?'Sending…':'Send Message'}
            </motion.button>
            <button type="button" onClick={()=>navigate('/success')} className="btn btn-outline py-4 px-5 text-sm">Skip</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
