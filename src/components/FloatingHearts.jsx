import React, { useState, useEffect } from 'react';
const S=['❤️','💖','💗','💝','💕','✨','🌸','⭐','💫','🌙'];
function Heart({onDone}){
  const l=Math.random()*86+6,sz=Math.random()*18+10,dur=Math.random()*5+4,del=Math.random()*2,sy=S[Math.floor(Math.random()*S.length)];
  useEffect(()=>{const t=setTimeout(onDone,(dur+del+.5)*1000);return()=>clearTimeout(t);},[]);
  return <div className="fixed pointer-events-none select-none" style={{left:l+'%',bottom:'-8%',fontSize:sz+'px',zIndex:15,opacity:0,animation:'heartFloat '+dur+'s ease-in '+del+'s forwards',filter:'drop-shadow(0 0 6px rgba(236,72,153,0.4))'}}>{sy}</div>;
}
export default function FloatingHearts({active=true,rate=2000}){
  const[hearts,setHearts]=useState([]);
  useEffect(()=>{if(!active)return;const t=setInterval(()=>setHearts(h=>[...h.slice(-25),Date.now()+Math.random()]),rate);return()=>clearInterval(t);},[active,rate]);
  return<>{hearts.map(id=><Heart key={id} onDone={()=>setHearts(h=>h.filter(x=>x!==id))}/>)}</>;
}
