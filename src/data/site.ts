const localImage = (name: string) => `${import.meta.env.BASE_URL}images/${name}-1600.webp`;

export const images = {
  hero: localImage("hero"),
  salon: localImage("salon"),
  panelRoom: localImage("panel-room"),
  dining: localImage("dining"),
  marbleHall: localImage("marble-hall"),
  foyer: localImage("foyer"),
  palace: localImage("palace"),
  living: localImage("living"),
  lounge: localImage("lounge"),
  castle: localImage("castle"),
  villa: localImage("villa"),
  courtyard: localImage("courtyard"),
  chandelier: localImage("chandelier"),
  piano: localImage("piano"),
  fresco: localImage("fresco"),
  ceiling: localImage("ceiling"),
  veniceHall: localImage("venice-hall"),
  boiserie: localImage("boiserie"),
  carvedPanels: localImage("carved-panels"),
  artisan: localImage("artisan"),
  hands: localImage("hands"),
  chisel: localImage("chisel"),
  planing: localImage("planing"),
  door: localImage("door"),
  doorDetail: localImage("door-detail"),
  art: localImage("art"),
  sculpture: localImage("sculpture"),
  armchair: localImage("armchair"),
  sofa: localImage("sofa"),
  velvet: localImage("velvet"),
  chairDetail: localImage("chair-detail"),
};

export const CONTACT = {
  email: "concierge@milanovilla.com",
  phone: "[ADD PHONE]",
  principal: "[ADD NAME]",
  location: "Washington DC area · consultations by appointment",
  reach: "Serving clients across the United States and worldwide",
};

export const hasContactValue = (value: string) => !/^\[ADD .+\]$/.test(value);

export const nav = [
  { label: "The Atelier", to: "/atelier" },
  { label: "Disciplines", to: "/disciplines" },
  { label: "Commissions", to: "/commissions" },
  { label: "Realization", to: "/realization" },
];

export type Discipline = {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  image: string;
  alt: string;
};

