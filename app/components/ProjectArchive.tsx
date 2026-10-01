'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import SiteMenu from './SiteMenu';
import { projects, type DisciplineKind } from '../data/projects';

type Filter = 'all' | DisciplineKind;

export default function ProjectArchive() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = useMemo(() => filter === 'all' ? [...projects.home, ...projects.commercial] : projects[filter], [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
    document.querySelectorAll('.archive-card').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <main className="archive-page">
      <nav className="archive-nav"><Link href="/" className="wordmark">DECOLAB<sup>®</sup></Link><span>NEW DELHI · MUMBAI · LONDON</span><SiteMenu/></nav>
      <header className="archive-hero"><p>[ Selected work · 2023—2026 ]</p><h1>Places with<br/><em>presence.</em></h1><div className="archive-scroll"><ArrowDown size={18}/> EXPLORE THE WORK</div></header>
      <div className="archive-filter">
        {(['all','home','commercial'] as Filter[]).map((item) => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{item === 'all' ? 'All projects' : item === 'home' ? 'Residences' : 'Commercial'} <span>{item === 'all' ? '06' : '03'}</span></button>)}
      </div>
      <section className="archive-grid">
        {visible.map((project,index) => <Link className="archive-card" href={`/${project.discipline}/${project.slug}`} key={project.slug} style={{'--archive-delay':`${(index % 2) * 120}ms`} as React.CSSProperties}>
          <div className="archive-image" style={{backgroundImage:`url(${project.cover})`}}><span>OPEN CASE <ArrowUpRight size={18}/></span></div>
          <div className="archive-meta"><span>0{index+1}</span><div><h2>{project.name}</h2><p>{project.location} · {project.year} / {project.type}</p></div><ArrowUpRight/></div>
        </Link>)}
      </section>
      <footer className="archive-footer"><p>Every project begins with<br/>a particular feeling.</p><Link href="/home#contact">START A CONVERSATION <ArrowUpRight/></Link></footer>
    </main>
  );
}
