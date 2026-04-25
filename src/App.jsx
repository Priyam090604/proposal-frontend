import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loader   from './components/Loader.jsx';
import Home     from './pages/Home.jsx';
import Comment  from './pages/Comment.jsx';
import Success  from './pages/Success.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setReady(true), 3600); return ()=>clearTimeout(t); }, []);
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!ready
          ? <Loader key="loader"/>
          : <motion.div key="app" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2}}>
              <Routes>
                <Route path="/"        element={<Home/>}/>
                <Route path="/comment" element={<Comment/>}/>
                <Route path="/success" element={<Success/>}/>
              </Routes>
            </motion.div>
        }
      </AnimatePresence>
    </BrowserRouter>
  );
}
