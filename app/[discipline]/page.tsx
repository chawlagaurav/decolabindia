'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import InteractiveHeroScene from '../components/InteractiveHeroScene';
import CapabilitiesReveal from '../components/CapabilitiesReveal';
import SiteMenu from '../components/SiteMenu';
import CraftServices from '../components/CraftServices';
import { projects } from '../data/projects';

const data = {
  home: { kicker: 'Private Residences', title: <>A life, <em>considered.</em></>, description: 'We shape private homes around the rarest luxury: the feeling of being entirely yourself.', image: '/images/residential-hero.jpg' },
  commercial: { kicker: 'Brand Environments', title: <>A world, <em>made tangible.</em></>, description: 'We turn a brand’s most elusive qualities into environments that stay with you long after you leave.', image: '/images/commercial-hero.jpg' }
};

export default function Discipline({ params }: { params: Promise<{ discipline: string }> }) {
  const [kind, setKind] = useState<'home' | 'commercial'>('home'); const [scroll, setScroll] = useState(0);
  useEffect(() => { params.then(p => setKind(p.discipline === 'commercial' ? 'commercial' : 'home')); }, [params]);
  useEffect(() => { const onScroll=()=>setScroll(window.scrollY); window.addEventListener('scroll',onScroll); return()=>window.removeEventListener('scroll',onScroll); }, []);
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-scroll-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-in-view')), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [kind]);
  const page = data[kind];
  const projectList = projects[kind];
  return <main className={`discipline ${kind}`}>
    <nav className="site-nav"><Link href="/" className="wordmark">DECOLAB<sup>®</sup></Link><div className="nav-center"><a href="#studio">Studio</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><SiteMenu /></nav>
    <section className="hero">
      <div className="hero-art" style={{ backgroundImage: `url(${page.image})`, transform: `scale(${1.03 + Math.min(scroll,900)/6500}) translateY(${scroll*.08}px)` }} />
      <div className="hero-veil" />
      <InteractiveHeroScene kind={kind} progress={Math.min(scroll / 720, 1)} />
      <div className="hero-glow" /><p className="hero-kicker">{page.kicker} <span>— 01</span></p><div className="hero-copy"><h1>{page.title}</h1><p>{page.description}</p></div><div className="hero-scroll"><ArrowDown size={18}/><span>Scroll to shape the scene</span></div><div className="hero-coordinate"><span>INTERACTIVE OBJECT</span> &nbsp; / &nbsp; MOVE TO EXPLORE</div>
    </section>
    <section className="statement" id="studio"><aside className="statement-mark" data-scroll-reveal><p className="eyebrow">[ Our expertise ]</p><h3><span>What</span><span>We</span><em>Do.</em></h3><div className="statement-orbit"><i/><i/></div><small>01 — 05</small></aside><div><h2 data-scroll-reveal>From an initial<br/>feeling to the<br/><em>final detail.</em></h2><p className="body-copy" data-scroll-reveal>Decolab is an interior architecture studio creating extraordinary spaces for discerning individuals and global brands. Our process brings together a sharp point of view, material intelligence and obsessive craft.</p><a href="#contact" className="text-link" data-scroll-reveal>OUR APPROACH <ArrowUpRight size={16}/></a><CapabilitiesReveal kind={kind}/></div></section>
    <CraftServices kind={kind}/>
    <section className="projects" id="projects"><div className="projects-head" data-scroll-reveal><p className="eyebrow">[ Selected work ]</p><h2>Places with<br/><em>presence.</em></h2><Link className="round-link" href="/projects">VIEW ALL <ArrowUpRight size={18}/></Link></div><div className="project-grid">{projectList.map((project,i)=><Link href={`/${kind}/${project.slug}`} className={`project project-${i}`} key={project.slug} data-scroll-reveal style={{'--reveal-delay':`${i * 130}ms`} as React.CSSProperties}><div className="project-image" style={{backgroundImage:`url(${project.cover})`}}><span>VIEW CASE</span></div><div className="project-meta"><div><h3>{project.name}</h3><p>{project.location} · {project.year}</p></div><ArrowUpRight size={20}/></div></Link>)}</div></section>
    <section className="contact" id="contact"><div className="contact-aura"><i/><i/></div><p className="eyebrow" data-scroll-reveal>[ Begin a conversation ]</p><h2 data-scroll-reveal>Let’s make<br/>something<br/><em>lasting.</em></h2><a href="mailto:studio@decolab.com" className="contact-email" data-scroll-reveal>studio@decolab.com <ArrowUpRight/></a><div className="contact-bottom"><span>NEW DELHI · MUMBAI · LONDON</span><span>© DECOLAB 2026</span><Link href="/">BACK TO WORLDS ↑</Link></div></section>
  </main>
}
