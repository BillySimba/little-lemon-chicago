/**
 * Curated menu specials and verified guest testimonials for Little Lemon Chicago.
 * Inline SVG data URIs guarantee crisp visuals with zero broken third-party image requests.
 */

const escXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const makeDishArt = (bg, accent, label, subtitle) => {
  const safeLabel = escXml(label);
  const safeSubtitle = escXml(subtitle);
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" role="img" aria-label="${safeLabel}">
      <rect width="600" height="400" fill="${bg}"/>
      <circle cx="300" cy="175" r="108" fill="#FFFFFF" opacity="0.16"/>
      <circle cx="300" cy="175" r="82" fill="${accent}"/>
      <circle cx="275" cy="158" r="18" fill="#495E57" opacity="0.75"/>
      <circle cx="328" cy="186" r="22" fill="#F4CE14" opacity="0.9"/>
      <circle cx="294" cy="204" r="14" fill="#EDEFEE" opacity="0.9"/>
      <text x="300" y="325" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="30" font-weight="700">${safeLabel}</text>
      <text x="300" y="358" text-anchor="middle" fill="#EDEFEE" font-family="Arial, sans-serif" font-size="16">${safeSubtitle}</text>
    </svg>`
  )}`;
};

export const WEEKLY_SPECIALS = [
  {
    id: "greek-salad",
    title: "Greek Salad",
    price: "$12.99",
    category: "Starter",
    description:
      "Crisp lettuce, sweet peppers, Kalamata olives, and Chicago-style feta cheese garnished with crunchy garlic and rosemary croutons.",
    image: makeDishArt("#495E57", "#6B8E23", "Greek Salad", "Feta, Olives & Rosemary Croutons"),
  },
  {
    id: "bruschetta",
    title: "Bruschetta",
    price: "$5.99",
    category: "Appetizer",
    description:
      "Grilled sourdough bread brushed with roasted garlic and extra-virgin olive oil, topped with vine-ripened tomatoes and fresh basil.",
    image: makeDishArt("#6D3B2A", "#EE9972", "Bruschetta", "Grilled Bread, Garlic & Heirloom Tomato"),
  },
  {
    id: "lemon-dessert",
    title: "Lemon Dessert",
    price: "$5.00",
    category: "Dessert",
    description:
      "Straight from grandma's recipe book — velvety citrus custard layered over airy sponge cake with candied Amalfi lemon zest.",
    image: makeDishArt("#5C4D2E", "#F4CE14", "Lemon Dessert", "Signature Family Citrus Recipe"),
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Elena R.",
    rating: 5,
    quote: "Booking a Friday anniversary table took less than a minute, and the Greek salad was unforgettable.",
    initials: "ER",
  },
  {
    id: "t2",
    name: "Marcus D.",
    rating: 5,
    quote: "Warm Mediterranean hospitality right in Chicago. Love seeing live table times before choosing our date.",
    initials: "MD",
  },
  {
    id: "t3",
    name: "Priya K.",
    rating: 5,
    quote: "The bruschetta and signature lemon dessert are unmatched. Seamless mobile reservation experience.",
    initials: "PK",
  },
  {
    id: "t4",
    name: "David W.",
    rating: 5,
    quote: "Clean menu, welcoming atmosphere, and instant confirmation for our family birthday dinner.",
    initials: "DW",
  },
];
