import React, { useEffect, useRef } from 'react';
export default function Stars({ count=220, shooting=true }) {
  const ref = useRef(null);
  useEffect(()=>{
    const cv=ref.current; if(!cv)return;
    const ctx=cv.getContext('2d');
    const resize=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;};
    resize(); window.addEventListener('resize',resize,{passive:true});
    const stars=Array.from({length:count},()=>({
      x:Math.random()*cv.width,y:Math.random()*cv.height,
      r:Math.random()*1.7+.2,a:Math.random()*.6+.4,s:(Math.random()-.5)*.007,
      c:Math.random()>.85?'249,168,212':Math.random()>.65?'167,139,250':Math.random()>.5?'196,181,253':'226,232,240',
    }));
    const shooters=shooting?Array.from({length:3},()=>({x:0,y:0,vx:0,vy:0,len:0,a:0,active:false,timer:Math.random()*500+200})):[];
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
      stars.forEach(s=>{
        s.a+=s.s;if(s.a>1){s.a=1;s.s*=-1;}if(s.a<.15){s.a=.15;s.s*=-1;}
        if(s.r>1.3){ctx.shadowColor='rgba(167,139,250,.8)';ctx.shadowBlur=8;}else ctx.shadowBlur=0;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle='rgba('+s.c+','+s.a+')';ctx.fill();
      });
      ctx.shadowBlur=0;
      shooters.forEach(s=>{
        s.timer--;
        if(s.timer<=0&&!s.active){
          s.active=true;s.x=Math.random()*cv.width*.6;s.y=Math.random()*cv.height*.4;
          const ang=(Math.random()*.4+.4)*Math.PI*.5;const spd=Math.random()*8+5;
          s.vx=Math.cos(ang)*spd;s.vy=Math.sin(ang)*spd;s.len=Math.random()*90+50;s.a=1;s.timer=Math.random()*600+300;
        }
        if(s.active){
          s.x+=s.vx;s.y+=s.vy;s.a-=.022;if(s.a<=0){s.active=false;s.a=0;}
          const g=ctx.createLinearGradient(s.x,s.y,s.x-s.vx*8,s.y-s.vy*8);
          g.addColorStop(0,'rgba(255,255,255,'+s.a+')');g.addColorStop(1,'rgba(255,255,255,0)');
          ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*8,s.y-s.vy*8);
          ctx.strokeStyle=g;ctx.lineWidth=1.8;ctx.stroke();
        }
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[count,shooting]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none"/>;
}