export const disciplines: Discipline[] = [
  {
    id: "project-assignment",
    index: "01",
    title: "Project Assignment",
    short: "The residence, resolved in full.",
    description:
      "Full interior design of a villa or residence, drawn from the architecture outward. Elevations, floor plans, furniture layouts and 3D renders are prepared as one coherent whole, so that every room belongs to the same house.",
    includes: [
      "Architectural drawings and elevations",
      "Floor plans and furniture layouts",
      "Material and finish palettes",
      "3D rendered room studies",
    ],
    image: images.living,
    alt: "A wide, pale drawing room with classical proportions and composed furniture",
  },
  {
    id: "luxury-interiors",
    index: "02",
    title: "Luxury Interiors",
    short: "Salons in classic and contemporary voice.",
    description:
      "Grand salons and private rooms, furnished from the first hand sketch to the finished room. We compose seating, tables and casegoods for the way the room is lived in, then make them in the workshops that know the forms best.",
    includes: [
      "Room composition and furniture plans",
      "Custom sofas, chairs and casegoods",
      "Textiles, leathers and trims",
      "Placement and installation",
    ],
    image: images.salon,
    alt: "An opulent salon with a crystal chandelier, gilded mirrors and formal seating",
  },
  {
    id: "flooring-design",
    index: "03",
    title: "Flooring Design",
    short: "Marble, inlay and parquet.",
    description:
      "Marble, inlaid stone and parquet floors, drawn pattern by pattern. Border widths, veining and the direction of the grain are settled on paper before the stone is cut.",
    includes: [
      "Marble and stone specifications",
      "Inlaid and patterned floors",
      "Parquet and timber borders",
      "Workshop drawings and templates",
    ],
    image: images.marbleHall,
    alt: "A marble-floored entrance hall with a stair and classical columns",
  },
  {
    id: "ceiling-decoration",
    index: "04",
    title: "Ceiling Decoration",
    short: "Coffered, painted and moulded.",
    description:
      "A ceiling sets the proportion of everything beneath it. We design coffers, plasterwork, painted panels and applied ornament, made to the geometry of the room rather than imported from a pattern book.",
    includes: [
      "Coffered and panelled ceilings",
      "Decorative painting and gilding",
      "Plaster mouldings and cornices",
      "Ceiling roses and centrepieces",
    ],
    image: images.fresco,
    alt: "A richly decorated palazzo ceiling with painted panels and carved detail",
  },
  {
    id: "wall-and-ceiling",
    index: "05",
    title: "Wall & Ceiling",
    short: "Boiserie and decorative finishes.",
    description:
      "Boiserie, mouldings and decorative wall finishes, carved and fitted to the room's own dimensions. Panelled walls and concealed doors are made as joinery, not applied as decoration.",
    includes: [
      "Carved boiserie and panelling",
      "Concealed doors and panels",
      "Mouldings, cornices and dados",
      "Plaster, gilding and painted finishes",
    ],
    image: images.panelRoom,
    alt: "A grand room lined with pale classical wood panelling",
  },
  {
    id: "lighting",
    index: "06",
    title: "Lighting",
    short: "Crystal chandeliers and bespoke light.",
    description:
      "Crystal chandeliers, lanterns and bespoke fixtures, specified for the ceiling height and the life of the room. Light is planned in layers: the gesture, the task, and the quiet wash that holds a wall.",
    includes: [
      "Crystal and glass chandeliers",
      "Bespoke pendants and lanterns",
      "Wall, table and floor lighting",
      "Layout, switching and placement",
    ],
    image: images.chandelier,
    alt: "A crystal chandelier against a dark timber ceiling",
  },
  {
    id: "doors-and-windows",
    index: "07",
    title: "Doors and Windows",
    short: "Thresholds drawn to the house.",
    description:
      "Handcrafted interior and exterior doors and windows, made to the proportions of the architecture. Panels, mouldings, ironmongery and finish are drawn together so the threshold reads as part of the building.",
    includes: [
      "Interior and exterior doors",
      "Casement and sash windows",
      "Panelled and glazed joinery",
      "Hand-finished hardware",
    ],
    image: images.door,
    alt: "A pair of tall hand-carved timber doors set in a stone facade",
  },
  {
    id: "art-and-accessories",
    index: "08",
    title: "Art Works & Accessories",
    short: "The last five per cent.",
    description:
      "Art, objects and finishing pieces, placed with the restraint a completed room deserves. Mirrors, frames, ceramics and sculpture are selected for their line and their company, never to fill a surface.",
    includes: [
      "Art advisory and placement",
      "Mirrors, frames and objects",
      "Ceramics, glass and silver",
      "Sculpture and finishing pieces",
    ],
    image: images.art,
    alt: "A calm gallery room hung with classical portraits",
  },
];

