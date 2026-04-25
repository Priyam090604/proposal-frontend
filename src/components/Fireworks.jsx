import { useEffect } from 'react';
import confetti from 'canvas-confetti';
export default function Fireworks({ trigger }) {
  useEffect(()=>{
    if(!trigger)return;
    const c=['#ec4899','#f472b6','#a78bfa','#c084fc','#fde68a','#fff','#fbcfe8','#ddd6fe'];
    const fire=(a,sp,o)=>confetti({particleCount:100,angle:a,spread:sp,origin:o,colors:c,shapes:['circle','square'],scalar:1.3,gravity:.85,ticks:350});
    fire(65,80,{x:0,y:.75});fire(115,80,{x:1,y:.75});
    setTimeout(()=>fire(90,140,{x:.5,y:.4}),250);
    setTimeout(()=>{fire(65,90,{x:.15,y:.6});fire(115,90,{x:.85,y:.6});},500);
    [800,1300,1800,2400].forEach((d,i)=>setTimeout(()=>confetti({particleCount:70,spread:360,startVelocity:28+i*3,origin:{x:.1+Math.random()*.8,y:.05+Math.random()*.4},colors:c,scalar:1.4,ticks:300}),d));
    try{
      const h=confetti.shapeFromPath({path:'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',matrix:[.03,0,0,.03,-5,-5]});
      setTimeout(()=>confetti({particleCount:50,spread:120,origin:{x:.5,y:.35},shapes:[h],colors:['#ec4899','#f9a8d4','#fce7f3','#be185d'],scalar:2.2,ticks:500}),700);
    }catch(_){}
  },[trigger]);
  return null;
}
