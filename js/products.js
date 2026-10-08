/* MAC INTERIO — Little Star · Product catalogue (single source of truth)
   Images are real supplied assets in ./ — never stock. */
const WA_NUMBER = "919911445459";
const MAPS_URL = "https://maps.app.goo.gl/KjZcJmGTFaeKezVJA?g_st=ac";

const PRODUCTS = [
  {
    id: "ribbon-marble-dining",
    name: "The Ribbon Dining Table",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img7.jpg",
    gallery: ["img7.jpg", "img8.jpg", "img9.jpg"],
    alt: "Luxury white marble six-seater dining table with sculpted bronze ribbon base manufactured by MAC INTERIO Kirti Nagar",
    desc: "A white marble top carried on a sweeping bronze ribbon base — the statement piece our workshop is known for.",
    material: "Marble top · Metal base (PVD finish options)",
    style: "Contemporary luxury", seats: "6 Seater",
    tags: ["Marble", "PVD Base", "6 Seater"]
  },
  {
    id: "aurelia-arch-dining",
    name: "Aurelia Arch Dining Table",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img16.jpg", gallery: ["img16.jpg"],
    alt: "Oval white marble dining table with twin gold arch base and designer chairs by MAC INTERIO Delhi",
    desc: "An oval marble top floating on twin gold arches — soft geometry with a distinctly architectural stance.",
    material: "Marble top · SS PVD gold base",
    style: "Modern classic", seats: "6 Seater",
    tags: ["Marble", "SS PVD Gold", "6 Seater"]
  },
  {
    id: "statuario-noir-dining",
    name: "Statuario Noir Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img10.jpg", gallery: ["img10.jpg"],
    alt: "Rectangular white marble six seater dining set with dark base and quilted ivory chairs in marble interior",
    desc: "Crisp white marble against a deep dark base, paired with quilted ivory seating for quiet contrast.",
    material: "Marble top · Wood & metal base",
    style: "Contemporary", seats: "6 Seater",
    tags: ["Marble", "Wood & Metal", "6 Seater"]
  },
  {
    id: "regal-onyx-dining",
    name: "Regal Polished-Stone Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img13.jpg", gallery: ["img13.jpg"],
    alt: "Classic six seater dining table with glossy cream polished stone top and carved dark wood chairs at MAC INTERIO showroom",
    desc: "A high-gloss cream stone top on carved dark wood — traditional craftsmanship finished in our own workshop.",
    material: "Polished stone top (onyx / marble options) · Carved wood",
    style: "Classic luxury", seats: "6 Seater",
    tags: ["Stone Top", "Carved Wood", "6 Seater"]
  },
  {
    id: "bianco-inlay-dining",
    name: "Bianco Inlay Dining Table",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img18.jpg", gallery: ["img18.jpg"],
    alt: "White geometric inlay stone six seater dining table with blush upholstered chairs at Little Star Kirti Nagar showroom",
    desc: "A geometric inlay stone top photographed in our showroom — subtle pattern work that rewards a closer look.",
    material: "Inlay stone top · Metal base (customisable)",
    style: "Contemporary", seats: "6 Seater",
    tags: ["Inlay Stone", "Showroom Piece", "6 Seater"]
  },
  {
    id: "victorian-marble-dining",
    name: "Victorian Marble Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img19.jpg", gallery: ["img19.jpg"],
    alt: "White marble six seater dining set with carved Victorian style wooden legs and tufted cream chairs",
    desc: "Hand-finished turned legs meet a polished white marble top — heritage detailing, manufacturer direct.",
    material: "Marble top · Carved solid wood",
    style: "Victorian classic", seats: "6 Seater",
    tags: ["Marble", "Solid Wood", "6 Seater"]
  },
  {
    id: "classic-turned-dining",
    name: "Classic Turned Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img20.jpg", gallery: ["img20.jpg"],
    alt: "White marble top six seater dining table with turned wooden legs styled in elegant interior",
    desc: "Turned-wood joinery under a luminous marble top — a versatile set that settles into any dining room.",
    material: "Marble top · Turned wood",
    style: "Transitional classic", seats: "6 Seater",
    tags: ["Marble", "Turned Wood", "6 Seater"]
  },
  {
    id: "monolith-dining",
    name: "Monolith Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img21.jpg", gallery: ["img21.jpg"],
    alt: "Minimal white marble six seater dining table with black base and light upholstered chairs",
    desc: "A study in restraint — white marble on a minimal dark base, sized for everyday six-seat living.",
    material: "Marble top · Metal / wood base",
    style: "Minimal contemporary", seats: "6 Seater",
    tags: ["Marble", "Minimal", "6 Seater"]
  },
  {
    id: "heritage-turned-4seater",
    name: "Heritage Turned 4-Seater",
    cat: "dining", catLabel: "Dining · 4 Seater",
    img: "img14.jpg", gallery: ["img14.jpg", "img15.jpg"],
    alt: "Compact white marble four seater dining table with turned wooden legs and tufted cream chairs",
    desc: "A compact four-seat marble table with turned legs and deep-buttoned chairs — made for smaller dining spaces.",
    material: "Marble top · Turned solid wood",
    style: "Classic", seats: "4 Seater",
    tags: ["Marble", "Solid Wood", "4 Seater"]
  },
  {
    id: "lattice-sheesham-4seater",
    name: "Lattice Wood 4-Seater",
    cat: "dining", catLabel: "Dining · 4 Seater",
    img: "img17.jpg", gallery: ["img17.jpg"],
    alt: "Solid wood four seater dining table with lattice back chairs and cushioned seats",
    desc: "Solid wood with open-lattice chair backs — honest joinery and an easy, everyday footprint.",
    material: "Solid wood",
    style: "Casual classic", seats: "4 Seater",
    tags: ["Solid Wood", "Compact", "4 Seater"]
  },
  {
    id: "sculpt-boucle-dining",
    name: "Sculpt Dining Set",
    cat: "dining", catLabel: "Dining · 6 Seater",
    img: "img3.jpg", gallery: ["img3.jpg"],
    alt: "Oval wooden dining table with sculptural boucle fabric chairs in warm minimalist dining room",
    desc: "An organically curved wood table wrapped in sculptural boucle seating — warmth, crafted to order.",
    material: "Wood top · Upholstered seating",
    style: "Organic modern", seats: "6 Seater",
    tags: ["Wood", "Designer Chairs", "6 Seater"]
  },
  {
    id: "aura-center-table",
    name: "Aura Marble Center Table Set",
    cat: "living", catLabel: "Living · Center Table",
    img: "img1.jpg", gallery: ["img1.jpg"],
    alt: "Oval white marble center table with gold spherical base and matching side table in beige living room",
    desc: "An oval marble center table with a golden orb base, paired with a matching side table.",
    material: "Marble top · PVD metal base",
    style: "Contemporary luxury", seats: "Set of 2",
    tags: ["Marble", "PVD Gold", "Set of 2"]
  },
  {
    id: "pebble-side-table",
    name: "Pebble Marble Side Table",
    cat: "living", catLabel: "Living · Side Table",
    img: "img2.jpg", gallery: ["img2.jpg"],
    alt: "Kidney shaped white marble side table with brushed gold pedestal base beside boucle armchair",
    desc: "A soft kidney-shaped marble top on a brushed-gold pedestal — the side table that finishes a lounge corner.",
    material: "Marble top · Brushed brass base",
    style: "Soft modern", seats: "Accent piece",
    tags: ["Marble", "Brass", "Accent"]
  },
  {
    id: "cone-accent-table",
    name: "Cone Wood Accent Table",
    cat: "living", catLabel: "Living · Accent Table",
    img: "img4.jpg", gallery: ["img4.jpg"],
    alt: "Conical solid wood accent table held in slim champagne metal frame",
    desc: "A solid-wood cone suspended in a champagne metal frame — sculptural, small-footprint, unmistakable.",
    material: "Solid wood · Metal frame",
    style: "Sculptural", seats: "Accent piece",
    tags: ["Wood", "Metal", "Accent"]
  },
  {
    id: "heritage-inlay-center",
    name: "Heritage Inlay Center Table",
    cat: "living", catLabel: "Living · Center Table",
    img: "img5.jpg", gallery: ["img5.jpg"],
    alt: "Round bone inlay style center table with gold leaf pattern and dark wooden drum base",
    desc: "Intricate leaf-pattern inlay on a round top, grounded by a dark wood drum — heritage craft, custom sizes.",
    material: "Inlay top · Solid wood base",
    style: "Heritage", seats: "Center table",
    tags: ["Inlay Work", "Wood", "Round"]
  },
  {
    id: "pyramid-side-table",
    name: "Pyramid Stone Side Table",
    cat: "living", catLabel: "Living · Side Table",
    img: "img6.jpg", gallery: ["img6.jpg"],
    alt: "Square white marble side table with inverted pyramid base in black metal frame",
    desc: "A square marble cap over an inverted pyramid — geometry that works indoors and out.",
    material: "Marble · Powder-coated metal",
    style: "Geometric modern", seats: "Accent piece",
    tags: ["Marble", "Metal", "Accent"]
  },
  {
    id: "houndstooth-lounge-pair",
    name: "Houndstooth Lounge Pair",
    cat: "living", catLabel: "Living · Lounge Seating",
    img: "img11.jpg", gallery: ["img11.jpg"],
    alt: "Pair of houndstooth patterned lounge armchairs with small round marble side table",
    desc: "A tailored houndstooth chair pair with a marble-topped side table — a ready-made conversation corner.",
    material: "Upholstered seating · Marble & metal table",
    style: "Tailored modern", seats: "2 Chairs + table",
    tags: ["Upholstery", "Marble Table", "Set"]
  },
  {
    id: "aureole-partition",
    name: "Aureole PVD Glass Partition",
    cat: "custom", catLabel: "Custom · Partition",
    img: "img12.jpg", gallery: ["img12.jpg"],
    alt: "Gold PVD metal and fluted glass room partition divider crafted by MAC INTERIO Delhi",
    desc: "Brushed-gold frames with fluted glass — a room divider that defines space without closing it off.",
    material: "SS PVD gold · Fluted glass",
    style: "Architectural", seats: "Made to measure",
    tags: ["PVD Gold", "Glass", "Made to Measure"]
  }
];

function productById(id){ return PRODUCTS.find(p => p.id === id); }

function waProductURL(p){
  const msg =
`Hello MAC INTERIO - Little Star,

I am interested in the ${p.name}.

Product:
${p.name}

Category:
${p.catLabel}

Image reference: ${p.img}

I would like to know the price, customization options, dimensions and delivery details.

I am also sharing the product image for reference.

Thank you.`;
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
}

function waCustomURL(){
  const msg =
`Hello MAC INTERIO - Little Star,

I want to discuss a custom furniture requirement.

My preferred product/category is:
[Please type here — e.g. 6-seater marble dining table]

I would like to discuss size, material, colour, finish and pricing.`;
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
}
