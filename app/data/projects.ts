export type DisciplineKind = 'home' | 'commercial';

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: string;
  discipline: DisciplineKind;
  type: string;
  area: string;
  cover: string;
  gallery: string[];
  introduction: string;
  statement: string;
  details: string[];
};

export const projects: Record<DisciplineKind, Project[]> = {
  home: [
    {
      slug: 'sethi-residence', name: 'The Sethi Residence', location: 'New Delhi', year: '2024', discipline: 'home', type: 'Private Residence', area: '8,400 sq ft',
      cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90',
      gallery: ['https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'A quiet home composed around shadow, tactility and the rituals of a multigenerational family.',
      statement: 'Warm stone, smoked oak and hand-finished metal create rooms that feel collected over time.',
      details: ['Interior architecture', 'Bespoke furniture', 'Material direction', 'Art curation'],
    },
    {
      slug: 'house-in-the-hills', name: 'A House in the Hills', location: 'Alibaug', year: '2023', discipline: 'home', type: 'Weekend Residence', area: '6,200 sq ft',
      cover: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90',
      gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'An elemental retreat where the architecture opens slowly to landscape, breeze and long afternoon light.',
      statement: 'The palette is deliberately restrained, allowing proportion, texture and the landscape to lead.',
      details: ['Spatial planning', 'Interior architecture', 'Custom joinery', 'Styling'],
    },
    {
      slug: 'altamount-home', name: 'The Altamount Home', location: 'Mumbai', year: '2024', discipline: 'home', type: 'City Residence', area: '5,100 sq ft',
      cover: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',
      gallery: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'A metropolitan home balancing precise geometry with softness, intimacy and an exceptional art collection.',
      statement: 'Every threshold is calibrated to reveal a new composition of light, object and view.',
      details: ['Interior architecture', 'Lighting direction', 'Bespoke furniture', 'Art placement'],
    },
  ],
  commercial: [
    {
      slug: 'jo-malone-london', name: 'Jo Malone London', location: 'Mumbai', year: '2024', discipline: 'commercial', type: 'Luxury Retail', area: '1,800 sq ft',
      cover: '/images/commercial-hero.jpg',
      gallery: ['https://images.unsplash.com/photo-1608494604059-7971195e13e1?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'A sensorial boutique that translates an iconic fragrance language into light, rhythm and intimate discovery.',
      statement: 'A precise sequence of displays turns product ritual into a spatial experience.',
      details: ['Retail concept', 'Customer journey', 'Display systems', 'Lighting direction'],
    },
    {
      slug: 'galeries-lafayette', name: 'Galeries Lafayette', location: 'New Delhi', year: '2023', discipline: 'commercial', type: 'Department Store', area: '38,000 sq ft',
      cover: 'https://images.unsplash.com/photo-1611611158648-437f072cb7fc?auto=format&fit=crop&w=2200&q=90',
      gallery: ['https://images.unsplash.com/photo-1758448500717-2e4bcd79108b?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1567449303078-57ad995bd17a?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'A contemporary retail landmark organised as a sequence of luminous galleries and moments of pause.',
      statement: 'Scale and intimacy coexist through a family of architectural frames, thresholds and curated vistas.',
      details: ['Creative direction', 'Retail planning', 'Material strategy', 'Wayfinding'],
    },
    {
      slug: 'house-of-masaba', name: 'House of Masaba', location: 'Mumbai', year: '2024', discipline: 'commercial', type: 'Fashion Boutique', area: '2,400 sq ft',
      cover: '/images/commercial-entry.jpg',
      gallery: ['https://images.unsplash.com/photo-1764779169348-353c6d99dbd0?auto=format&fit=crop&w=2200&q=90','https://images.unsplash.com/photo-1608494604059-7971195e13e1?auto=format&fit=crop&w=1800&q=90','https://images.unsplash.com/photo-1555529771-35a38b17017f?auto=format&fit=crop&w=1800&q=90'],
      introduction: 'A vivid fashion environment shaped by saturated colour, crafted detail and playful discovery.',
      statement: 'The store turns the label’s expressive visual world into a sequence of collectible rooms.',
      details: ['Brand environment', 'Interior architecture', 'Display design', 'Art direction'],
    },
  ],
};

export function getProject(discipline: string, slug: string) {
  const kind: DisciplineKind = discipline === 'commercial' ? 'commercial' : 'home';
  return projects[kind].find((project) => project.slug === slug);
}
