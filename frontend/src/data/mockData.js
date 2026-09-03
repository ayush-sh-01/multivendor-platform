export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Raw Selvedge Wide Jeans",
    price: 95,
    size: "Size 32",
    category: "Jeans",
    condition: "9.8/10 Deadstock",
    curator: "Maya Chen",
    campus: "NYU Tisch",
    description: "Wide-leg, heavyweight raw Japanese selvedge denim with crisp contrast white stitching and structured drape. Zero synthetic stretch.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    tags: ["Selvedge", "Wide Silhouette", "Raw"],
    inStock: true
  },
  {
    id: 2,
    name: "Vintage Indigo Loose Denim",
    price: 85,
    size: "Size 34",
    category: "Jeans",
    condition: "9.2/10 Pristine Vintage",
    curator: "Soren K.",
    campus: "Parsons Paris",
    description: "Classic loose fit vintage washed denim with authentic natural fading and relaxed skate silhouette.",
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80",
    tags: ["Loose Fit", "Vintage Wash", "90s"],
    inStock: true
  },
  {
    id: 3,
    name: "Striped Old Money Oxford Shirt",
    price: 65,
    size: "Size L",
    category: "Shirts",
    condition: "9.5/10 Excellent",
    curator: "Julian V.",
    campus: "Central Saint Martins",
    description: "Crisp cotton striped button-down shirt with structured classic collar and tailored cuffs. Timeless archival prep aesthetic.",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
    tags: ["Oxford", "Old Money", "Striped"],
    inStock: true
  },
  {
    id: 4,
    name: "Vintage Sport Activewear Tee",
    price: 45,
    size: "Size XL",
    category: "Shirts",
    condition: "9.0/10 Great",
    curator: "Chloe Bennett",
    campus: "RISD",
    description: "Heavyweight breathable activewear graphic tee with subtle retro typography and reinforced crew neckline.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    tags: ["Activewear", "Vintage", "Streetwear"],
    inStock: true
  },
  {
    id: 5,
    name: "Archival Washed Bomber Jacket",
    price: 135,
    size: "Size M",
    category: "Jackets",
    condition: "9.6/10 Near Mint",
    curator: "Soren K.",
    campus: "Parsons Paris",
    description: "Washed utility bomber jacket with heavy-gauge industrial zipper, ribbed trims, and authentic vintage distress.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    tags: ["Bomber", "Utility", "Heavy Denim"],
    inStock: true
  },
  {
    id: 6,
    name: "Heavy Tactical Utility Parka",
    price: 165,
    size: "Size L",
    category: "Jackets",
    condition: "9.7/10 Archival",
    curator: "Maya Chen",
    campus: "NYU Tisch",
    description: "Structured oversized utility parka with storm flap, metallic snaps, storm cuffs, and deep cargo bellows pockets.",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    tags: ["Parka", "Outerwear", "Technical"],
    inStock: true
  }
];


export const CATEGORIES = [
  {
    id: "jeans",
    name: "Jeans & Denim",
    count: 48,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    desc: "Japanese raw selvedge, 90s vintage loose washes, and wide silhouettes."
  },
  {
    id: "jackets",
    name: "Jackets & Outerwear",
    count: 36,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    desc: "Heavy tactical parkas, vintage bombers, workwear, and denim jackets."
  },
  {
    id: "shirts",
    name: "Shirts & Tops",
    count: 42,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
    desc: "Old money striped oxfords, boxy button-downs, and vintage graphic tees."
  },
  {
    id: "vintage",
    name: "Archival Finds",
    count: 24,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    desc: "Curated one-of-one pieces, student designer drops, and rare retro grails."
  }
];


export const TOP_CURATORS = [
  {
    id: 1,
    name: "Soren Krause",
    handle: "@soren_archival",
    campus: "Parsons Paris",
    rating: "4.98",
    sales: 148,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    specialty: "Jackets & 90s Vintage Workwear",
    verified: true
  },
  {
    id: 2,
    name: "Maya Chen",
    handle: "@maya_tisch",
    campus: "NYU Tisch School of the Arts",
    rating: "4.95",
    sales: 210,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    specialty: "Japanese Selvedge Denim & Loose Fits",
    verified: true
  },
  {
    id: 3,
    name: "Julian Vance",
    handle: "@julian_csm",
    campus: "Central Saint Martins",
    rating: "5.00",
    sales: 94,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    specialty: "Old Money Oxfords & Tailored Shirts",
    verified: true
  },
  {
    id: 4,
    name: "Chloe Bennett",
    handle: "@chloe_risd",
    campus: "RISD Apparel Design",
    rating: "4.92",
    sales: 173,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    specialty: "Graphic Tees & Streetwear Pieces",
    verified: true
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Curate & Snap",
    desc: "Take high-contrast editorial photos of your curated garments. Add precise measurements, fabric composition, and condition rating."
  },
  {
    number: "02",
    title: "Campus Peer Verification",
    desc: "Every item is vetted for authenticity and aesthetic standard by recognized student curators on your campus before publishing."
  },
  {
    number: "03",
    title: "Zero-Fee Hand-off or Ship",
    desc: "Meet on campus at designated student unions for instant zero-carbon pickup, or ship nationwide with pre-paid tracked packaging."
  }
];
