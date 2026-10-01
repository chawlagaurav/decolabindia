'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import SiteMenu from '../components/SiteMenu';

const leaders = [
  { role: 'Founder & Creative Director', index: '01', monogram: 'FC' },
  { role: 'Chief Executive Officer', index: '02', monogram: 'CEO' },
  { role: 'Chief Financial Officer', index: '03', monogram: 'CFO' }
];

export default function AboutPage() {
  const page = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = page.current?.querySelectorAll('[data-about-reveal]') ?? [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: .14, rootMargin: '0px 0px -7% 0px' }
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    event.currentTarget.style.setProperty('--about-x', x.toFixed(3));
    event.currentTarget.style.setProperty('--about-y', y.toFixed(3));
  };

  return (
    <main className="about-page" ref={page}>
      <nav className="about-nav">
        <Link href="/" className="wordmark">DECOLAB<sup>®</sup></Link>
        <span>INTERIOR ARCHITECTURE · EST. 2016</span>
        <SiteMenu />
      </nav>

      <section className="about-hero" onPointerMove={moveHero}>
        <div className="about-hero-image" />
        <div className="about-hero-grid" />
        <div className="about-object" aria-hidden="true"><i/><i/><b>FORM<br/>FOLLOWS<br/><em>FEELING</em></b></div>
        <p className="about-kicker">[ About the studio ] <span>— 01</span></p>
        <h1>Spaces begin<br/>with <em>people.</em></h1>
        <p className="about-hero-copy">We create interiors with emotional clarity—places that feel inevitable, personal and entirely their own.</p>
        <div className="about-scroll"><ArrowDown size={18}/> SCROLL TO MEET DECOLAB</div>
      </section>

      <section className="about-intro">
        <p className="about-section-index" data-about-reveal>01 / OUR POINT OF VIEW</p>
        <div>
          <h2 data-about-reveal>Design with instinct.<br/><em>Resolved with rigour.</em></h2>
          <div className="about-intro-body">
            <p data-about-reveal>Decolab is an interior architecture and design studio working across private residences, hospitality, retail and culture. We begin by listening—to a person, a place and the ambitions held within it.</p>
            <p data-about-reveal>Our work moves between the intuitive and the exact. Material, light, proportion and craft come together to make spaces that are quietly distinctive and built to endure.</p>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="about-principles-visual" data-about-reveal>
          <div className="about-frame about-frame-one"/><div className="about-frame about-frame-two"/>
          <span>DEC<br/>OLAB</span><small>THE SPACE BETWEEN<br/>IDEA AND EXPERIENCE</small>
        </div>
        <div className="about-principles-copy">
          <p className="about-section-index" data-about-reveal>02 / HOW WE THINK</p>
          {[
            ['Context before style', 'Every project grows from its setting, its purpose and the lives unfolding inside it.'],
            ['Feeling through material', 'We use texture, light and craft to turn an idea into something you can sense.'],
            ['Precision without noise', 'Complex thinking is distilled into spaces that feel calm, clear and effortless.']
          ].map(([title, copy], index) => (
            <article className="about-principle" data-about-reveal style={{'--about-delay': `${index * 120}ms`} as React.CSSProperties} key={title}>
              <span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight/>
            </article>
          ))}
        </div>
      </section>

      <section className="about-team">
        <div className="about-team-head">
          <p className="about-section-index" data-about-reveal>03 / LEADERSHIP</p>
          <h2 data-about-reveal>A studio shaped<br/>by <em>many minds.</em></h2>
          <p data-about-reveal>Our leadership profiles are ready for the final portraits and biographies. The structure can grow with the studio.</p>
        </div>
        <div className="about-team-grid">
          {leaders.map((leader, index) => (
            <article className="leader-card" data-about-reveal style={{'--about-delay': `${index * 140}ms`} as React.CSSProperties} key={leader.role}>
              <div className="leader-portrait"><span>{leader.monogram}</span><i/><i/></div>
              <div className="leader-meta"><span>{leader.index}</span><div><h3>Name to be added</h3><p>{leader.role}</p></div><ArrowUpRight/></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <p data-about-reveal>[ NEW DELHI · MUMBAI · LONDON ]</p>
        <h2 data-about-reveal>Let’s create a place<br/>worth <em>remembering.</em></h2>
        <Link href="/home#contact" data-about-reveal>START A CONVERSATION <ArrowUpRight/></Link>
        <footer><span>© DECOLAB 2026</span><Link href="/">BACK TO WORLDS ↑</Link></footer>
      </section>
    </main>
  );
}
