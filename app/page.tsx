'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SiteMenu from './components/SiteMenu';

export default function Gateway() {
  const cursor = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const move = (e: MouseEvent) => { if (cursor.current) cursor.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`; setPointer({x:e.clientX/window.innerWidth*100,y:e.clientY/window.innerHeight*100}); };
    window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <main className="gateway">
      <div className="cursor-dot" ref={cursor} />
      <nav className="gateway-nav"><span className="wordmark">DECOLAB<sup>®</sup></span><span>New Delhi · Mumbai · London</span><SiteMenu /></nav>
      <section className="gateway-intro"><p className="eyebrow">The art of spatial distinction</p><h1>Choose your<br/><em>world.</em></h1><p className="intro-note">Spaces are never simply built. They are composed, choreographed and felt.</p></section>
      <div className="worlds">
        <Link href="/home" className="world residence" style={{'--mx': `${(pointer.x-50)*.045}px`, '--my': `${(pointer.y-50)*.045}px`} as React.CSSProperties}>
          <div className="world-image" /><div className="world-shade" /><div className="world-material"><i/><i/><i/></div>
          <span className="world-no">01</span><div className="world-label"><p>Private residences</p><h2>Home<br/><em>Interiors</em></h2></div><span className="world-arrow"><ArrowUpRight size={22}/></span>
        </Link>
        <Link href="/commercial" className="world commercial" style={{'--mx': `${(pointer.x-50)*-.04}px`, '--my': `${(pointer.y-50)*-.04}px`} as React.CSSProperties}>
          <div className="world-image" /><div className="world-shade" /><div className="world-material"><i/><i/><i/></div>
          <span className="world-no">02</span><div className="world-label"><p>Brand environments</p><h2>Commercial<br/><em>Interiors</em></h2></div><span className="world-arrow"><ArrowUpRight size={22}/></span>
        </Link>
      </div>
      <footer className="gateway-footer"><span>SCROLL TO EXPLORE</span><span>© 2026 DECOLAB STUDIO</span></footer>
    </main>
  );
}
