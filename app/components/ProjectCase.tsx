'use client';

import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import SiteMenu from './SiteMenu';
import type { Project } from '../data/projects';

export default function ProjectCase({ project, nextProject }: { project: Project; nextProject: Project }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-revealed'));
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`case-page ${project.discipline}`}>
      <nav className="case-nav"><Link href="/" className="wordmark">DECOLAB<sup>®</sup></Link><Link className="case-back" href={`/${project.discipline}`}><ArrowLeft size={17}/> ALL PROJECTS</Link><SiteMenu/></nav>
      <section className="case-hero">
        <div className="case-hero-image" style={{ backgroundImage: `url(${project.cover})` }}/><div className="case-hero-shade"/>
        <div className="case-index"><span>CASE STUDY</span><span>{project.location} · {project.year}</span></div>
        <h1>{project.name}</h1>
        <div className="case-scroll"><ArrowDown size={18}/> ENTER THE PROJECT</div>
      </section>

      <section className="case-intro" data-reveal>
        <p className="eyebrow">[ The commission ]</p>
        <div className="case-intro-copy"><h2>{project.introduction}</h2><p>{project.statement}</p></div>
        <dl><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Typology</dt><dd>{project.type}</dd></div><div><dt>Area</dt><dd>{project.area}</dd></div></dl>
      </section>

      <section className="case-image case-image-wide" data-reveal><img src={project.gallery[0]} alt={`${project.name} principal interior`}/><span>01 / Atmosphere</span></section>

      <section className="case-narrative" data-reveal>
        <span className="case-big-no">01</span><div><p className="eyebrow">[ Design idea ]</p><h2>Space is felt<br/>before it is<br/><em>understood.</em></h2></div>
        <p>Each room is developed as a complete atmosphere. Light, material, proportion and movement work together to create a distinct emotional register.</p>
      </section>

      <section className="case-image-pair">
        <div className="case-image portrait" data-reveal><img src={project.gallery[1]} alt={`${project.name} material detail`}/><span>02 / Material</span></div>
        <div className="case-image landscape" data-reveal><img src={project.gallery[2]} alt={`${project.name} spatial detail`}/><span>03 / Detail</span></div>
      </section>

      <section className="case-scope" data-reveal><p className="eyebrow">[ Scope ]</p><div>{project.details.map((detail,index)=><div key={detail}><span>0{index+1}</span><h3>{detail}</h3></div>)}</div></section>

      <Link href={`/${nextProject.discipline}/${nextProject.slug}`} className="next-case">
        <div className="next-case-image" style={{backgroundImage:`url(${nextProject.cover})`}}/><span>NEXT PROJECT</span><h2>{nextProject.name}</h2><ArrowUpRight/>
      </Link>
    </main>
  );
}