export type Project = {
  slug: string;
  plate: string;
  title: string;
  discipline: string;
  place: string;
  image: string;
  alt: string;
  excerpt: string;
  overview: string;
  approach: string;
  details: string[];
  materials: string[];
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "grand-salon",
    plate: "I",
    title: "The Grand Salon",
    discipline: "Complete interior · Furniture",
    place: "Washington, DC",
    image: images.salon,
    alt: "A grand salon with chandelier, tall mirrors and formal upholstered seating",
    excerpt:
      "A double-height salon composed around its existing stone fireplace, resolved as one drawing before a single piece was made.",
    overview:
      "The room was already beautiful and not quite usable. A long sequence of arrangements had left its centre crowded and its garden doors hard to reach. We began by drawing the room empty, then built the furniture plan back to the architecture.",
    approach:
      "Seating was set on the room's long axis, leaving the centre clear. A pair of sofas in ivory silk velvet face one another across a low walnut table; the fireplace holds the short wall, unadorned. Above, a crystal chandelier was scaled to the ceiling rather than the floor, so that the room reads quiet at eye level and luminous after dark.",
    details: [
      "Bespoke sofas and lounge chairs",
      "Custom walnut tables and console",
      "Crystal chandelier, scaled to the salon",
      "Hand-knotted wool and silk carpet",
    ],
    materials: ["Ivory silk velvet", "Hand-planed walnut", "Cut crystal", "Wool and silk"],
    gallery: [
      { src: images.salon, alt: "The finished salon in warm evening light" },
      { src: images.chandelier, alt: "Crystal chandelier detail" },
      { src: images.armchair, alt: "Upholstered chair and gilded side table detail" },
    ],
  },
  {
    slug: "marble-hall",
    plate: "II",
    title: "The Marble Hall",
    discipline: "Flooring · Stone",
    place: "Washington, DC",
    excerpt:
      "A ground-floor hall given a stone floor with a border wide enough to be read at the pace of walking.",
    image: images.marbleHall,
    alt: "A stately hall with a marble floor, columns and light from above",
    overview:
      "The entrance hall carried too many materials at once. Stone, timber and carpet met without order, and the plan of the house was unclear from the front door.",
    approach:
      "One stone became the ground note, laid in a large field with a hand-cut border at the perimeter. The border continues beneath door openings so the plan reads as a single figure; the stair is allowed its own material. Moulded walls were kept pale and unpatterned to leave the stone legible.",
    details: [
      "Field marble with hand-cut border",
      "Thresholds aligned with a single datum",
      "Stair and landing specification",
      "Wall and ceiling finishes held plain",
    ],
    materials: ["Carrara marble", "Pale lime plaster", "Gilt detail"],
    gallery: [
      { src: images.marbleHall, alt: "The marble hall with classical columns" },
      { src: images.foyer, alt: "Grand stair and foyer in marble" },
    ],
  },
  {
    slug: "library-in-boiserie",
    plate: "III",
    title: "A Library in Boiserie",
    discipline: "Wall & ceiling · Joinery",
    place: "Virginia",
    excerpt:
      "Panelled walls, concealed doors and a single carved cornice: a library that is mostly one long, calm line.",
    image: images.panelRoom,
    alt: "A classical library with panelled walls and tall windows",
    overview:
      "A narrow, handsome room with too many doors and no place for books. The brief asked for a library that could also serve as a room for meeting, without turning into an office.",
    approach:
      "Boiserie was drawn to the actual wall lengths, not a standard module. Two doors were concealed in the panelling and a third became a shallow arched opening. Shelving is recessed, the cornice runs unbroken, and the painted finish is chalky enough to soften the room's north light.",
    details: [
      "Carved limewood boiserie",
      "Two concealed doors",
      "Recessed bookcases and lit shelves",
      "Painted finish, hand-rubbed",
    ],
    materials: ["Limewood", "Hand-rubbed paint", "Antique brass"],
    gallery: [
      { src: images.panelRoom, alt: "The completed library panelling" },
      { src: images.carvedPanels, alt: "Carved panels on the workshop bench" },
      { src: images.chisel, alt: "A chisel cutting detail into timber" },
    ],
  },
  {
    slug: "light-over-the-piano",
    plate: "IV",
    title: "Light over the Piano",
    discipline: "Lighting",
    place: "Washington, DC",
    excerpt:
      "One chandelier, drawn for one room — its drop, its spread and its light settled against a piano and a timber ceiling.",
    image: images.piano,
    alt: "An ornate chandelier hanging above a grand piano in a rich interior",
    overview:
      "The music room had good proportions and poor light: a single bright fixture that flattened the ceiling and left the corners unresolved.",
    approach:
      "A crystal chandelier was drawn for the room and lowered to sit just above eye line from the doorway. Wall lights and a pair of low table lamps complete the layers, each on separate switching. The result is a room that can be bright for practice or barely lit for an evening.",
    details: [
      "Bespoke crystal chandelier",
      "Layered wall and table lighting",
      "Separate switching circuits",
      "Fixture drop tested in situ",
    ],
    materials: ["Cut crystal", "Gilded brass", "Ivory shades"],
    gallery: [
      { src: images.piano, alt: "The chandelier above the grand piano" },
      { src: images.chandelier, alt: "Crystal chandelier with warm light" },
    ],
  },
  {
    slug: "the-dining-room",
    plate: "V",
    title: "The Dining Room",
    discipline: "Luxury interiors",
    place: "Maryland",
    excerpt:
      "A room for twelve that does not feel ceremonial on an ordinary Tuesday: two tables, one room, a single palette.",
    image: images.dining,
    alt: "A classical dining room with a long table, chandelier and patterned floor",
    overview:
      "The clients entertained formally several times a year and informally most weeks. The existing table only served the first occasion, and the room had begun to feel like a state apartment rather than a dining room.",
    approach:
      "The plan allows two configurations: a long table for formal dinners and a smaller round table for family meals, both served by the same lighting and sideboard. Chairs are upholstered in a hard-wearing linen, with two carvers in leather. The chandelier is dimmable and hung high enough to leave sight lines clear.",
    details: [
      "Two dining configurations",
      "Bespoke tables and chairs",
      "Sideboard and concealed bar",
      "Dimmable chandelier and wall light",
    ],
    materials: ["Walnut veneer", "Natural linen", "Cognac leather", "Bronze"],
    gallery: [
      { src: images.dining, alt: "The dining room set for a formal dinner" },
      { src: images.velvet, alt: "Upholstery and furniture detail" },
    ],
  },
  {
    slug: "the-entrance",
    plate: "VI",
    title: "The Entrance",
    discipline: "Doors & windows",
    place: "Washington, DC",
    excerpt:
      "New entrance doors in carved timber, drawn to the original stone opening and finished by hand, inside and out.",
    image: images.door,
    alt: "Tall carved timber entrance doors set into a classical stone facade",
    overview:
      "The original doors had been replaced twice in the house's life, each time in a different language. The brief was simple: one pair of doors that the building could have been born with.",
    approach:
      "The opening was surveyed and drawn at full size. The door leaves are raised and fielded in solid oak, with carving kept to the panels and a plain stile at the meeting point. Hardware is cast and hand-finished. The outside face is painted, the inside waxed, as the house required.",
    details: [
      "Solid oak doors, full-size drawings",
      "Hand-carved panel detail",
      "Cast and hand-finished hardware",
      "Two finishes, exterior and interior",
    ],
    materials: ["European oak", "Hand-cast brass", "Linseed paint"],
    gallery: [
      { src: images.door, alt: "Entrance doors in their stone surround" },
      { src: images.doorDetail, alt: "Carved door panel detail" },
    ],
  },
];

