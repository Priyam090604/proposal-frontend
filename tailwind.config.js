export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display:['Cormorant Garamond','Georgia','serif'],
        script:['Dancing Script','cursive'],
        sans:['DM Sans','system-ui','sans-serif'],
      },
      keyframes: {
        heartFloat:{'0%':{transform:'translateY(0) scale(1)',opacity:'.8'},'100%':{transform:'translateY(-110vh) scale(.2)',opacity:'0'}},
        shimmer:{'0%':{backgroundPosition:'-200% center'},'100%':{backgroundPosition:'200% center'}},
        breathe:{'0%,100%':{transform:'scale(1)'},'50%':{transform:'scale(1.05)'}},
        fadeUp:{from:{opacity:'0',transform:'translateY(32px)'},to:{opacity:'1',transform:'translateY(0)'}},
        pulseGlow:{'0%,100%':{boxShadow:'0 0 20px rgba(236,72,153,.3)'},'50%':{boxShadow:'0 0 70px rgba(236,72,153,.8)'}},
      },
      animation:{
        heartFloat:'heartFloat 5s ease-in forwards',
        shimmer:'shimmer 2.5s linear infinite',
        breathe:'breathe 5s ease-in-out infinite',
        fadeUp:'fadeUp .9s cubic-bezier(.16,1,.3,1) forwards',
        pulseGlow:'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins:[],
};
