'use client';

import { useEffect, useRef } from 'react';

const films = {
  home: {
    source: '/videos/residential-cinematic.mp4',
    poster: '/images/residential-cinematic-poster.jpg',
    duration: '10 SEC',
    eyebrow: 'A study in domestic calm',
    title: <>Rooms that<br/><em>breathe.</em></>,
    note: 'Light, tactility and the quiet rhythm of home.'
  },
  commercial: {
    source: '/videos/commercial-cinematic.mp4',
    poster: '/images/commercial-cinematic-poster.jpg',
    duration: '09 SEC',
    eyebrow: 'A study in brand experience',
    title: <>Identity,<br/><em>made spatial.</em></>,
    note: 'Atmosphere designed to hold attention and memory.'
  }
};

export default function CinematicFilm({ kind }: { kind: 'home' | 'commercial' }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const film = films[kind];

  useEffect(() => {
    const node = section.current;
    const player = video.current;
    if (!node || !player || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) player.play().catch(() => undefined);
      else player.pause();
    }, { threshold: .16 });
    observer.observe(node);
    return () => { observer.disconnect(); player.pause(); };
  }, [kind]);

  return (
    <section className="film-section" ref={section}>
      <div className="film-heading" data-scroll-reveal>
        <p>[ In motion ]</p><span>04 — A LIVING PERSPECTIVE</span>
      </div>
      <div className="film-stage" data-scroll-reveal>
        <video key={film.source} ref={video} muted loop playsInline preload="metadata" poster={film.poster} aria-hidden="true">
          <source src={film.source} type="video/mp4" />
        </video>
        <div className="film-shade"/><div className="film-grid"/>
        <p className="film-eyebrow">{film.eyebrow}</p>
        <h2>{film.title}</h2>
        <p className="film-note">{film.note}</p>
        <span className="film-live"><i/> LOOP / {film.duration}</span>
      </div>
    </section>
  );
}
