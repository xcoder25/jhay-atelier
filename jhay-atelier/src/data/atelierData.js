export const BRAND_INFO = {
  name: "JHAY ATELIER",
  monogram: "JA",
  taglines: [
    "TAILORED FOR HER.",
    "MADE FOR MOMENTS THAT MATTER.",
    "Elegance, Perfectly Tailored.",
    "WHERE ELEGANCE IS TAILORED TO PERFECTION."
  ],
  contact: {
    phone: "+234 801 234 5678",
    email: "hello@jhayatelier.com",
    concierge: "concierge@jhayatelier.com",
    address: "Atelier Studio, Udo Udoma Avenue, Uyo, Akwa Ibom State, Nigeria",
    city: "Uyo, Akwa Ibom",
    hours: "Monday – Saturday: 10:00 AM – 7:00 PM (By Appointment & Online)"
  },
  social: {
    instagram: "@jhay.atelier",
    pinterest: "@jhayatelier",
    website: "jhayatelier.com"
  },
  palette: [
    { name: "Black", hex: "#111111", code: "#111111" },
    { name: "Ivory", hex: "#F8F6F2", code: "#F8F6F2" },
    { name: "Champagne Gold", hex: "#C8A45D", code: "#C8A45D" },
    { name: "Deep Emerald", hex: "#0F4C45", code: "#0F4C45" },
    { name: "Warm Beige", hex: "#D8C8B8", code: "#D8C8B8" }
  ]
};