export const processSteps = [
  {
    numeral: "I",
    title: "Brainstorming with the client",
    caption: "In conversation",
    body: "We begin with the house as it is lived in: the rooms that work, the ones that never have, and the pieces you would not part with. Measurements and photographs are gathered, and the brief is written down before anything is drawn.",
    note: "At the residence or by telephone, by appointment.",
  },
  {
    numeral: "II",
    title: "Concept and design",
    caption: "A single direction",
    body: "Palette, materials, proportion and the character of each room are set as one direction. The concept is presented for discussion and refined until the brief is settled. Production does not begin on an unresolved idea.",
    note: "Concept boards, material studies, furniture direction.",
  },
  {
    numeral: "III",
    title: "Technical drawings and renders",
    caption: "Made measurable",
    body: "The approved concept becomes buildable. Elevations, architectural drawings, floor plans and furniture layouts are prepared, and 3D room renders show the interior before it exists. Drawings are shared for comment at each stage.",
    note: "Architectural drawings, elevations, plans, renders.",
  },
  {
    numeral: "IV",
    title: "Quotation",
    caption: "Priced line by line",
    body: "Every element is quoted in detail, workshop by workshop. Design fees, manufacture, shipping and installation are separated, so the budget is understood at the level of a single chair, a single chandelier, a single panel.",
    note: "Itemised quotation with lead times and delivery.",
  },
  {
    numeral: "V",
    title: "Production in Italy, delivery and fit-out support",
    caption: "Carried through",
    body: "Production is placed with the workshops and overseen through to packing. We coordinate delivery with your site team, attend the fit-out, and remain available until the last piece is in its place.",
    note: "Workshop oversight, shipping, installation guidance.",
  },
];

export const inquiryDisciplines = [
  "A complete residence",
  "Furniture",
  "Lighting",
  "Boiserie and wall panelling",
  "Flooring",
  "Ceiling decoration",
  "Doors and windows",
  "Art and accessories",
  "Not yet decided",
];
