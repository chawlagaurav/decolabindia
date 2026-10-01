'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { DisciplineKind } from '../data/projects';

const content = {
  home: {
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=90',
    services: [
      ['Interior Architecture', 'Plans, volumes and thresholds resolved as one calm architectural idea.'],
      ['Bespoke Furniture', 'Original pieces developed for the exact scale and spirit of the room.'],
      ['Material Direction', 'Stone, timber, metal and textile selected for touch, patina and light.'],
      ['Art Curation', 'Art and objects placed to create rhythm, tension and moments of discovery.'],
    ],
  },
  commercial: {
    image: '/images/commercial-entry.jpg',
    services: [
      ['Brand Architecture', 'A physical language that makes the brand recognisable without signage.'],
      ['Retail Journeys', 'Customer movement composed through reveal, pause and focused discovery.'],
      ['Display Systems', 'Flexible product frameworks designed as part of the architecture.'],
      ['Experience Styling', 'Light, scent, sound and object brought into one coherent atmosphere.'],
    ],
  },
};

export default function CraftServices({ kind }: { kind: DisciplineKind }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const data = content[kind];
  const active = hovered ?? open;

  const toggle = (index: number) => setOpen((current) => current === index ? null : index);

  return (
    <section className={`craft-grid craft-interactive ${active !== null ? 'has-active' : ''}`} data-scroll-reveal>
      <div className="craft-image-shell">
        <div className="craft-image" style={{ backgroundImage: `url(${data.image})` }}/><div className="craft-negative"/>
        <span className="craft-image-index">{active === null ? '00' : `0${active + 1}`} / 04</span>
      </div>
      <div className="craft-copy"><span>01 — 04</span><h3>We begin<br/>with what<br/>cannot be<br/><em>measured.</em></h3><p>Atmosphere. Memory. A particular quality of light. These become our brief—and our guide through every decision.</p></div>
      <div className="craft-list">{data.services.map(([title, description], index) => (
        <button type="button" className={open === index ? 'is-open' : ''} key={title} onClick={() => toggle(index)} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} aria-expanded={open === index}>
          <span>0{index + 1}</span><span className="craft-service-copy"><b>{title}</b><small>{description}</small></span><Plus size={18}/>
        </button>
      ))}</div>
    </section>
  );
}
