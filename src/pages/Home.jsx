import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar     from '../components/Navbar.jsx';
import Stars      from '../components/Stars.jsx';
import Slider     from '../components/Slider.jsx';
import FloatingHearts from '../components/FloatingHearts.jsx';
import Moon       from '../components/Moon.jsx';
import Timeline   from '../components/Timeline.jsx';
import Fireworks  from '../components/Fireworks.jsx';
import MusicPlayer from '../components/MusicPlayer.jsx';
import HeartSVG   from '../components/HeartSVG.jsx';
import { fetchSiteConfig, saveResponse } from '../utils/api.js';

const WHY_REASONS = [
  { icon:'✨', title:'I Found True Love After a Long Wait',    body:'I waited a long time without knowing when real love would come into my life. Then you came, and suddenly everything made sense. You are the love I had been waiting for all along. ❤️',              accent:'#a78bfa', bg:'rgba(124,58,237,.12)' },
  { icon:'🌸', title:'You Bring Me So Much Happiness', body:'Whenever you are with me, my heart feels lighter and happier. Your presence turns ordinary moments into beautiful ones. Being with you gives me a kind of joy I never knew before. 💕', accent:'#f472b6', bg:'rgba(236,72,153,.12)' },
  { icon:'🌙', title:'I See My Future With You',         body:'When I think about tomorrow, I see you there beside me. I imagine a future full of love, laughter, memories, and growing old together. You are the person I want in every chapter of my life. ✨',                  accent:'#93c5fd', bg:'rgba(99,102,241,.10)' },
];

