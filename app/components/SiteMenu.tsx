'use client';

import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SiteMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button className="menu-button menu-trigger" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-menu">
        MENU <span className="menu-glyph"><i/><i/></span>
      </button>
      <div className={`menu-overlay ${open ? 'is-open' : ''}`} id="site-menu" aria-hidden={!open}>
        <div className="menu-wash" />
        <header className="menu-head"><span className="wordmark">DECOLAB<sup>®</sup></span><button onClick={closeMenu} className="menu-close"><X size={21}/> CLOSE</button></header>
        <nav className="menu-links">
          <Link href="/" onClick={closeMenu}><span>00</span>Index<ArrowUpRight/></Link>
          <Link href="/home" onClick={closeMenu}><span>01</span>Residences<ArrowUpRight/></Link>
          <Link href="/commercial" onClick={closeMenu}><span>02</span>Commercial<ArrowUpRight/></Link>
          <Link href="/home#studio" onClick={closeMenu}><span>03</span>Studio<ArrowUpRight/></Link>
        </nav>
        <footer className="menu-foot"><span>NEW DELHI · MUMBAI · LONDON</span><a href="mailto:studio@decolab.com">STUDIO@DECOLAB.COM</a></footer>
      </div>
    </>
  );
}
