'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DisciplineKind } from '../data/projects';

const services = {
  home: [
    ['Interior Architecture', 'Structure, circulation and proportion composed around daily life.'],
    ['Spatial Planning', 'Every threshold and sightline resolved for ease and intimacy.'],
    ['Bespoke Furniture', 'One-off pieces developed with exceptional makers and craftspeople.'],
    ['Material Direction', 'A tactile palette shaped through light, ageing and touch.'],
    ['Art & Object Curation', 'Objects selected and placed as part of the architecture.'],
  ],
  commercial: [
    ['Brand Environments', 'Brand character translated into a physical and memorable world.'],
    ['Customer Journeys', 'Movement choreographed from first impression to final detail.'],
    ['Retail Architecture', 'Flexible systems with a strong and recognisable spatial language.'],
    ['Material Direction', 'Surfaces chosen for atmosphere, longevity and distinctive identity.'],
    ['Display & Styling', 'Product, light and object brought together as one composition.'],
  ],
};

export default function CapabilitiesReveal({ kind }: { kind: DisciplineKind }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .18 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={`capabilities ${visible ? 'is-visible' : ''}`} style={{ '--active': active } as React.CSSProperties}>
      <div className="capability-visual"><span>0{active + 1}</span><i/><i/><b>{services[kind][active][0]}</b></div>
      <div className="capability-list">
        {services[kind].map(([title, description], index) => (
          <div className={`capability-row ${active === index ? 'is-active' : ''}`} key={title} onMouseEnter={() => setActive(index)} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
            <span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={20}/>
          </div>
        ))}
      </div>
    </div>
  );
}