/* ── Proposal block ── */
function ProposalBlock({ cfg }) {
  const [answered, setAnswered] = useState(false);
  const [boom,     setBoom]     = useState(false);
  const [popup,    setPopup]    = useState(false);
  const [busy,     setBusy]     = useState(false);
  const navigate = useNavigate();

  const answer = async r => {
    if (answered || busy) return;
    setBusy(true);
    try { await saveResponse({ herName:cfg.herName, response:r }); } catch(_){}
    setBusy(false); setAnswered(true); setBoom(true); setPopup(true);
    setTimeout(()=>navigate('/comment'), 4500);
  };
  const tr={ hidden:{opacity:0,y:40,filter:'blur(12px)'}, show:{opacity:1,y:0,filter:'blur(0)'} };

  return(
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{background:'radial-gradient(ellipse at 50% 60%,#1e0040 0%,#08041a 45%,#04040e 100%)'}}>
      <Stars count={260} shooting/>
      <Moon size={240} bright={answered}/>
      {answered && <FloatingHearts rate={400}/>}
      <Fireworks trigger={boom}/>
      <motion.div className="absolute inset-0 pointer-events-none" animate={{opacity:answered?.2:.07}} transition={{duration:1.5}}
        style={{background:'radial-gradient(ellipse at center,#ec4899,transparent 65%)'}}/>

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-6"
            style={{backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',background:'rgba(4,4,14,.6)'}}>
            <motion.div initial={{scale:.6,y:60,opacity:0}} animate={{scale:1,y:0,opacity:1}}
              transition={{type:'spring',stiffness:160,damping:18,delay:.1}}
              className="max-w-sm md:max-w-md w-full rounded-2xl md:rounded-3xl p-8 md:p-12 text-center"
              style={{background:'linear-gradient(135deg,rgba(124,58,237,.2),rgba(236,72,153,.18))',border:'1px solid rgba(236,72,153,.3)',backdropFilter:'blur(40px)',boxShadow:'0 0 80px rgba(236,72,153,.2)'}}>
              <motion.div className="mb-7" animate={{scale:[1,1.2,1],rotate:[0,8,-8,0]}} transition={{duration:1.5,repeat:Infinity,repeatDelay:.5}}>
                <HeartSVG size={70} className="mx-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.7)]"/>
              </motion.div>
              <h2 className="text-2xl md:text-3xl text-white font-light mb-3" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.3}}>{cfg.successMessage}</h2>
              <p className="text-white/40 text-sm">Taking you somewhere beautiful…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto py-16 md:py-20">
        <motion.div className="mb-10" variants={{hidden:{},show:{transition:{staggerChildren:.5}}}} initial="hidden" whileInView="show" viewport={{once:true}}>
          <motion.p variants={tr} transition={{duration:1.2}} className="text-xl sm:text-2xl md:text-3xl text-white/45 font-light italic mb-4" style={{fontFamily:'Cormorant Garamond,serif'}}>And my story…</motion.p>
          <motion.p variants={tr} transition={{duration:1.2}} className="text-3xl sm:text-4xl md:text-6xl text-white font-light mb-5" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.2}}>Keeps choosing you.</motion.p>
          <motion.p variants={tr} transition={{duration:1.2}} className="font-script text-4xl sm:text-5xl md:text-6xl"
            style={{fontFamily:'Dancing Script,cursive',background:'linear-gradient(135deg,#f9a8d4,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{cfg.herName}…</motion.p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:.85}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:1.8,duration:1.2,ease:[.16,1,.3,1]}} className="mb-12 md:mb-14">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light" style={{fontFamily:'Cormorant Garamond,serif',
            background:'linear-gradient(135deg,#fce7f3 0%,#ec4899 40%,#be185d 70%,#f9a8d4 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
            filter:'drop-shadow(0 0 40px rgba(236,72,153,0.4))',lineHeight:1.1}}>
            {cfg.proposalText}
          </h2>
        </motion.div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:2.5,duration:.9}}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button type="button" onClick={()=>answer('yes')} disabled={answered||busy}
            className="btn btn-rose btn-lg w-full sm:w-auto text-lg md:text-xl" whileHover={!answered?{scale:1.07}:{}} whileTap={!answered?{scale:.96}:{}}
            animate={!answered?{boxShadow:['0 0 30px rgba(236,72,153,.4)','0 0 70px rgba(236,72,153,.75)','0 0 30px rgba(236,72,153,.4)']}:{}} transition={{duration:2.2,repeat:Infinity}}>
            Yes
          </motion.button>
          <motion.button type="button" onClick={()=>answer('of_course')} disabled={answered||busy}
            className="btn btn-outline btn-lg w-full sm:w-auto text-lg md:text-xl" whileHover={!answered?{scale:1.05}:{}} whileTap={!answered?{scale:.96}:{}}>
            Of Course
          </motion.button>
        </motion.div>
        {!answered&&<motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:3.2}} className="lbl mt-7 opacity-30">choose your answer</motion.p>}
      </div>
    </section>
  );
}

/* ── Main Home ── */
const DEFAULT_CFG = {
  herName:'Barsha', heroSubtext:'this is for you', proposalText:'From this moment until forever… will you be mine?',
  successMessage:'Let’s stay together forever, with big smiles and a lifetime of beautiful memories ❤️',
  gallery:[], story:[], music:{ url:'', title:'', artist:'' },
};

