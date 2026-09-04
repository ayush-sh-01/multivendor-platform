import React, { useState } from 'react';

const ARTICLES = [
  {
    id: 'selvedge-history',
    tag: 'TEXTILE ANTHROPOLOGY',
    title: 'The Lost Art of Selvedge: Why Collegiate Collectors Are Hoarding 1990s Japanese Looms',
    author: 'Tatsuya M. • Tokyo / Columbia University',
    date: 'March 2026',
    readTime: '6 min read',
    cover: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'When American mills liquidated their Toyoda vintage shuttle looms in the late 20th century, Japanese artisans in Okayama quietly preserved them. Today, student collectors are choosing stiff, unwashed 14oz denim over mass-market synthetics.',
    content: [
      'The modern fashion landscape is drowning in polyester micro-trends designed to decompose in a semester. In contrast, archival Japanese selvedge denim is designed to register the wear patterns, creases, and daily life of its owner over decades.',
      'On university campuses from RISD to NYU Tisch, students are treating heavy denim not simply as trousers, but as personal canvases. Each fade, whiskering mark, and honeycombing behind the knee represents authentic life lived.',
      'At ThriftCampus, every pair of authenticated raw selvedge traded peer-to-peer bypasses oceanic shipping, industrial chemical washing, and commercial markup—keeping pristine heirloom cotton in continuous circulation.'
    ]
  },
  {
    id: 'circular-manifesto',
    tag: 'FASHION CRITIQUE',
    title: 'The Archival Manifesto: Dressing Beyond the Fast-Fashion Abyss',
    author: 'Clara Delacroix • Central Saint Martins Alum',
    date: 'February 2026',
    readTime: '5 min read',
    cover: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Fast fashion promised democracy but delivered an ecological landfill. The collegiate archival movement reclaims craftsmanship, physical provenance, and intentional curation as the highest forms of style.',
    content: [
      'To dress in archival clothing is to reject the planned obsolescence of algorithmic trend cycles. When you wear a 1998 Helmut Lang utility parka or a hand-stitched leather flight jacket, you are carrying forward a tangible fragment of design history.',
      'By facilitating peer-to-peer verified campus hand-offs, ThriftCampus eliminates the carbon-intensive logistics of retail shipping while empowering student tastemakers to monetize their discerning curation.',
      'Our physical vintage swing tags are more than aesthetic: they represent a certificate of peer inspection, verifying condition grade, origin school, and garment provenance.'
    ]
  },
  {
    id: 'curator-focus',
    tag: 'TASTEMAKER SPOTLIGHT',
    title: 'Curator in Focus: Inside a Parsons Senior’s 200-Piece Archival Closet',
    author: 'Siddharth Rao • NYC Campus Correspondent',
    date: 'January 2026',
    readTime: '4 min read',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How Maya Chen turned a 120-square-foot East Village dorm room into a curated archival showroom for Belgian tailoring and vintage workwear.',
    content: [
      '"Most people think archiving clothes requires a temperature-controlled vault in Milan," Maya explains. "In reality, it requires discernment, cedar blocks, and respect for garment construction."',
      'Through ThriftCampus, Maya has circulated over 70 rare pieces to fellow design students, reinvesting 100% of her earnings into deadstock Japanese pieces sourced from estate sales and independent overseas collectors.'
    ]
  }
];

const CARE_GUIDES = [
  {
    title: 'Raw Denim Preservation',
    rule: 'Never machine wash with detergent. Cold ocean soak or spot clean with Marseille soap; hang dry out of direct sunlight.',
    icon: '👖'
  },
  {
    title: 'Vegetable-Tanned Leather',
    rule: 'Condition biannually with natural beeswax and jojoba oil. Never store in plastic; allow the natural grain patina to mature.',
    icon: '🧥'
  },
  {
    title: 'Archival Wool & Mohair',
    rule: 'Brush with natural boar bristles after each wear. Store folded with natural red cedar blocks to deter moths naturally.',
    icon: '🧶'
  }
];

export default function JournalView() {
  const [activeArticle, setActiveArticle] = useState(ARTICLES[0]);

  return (
    <div className="w-full bg-[#121212] text-[#DCDCDC] min-h-screen">
      
      {/* Editorial Header */}
      <section className="bg-dark-luxury-pattern py-20 px-6 md:px-12 border-b border-[#D49A7A]/20">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Editorial & Cultural Archives
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#D49A7A] uppercase tracking-tight mb-4">
            The Journal
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#DCDCDC]/80 max-w-2xl leading-relaxed">
            Essays on garment construction, circular economy manifestos, and preservation manuals written by collegiate fashion curators.
          </p>

        </div>
      </section>

      {/* Main Journal Content */}
      <div className="max-w-[1440px] mx-auto py-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Featured Main Article */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#D49A7A]/25 shadow-2xl">
            <img
              src={activeArticle.cover}
              alt={activeArticle.title}
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-5 left-5 z-10">
              <span className="floating-pill-tag">
                {activeArticle.tag}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 text-xs font-sans text-[#D49A7A]">
              <span>{activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2] uppercase tracking-tight mb-4 leading-tight">
              {activeArticle.title}
            </h2>

            <p className="font-serif italic text-lg text-[#D49A7A] mb-8 pb-6 border-b border-[#D49A7A]/20 leading-relaxed">
              "{activeArticle.excerpt}"
            </p>

            <div className="space-y-5 text-sm sm:text-base font-sans text-[#DCDCDC]/80 leading-relaxed">
              {activeArticle.content.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Vintage Parchment Editorial Pull-Quote */}
            <div className="my-10 p-6 rounded-2xl bg-[#F2EBE5] text-[#1F1713] border border-[#3D2E24]/30 shadow-lg">
              <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#8C5F45] block mb-2">
                COLLEGIATE ARCHIVE PRINCIPLE
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold italic leading-snug">
                "We don't consume fashion; we act as temporary custodians for garments that will outlive us."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Other Stories & Care Manuals */}
        <div className="col-span-1 lg:col-span-4 space-y-12">
          
          {/* Other Articles List */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#D49A7A] pb-3 border-b border-[#D49A7A]/20">
              Recent Dispatches
            </h3>

            <div className="space-y-4">
              {ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    activeArticle.id === art.id
                      ? 'bg-[#1F1F1F] border-[#D49A7A] shadow-md ring-1 ring-[#D49A7A]'
                      : 'bg-[#161616] border-[#D49A7A]/15 hover:border-[#D49A7A]/40'
                  }`}
                >
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.16em] text-[#D49A7A] block mb-1">
                    {art.tag}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#FAF7F2] line-clamp-2 mb-2">
                    {art.title}
                  </h4>
                  <span className="text-[10px] font-sans text-[#A8A8A8]">
                    {art.date} • {art.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Archival Garment Care Manual */}
          <div className="p-6 rounded-2xl bg-[#161616] border border-[#D49A7A]/25 shadow-xl">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#D49A7A] mb-1">
              Archival Care Manual
            </h3>
            <p className="text-xs font-sans text-[#A8A8A8] mb-6">
              Three sacred rules for preserving collector-grade natural textiles.
            </p>

            <div className="space-y-5">
              {CARE_GUIDES.map((guide, gIdx) => (
                <div key={gIdx} className="space-y-1 pb-4 border-b border-[#D49A7A]/10 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{guide.icon}</span>
                    <h5 className="font-serif font-bold text-sm text-[#FAF7F2]">
                      {guide.title}
                    </h5>
                  </div>
                  <p className="text-xs font-sans text-[#DCDCDC]/75 leading-relaxed pl-6">
                    {guide.rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