export const CURRENCIES = {
  NGN: { symbol: "₦", rate: 1550, label: "NGN (₦)" },
  USD: { symbol: "$", rate: 1, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" }
};

export const COLLECTIONS = [
  { id: "all", name: "All Outfits" },
  { id: "gowns", name: "Evening & Gala Dresses" },
  { id: "suits", name: "Women’s Tailored Suits" },
  { id: "cocktail", name: "Cocktail & Dinner Outfits" },
  { id: "bridal", name: "Bridal & Wedding Guest" }
];

export const PRODUCTS = [
  {
    id: "ja-01",
    name: "The Champagne Élysée One-Shoulder Dress",
    category: "gowns",
    tagline: "One-Shoulder Champagne Silk Dress with Flowing Cape & Crystal Trim",
    priceUSD: 2850,
    badge: "Bestseller Dress",
    image: "/images/hero-gown.jpg",
    colors: [
      { name: "Champagne Gold", hex: "#C8A45D" },
      { name: "Ivory Pearl", hex: "#F8F6F2" },
      { name: "Warm Beige", hex: "#D8C8B8" }
    ],
    sizes: [
      "UK 6 / US 2 (XS)",
      "UK 8 / US 4 (S)",
      "UK 10 / US 6 (M)",
      "UK 12 / US 8 (L)",
      "UK 14 / US 10 (XL)",
      "Custom Size (Tailored to your body)"
    ],
    description: "An elegant, head-turning women's evening dress crafted from premium champagne silk satin. It features a flattering one-shoulder neckline with a dramatic draped cape, finished with sparkling crystals and micro-pearls along the waistline.",
    features: [
      "100% Pure Mulberry Silk Satin with a soft, glowing sheen",
      "Built-in corset structure for comfortable waist shaping & support",
      "Graceful shoulder cape that moves beautifully as you walk",
      "Discreet back zipper that slides smoothly",
      "Custom sizing available: we can sew it to your exact measurements"
    ],
    delivery: "Handmade to order. Ships in 10–14 days in our signature luxury black gift box with gold ribbon."
  },
  {
    id: "ja-02",
    name: "The Emerald Royale Velvet Evening Gown",
    category: "gowns",
    tagline: "Fitted Deep Emerald Velvet Dress with Gold Embroidery",
    priceUSD: 2450,
    badge: "Customer Favorite",
    image: "/images/emerald-gown.jpg",
    colors: [
      { name: "Deep Emerald", hex: "#0F4C45" },
      { name: "Classic Black", hex: "#111111" }
    ],
    sizes: [
      "UK 6 / US 2 (XS)",
      "UK 8 / US 4 (S)",
      "UK 10 / US 6 (M)",
      "UK 12 / US 8 (L)",
      "UK 14 / US 10 (XL)",
      "Custom Size (Tailored to your body)"
    ],
    description: "A show-stopping women's dress made for galas, red carpets, and special celebrations. Cut from rich emerald green silk-velvet with gentle shoulder pads for good posture, and detailed with hand-sewn gold floral embroidery at the waist and sleeves.",
    features: [
      "Ultra-soft stretch silk-velvet in deep jewel-toned emerald",
      "Gold metallic floral embroidery hand-stitched at waist and cuffs",
      "Figure-flattering mermaid shape with a sweeping train",
      "Fully lined with breathable silk for total all-night comfort",
      "Great for awards nights, gala dinners, and milestone birthdays"
    ],
    delivery: "Handcrafted to order. Free consultation fitting available in Lagos studio or online."
  },
  {
    id: "ja-03",
    name: "The Tuxedo Noir Women’s Evening Suit Dress",
    category: "suits",
    tagline: "Tailored Black Blazer Dress with Gold Silk Collar",
    priceUSD: 2150,
    badge: "Power Outfit",
    image: "/images/noir-gown.jpg",
    colors: [
      { name: "Classic Black", hex: "#111111" },
      { name: "Deep Emerald", hex: "#0F4C45" }
    ],
    sizes: [
      "UK 6 / US 2 (XS)",
      "UK 8 / US 4 (S)",
      "UK 10 / US 6 (M)",
      "UK 12 / US 8 (L)",
      "UK 14 / US 10 (XL)",
      "Custom Size (Tailored to your body)"
    ],
    description: "The ultimate power look for women. Combining the sharp tailoring of a tuxedo blazer with the drama of an evening gown, featuring champagne gold silk lapels and custom engraved gold buttons on the sleeves.",
    features: [
      "High-grade wrinkle-resistant wool-silk crepe in jet black",
      "Contrasting champagne gold silk satin lapel collar",
      "Custom gold monogram buttons on the wrists",
      "Pleated skirt that flatters your hips and waist",
      "Can be worn as a statement evening suit dress or red carpet outfit"
    ],
    delivery: "Ready to ship in 5–7 days, or 12 days if you need custom sizing."
  },
  {
    id: "ja-04",
    name: "The Archival Gold-Embroidered Ballgown",
    category: "gowns",
    tagline: "Handmade Gold Thread Ballgown for Queens & Brides",
    priceUSD: 3600,
    badge: "Limited Edition (12 Made)",
    image: "/images/atelier-craft.jpg",
    colors: [
      { name: "Champagne Gold", hex: "#C8A45D" },
      { name: "Warm Beige", hex: "#D8C8B8" }
    ],
    sizes: ["Custom Made-to-Measure Only"],
    description: "Each dress takes over 140 hours of patient handwork by master dressmakers. Covered in genuine gold embroidery over rich ivory silk, creating an unforgettable fairytale silhouette for brides, royalty, and grand balls.",
    features: [
      "Over 140 hours of hand embroidery with gold threads",
      "Comfortable flexible boning inside the bodice for an hourglass shape",
      "Majestic 2-meter train that glides effortlessly",
      "Signed certificate of authenticity from our head designer",
      "Includes 2 personal fitting sessions (in-person or video)"
    ],
    delivery: "Takes 3 to 4 weeks to craft. Tailored 100% to your unique body."
  },
  {
    id: "ja-05",
    name: "The Liquid Silk Slip & Drape Dress",
    category: "cocktail",
    tagline: "Smooth Bias-Cut Silk Dress with Low Cowl Back",
    priceUSD: 1450,
    badge: "Dinner & Cocktails",
    image: "/images/hero-gown.jpg",
    colors: [
      { name: "Warm Beige", hex: "#D8C8B8" },
      { name: "Champagne Gold", hex: "#C8A45D" },
      { name: "Deep Emerald", hex: "#0F4C45" }
    ],
    sizes: [
      "UK 6 / US 2 (XS)",
      "UK 8 / US 4 (S)",
      "UK 10 / US 6 (M)",
      "UK 12 / US 8 (L)",
      "UK 14 / US 10 (XL)"
    ],
    description: "An effortless slip dress cut from heavy, glowing silk charmeuse. Designed to drape naturally around female curves with a stylish low back and subtle puddle train.",
    features: [
      "100% pure heavy silk charmeuse that won't cling or ride up",
      "Bias-cut fabric that naturally stretches and molds to your body",
      "Delicate thin straps and elegant open cowl back",
      "Easy to dress up with heels and gold jewelry for weddings or dinners"
    ],
    delivery: "Ships within 48 hours in our signature black presentation box."
  },
  {
    id: "ja-06",
    name: "The Royal Mikado Bridal & Reception Gown",
    category: "bridal",
    tagline: "Clean Modern Wedding Dress with Detachable Royal Cape",
    priceUSD: 4200,
    badge: "Bridal Suite",
    image: "/images/hero-gown.jpg",
    colors: [
      { name: "Luminous Ivory", hex: "#F8F6F2" }
    ],
    sizes: ["Custom Made-to-Measure Only"],
    description: "For the modern bride who wants clean lines and regal beauty. Tailored in structured Italian Mikado silk with a removable dramatic cape so you can transition seamlessly from wedding ceremony to dancing at the reception.",
    features: [
      "Structured Italian Mikado silk that holds its shape all day",
      "Removable royal cape: wear it for the altar, take it off for the party",
      "Personalized monogram embroidery inside the dress (e.g. your wedding date)",
      "Delivered on a custom velvet hanger with a breathable travel garment bag",
      "Full styling and alteration support included"
    ],
    delivery: "4 to 6 weeks crafting time with personalized milestone updates."
  }
];

export const ATELIER_PILLARS = [
  {
    step: "01",
    title: "Choose or Design Your Look",
    desc: "Browse our ready-to-wear women’s collection or book a quick chat with our designer to customize colors, necklines, and fabrics for your event."
  },
  {
    step: "02",
    title: "Send Your Measurements",
    desc: "Pick your standard dress size (XS to XL) or enter your bust, waist, and hips. You can also visit our Victoria Island studio or hop on a 15-minute video call."
  },
  {
    step: "03",
    title: "Tailored by Master Dressmakers",
    desc: "Our experienced female tailors carefully cut, stitch, and hand-bead your outfit with pure silks, fine linings, and structured support."
  },
  {
    step: "04",
    title: "Delivered Ready to Wear",
    desc: "Your outfit arrives beautifully pressed in our signature matte black gift box with gold ribbon, guaranteed to fit you effortlessly."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Visiting the Atelier Studio on Udo Udoma Avenue in Uyo was an unforgettable experience. The precision, regal silhouette, and luxurious finish felt like Parisian Haute Couture right here in Akwa Ibom.",
    author: "Dr. Inemesit Udoh",
    location: "Uyo, Akwa Ibom",
    event: "State Inaugural Gala"
  },
  {
    quote: "I sent my bespoke measurements from Abuja for my sister's grand wedding in Uyo. JHAY ATELIER delivered the emerald velvet gown in their signature matte black box. Absolute perfection, zero alterations needed!",
    author: "Folashade Morgan",
    location: "Abuja & Uyo",
    event: "Luxury Wedding Guest"
  },
  {
    quote: "Finding an atelier that creates genuine luxury bespoke silhouettes in the South-South is rare. JHAY ATELIER made me feel like royalty for my 40th birthday dinner. World-class craftsmanship!",
    author: "Blessing Effiong",
    location: "Port Harcourt & Uyo",
    event: "40th Birthday Dinner"
  }
];

