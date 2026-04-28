import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Slider({ items = [] }) {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const timer = setInterval(() => {
      setCur((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) return null;

  const prev = () => {
    setCur((prev) => (prev - 1 + items.length) % items.length);
  };

  const next = () => {
    setCur((prev) => (prev + 1) % items.length);
  };

  const item = items[cur];

  return (
    <div className="w-full flex flex-col items-center">

      {/* Main Slider Card */}
      <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">

        {/* Image */}
        <img
          src={item.image}
          alt=""
          className="w-full h-[520px] sm:h-[620px] md:h-[720px] object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/40 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md">
          {String(cur + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>

        {/* Caption */}
        {item.caption && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center">
            <p className="text-white text-lg md:text-2xl italic leading-relaxed">
              "{item.caption}"
            </p>
          </div>
        )}

        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/55 text-white p-3 rounded-full transition"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/55 text-white p-3 rounded-full transition"
        >
          <FiChevronRight size={24} />
        </button>

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === cur ? 'w-8 bg-pink-500' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

    </div>
  );
}