export default function Home() {
  const [cfg, setCfg] = useState(DEFAULT_CFG);
  const heroRef  = useRef(null);
  const storyRef = useRef(null);
  const scroll   = r => r.current?.scrollIntoView({ behavior:'smooth', block:'start' });

  useEffect(()=>{
    fetchSiteConfig().then(r=>{ if(r.data) setCfg(prev=>({...prev,...r.data})); }).catch(()=>{});
  },[]);

  return(
    <div className="relative">
      <Navbar/>
      <MusicPlayer music={cfg.music}/>

      {/* ── GALLERY ── */}
{/* ── GALLERY ── */}
<section
  className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 md:pt-24 pb-12 md:pb-16"
  style={{
    background:
      'radial-gradient(ellipse at 30% 0%,#1a063a 0%,#0c0820 35%,#04040e 80%)',
  }}
>
  <Stars count={200} shooting />

  <div
    className="absolute top-0 inset-x-0 h-64 pointer-events-none"
    style={{
      background:
        'linear-gradient(to bottom,rgba(124,58,237,.1),transparent)',
    }}
  />

  <div
    className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
    style={{
      background:
        'linear-gradient(to top,rgba(236,72,153,.06),transparent)',
    }}
  />

  <FloatingHearts rate={3200} />

  {/* Main Content */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">

    {/* Heading */}
    <motion.div
      className="text-center mb-10 md:mb-14 max-w-3xl w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="hr mb-5 max-w-[220px] mx-auto">
        <span className="lbl opacity-60">captured moments</span>
      </div>

      <h2
        className="text-4xl sm:text-5xl md:text-7xl text-white font-light mb-4"
        style={{
          fontFamily: 'Cormorant Garamond,serif',
          lineHeight: 1.1,
        }}
      >
        Our Beautiful
        <br />
        <span className="italic grad-text-rose">
          Moments Together
        </span>
      </h2>

      <p className="text-white/40 text-sm md:text-base font-light max-w-md mx-auto">
        Every picture holds a feeling I never want to forget.
      </p>
    </motion.div>

    {/* Slider */}
    {cfg.gallery.length > 0 && (
      <div className="w-full flex justify-center items-center mt-6">
        <Slider items={cfg.gallery} />
      </div>
    )}

    {/* Button */}
    <motion.div
      className="text-center mt-10 md:mt-14"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <button
        type="button"
        onClick={() => scroll(heroRef)}
        className="btn btn-rose btn-lg text-base md:text-lg"
      >
        Begin Our Story
      </button>
    </motion.div>

  </div>
</section>

      {/* ── NIGHT SKY HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:'radial-gradient(ellipse at 55% 35%,#0f082e 0%,#04040e 70%)'}}>
        <Stars count={300} shooting/>
        <div className="absolute top-14 right-10 md:top-20 md:right-16 pointer-events-none hidden sm:block">
          <motion.div className="rounded-full" animate={{scale:[1,1.025,1]}} transition={{duration:6,repeat:Infinity}}
            style={{width:60,height:60,background:'radial-gradient(circle at 32% 32%,#fffbeb,#fef3c7 40%,#fde68a 70%,#f59e0b)',boxShadow:'0 0 40px rgba(254,243,199,.2)'}}/>
        </div>
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <motion.div className="lbl mb-8 md:mb-10 opacity-50" initial={{opacity:0,letterSpacing:'.1em'}} animate={{opacity:.5,letterSpacing:'.45em'}} transition={{duration:2}}>under this sky</motion.div>
          <motion.div className="mb-8 md:mb-10" variants={{hidden:{},show:{transition:{staggerChildren:.15}}}} initial="hidden" animate="show">
            {[
              {t:'Among billions of stars…',      s:'text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-light mb-3'},
              {t:'I found someone extraordinary.',s:'text-2xl sm:text-3xl md:text-5xl font-light italic grad-text'},
            ].map((l,i)=>(
              <motion.h1 key={i} variants={{hidden:{opacity:0,y:24,filter:'blur(10px)'},show:{opacity:1,y:0,filter:'blur(0)',transition:{duration:.85}}}}
                className={l.s} style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.2,display:'block',marginBottom:i===0?'0.5rem':'0'}}>{l.t}</motion.h1>
            ))}
          </motion.div>
          <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:1.8,duration:.9}} className="mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 md:gap-3 glass rounded-full px-5 md:px-8 py-2.5 md:py-3.5 max-w-[90vw]"
              style={{borderColor:'rgba(236,72,153,.22)',boxShadow:'0 0 40px rgba(236,72,153,.08)'}}>
              <span className="font-script text-xl md:text-2xl text-pink-300/85" style={{fontFamily:'Dancing Script,cursive'}}>{cfg.herName},</span>
              <span className="text-white/50 text-sm">{cfg.heroSubtext}</span>
            </div>
          </motion.div>
          <motion.button type="button" onClick={()=>scroll(storyRef)} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:2.3,duration:.9}}
            className="btn btn-outline btn-lg" whileHover={{scale:1.05}} whileTap={{scale:.97}}>Continue</motion.button>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.5}}>
          <motion.div className="w-px h-12 rounded-full" style={{background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.25))'}} animate={{scaleY:[0,1,0]}} transition={{duration:2.2,repeat:Infinity,ease:'easeInOut'}}/>
          <span className="lbl opacity-40">scroll</span>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section ref={storyRef} className="relative py-24 md:py-36 overflow-hidden"
        style={{background:'linear-gradient(180deg,#04040e 0%,#090118 40%,#04040e 100%)'}}>
        <div className="absolute top-1/4 right-0 w-96 h-96 pointer-events-none" style={{background:'radial-gradient(circle,rgba(124,58,237,.05),transparent)',filter:'blur(80px)'}}/>
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-16 md:mb-24" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1.2}}>
            <div className="hr mb-5 max-w-[160px] mx-auto"><span className="lbl opacity-60">our journey</span></div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl text-white font-light" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.1}}>
              The Story<br/><span className="italic" style={{background:'linear-gradient(135deg,#a78bfa,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>of Us</span>
            </h2>
          </motion.div>
          {cfg.story.length>0 && <Timeline items={cfg.story}/>}
        </div>
      </section>

      {/* ── WHY YOU MATTER ── */}
      <section className="relative py-24 md:py-36 overflow-hidden" style={{background:'linear-gradient(180deg,#04040e,#06001a 50%,#04040e)'}}>
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-14 md:mb-20" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1.2}}>
            <div className="hr mb-5 max-w-[200px] mx-auto"><span className="lbl opacity-60">what you are to me</span></div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl text-white font-light" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.1}}>
              Why You Matter<br/><span className="italic grad-text-rose">To Me</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {WHY_REASONS.map((w,i)=>(
              <motion.div key={i} initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9,delay:i*.15}}
                className="relative rounded-2xl p-7 md:p-9 cursor-default lift overflow-hidden"
                style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',backdropFilter:'blur(20px)'}}>
                <div className="absolute top-0 left-8 right-8 h-px" style={{background:'linear-gradient(90deg,transparent,'+w.accent+'50,transparent)'}}/>
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 100%,'+w.bg+',transparent 70%)'}}/>
                <motion.div className="text-4xl md:text-5xl mb-5 relative z-10" animate={{scale:[1,1.1,1]}} transition={{duration:3.5,repeat:Infinity,delay:i*.7}}>{w.icon}</motion.div>
                <h3 className="text-xl md:text-2xl text-white font-light mb-3 relative z-10" style={{fontFamily:'Cormorant Garamond,serif'}}>{w.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed relative z-10">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIDGE ── */}
      <section className="relative py-28 md:py-36 flex items-center justify-center overflow-hidden"
        style={{background:'linear-gradient(180deg,#04040e,#100025 50%,#04040e)'}}>
        <Stars count={100} shooting={false}/>
        <motion.div className="relative z-10 text-center px-5" initial={{opacity:0,scale:.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.4}}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white font-light" style={{fontFamily:'Cormorant Garamond,serif',lineHeight:1.25}}>Every story leads somewhere…</h2>
          <motion.p className="mt-4 text-white/35 text-base md:text-lg" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.5}}>and mine keeps finding its way back to you.</motion.p>
          <motion.div className="flex justify-center gap-2 mt-10" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:1}}>
            {[0,.3,.6].map((d,i)=>(
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{background:'rgba(236,72,153,.4)'}}
                animate={{opacity:[.3,1,.3],y:[0,-6,0]}} transition={{duration:1.5,delay:d,repeat:Infinity}}/>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROPOSAL ── */}
      <ProposalBlock cfg={cfg}/>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="lbl opacity-20 tracking-[.35em]"> UNDER THIS SKY · WITH LOVE . PRIYAM</p>
      </footer>
    </div>
  );
}
