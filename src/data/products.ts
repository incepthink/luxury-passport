export type Category =
  | "Watches"
  | "Jewelry"
  | "Bags & Accessories"
  | "Art & Collectibles";
export type ConditionGrade = "Mint" | "Excellent" | "Good" | "Fair";

export interface OwnershipEntry {
  wallet: string;
  date: string;
  price: number;
  isCurrent?: boolean;
}

export interface Certificate {
  serialNumber: string;
  brand: string;
  model: string;
  yearOfManufacture: number;
  material: string;
  conditionGrade: ConditionGrade;
  appraisedValue: number;
  lastInspectionDate: string;
  nftTokenId: string;
  contractAddress: string;
  documents: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  currentOwner: string;
  certificate: Certificate;
  ownershipHistory: OwnershipEntry[];
}

const wallets = [
  "0x1a2B3c4D5e6F7890aBcDeF1234567890AbCdEf12",
  "0x9f8E7d6C5b4A3210fEdCbA0987654321fEdCbA09",
  "0x2b3C4d5E6f7A8901BcDeFa2345678901BcDeFa23",
  "0x4d5E6f7A8b9C0123DeFaBc4567890123DeFaBc45",
  "0x6f7A8b9C0d1E2345FaBcDe6789012345FaBcDe67",
  "0x8b9C0d1E2f3A4567AbCdEf8901234567AbCdEf89",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nautilus 5711/1A",
    brand: "Patek Philippe",
    category: "Watches",
    price: 142000,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
    description:
      "The Patek Philippe Nautilus 5711 is arguably the most coveted luxury sports watch in the world. With its distinctive porthole-shaped case designed by Gérald Genta, this timepiece represents the pinnacle of haute horlogerie. The blue-black gradient dial with horizontal embossing and luminous applied hour markers make it instantly recognizable.",
    currentOwner: wallets[0],
    certificate: {
      serialNumber: "PP-5711-2024-0847",
      brand: "Patek Philippe",
      model: "Nautilus 5711/1A-010",
      yearOfManufacture: 2021,
      material: "Stainless Steel / Sapphire Crystal",
      conditionGrade: "Mint",
      appraisedValue: 155000,
      lastInspectionDate: "2024-11-15",
      nftTokenId: "0x7a3b...e9f1",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card", "Inspection Report"],
    },
    ownershipHistory: [
      { wallet: wallets[3], date: "2021-06-12", price: 95000 },
      { wallet: wallets[2], date: "2022-09-03", price: 125000 },
      { wallet: wallets[1], date: "2023-11-20", price: 138000 },
      {
        wallet: wallets[0],
        date: "2024-08-15",
        price: 142000,
        isCurrent: true,
      },
    ],
  },
  {
    id: "2",
    name: "Birkin 30 Togo",
    brand: "Hermès",
    category: "Bags & Accessories",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    description:
      "The Hermès Birkin bag is the ultimate status symbol in luxury fashion. This Birkin 30 in Togo leather features the iconic turn-lock closure, rolled handles, and impeccable hand-stitching that takes a single artisan over 18 hours to complete.",
    currentOwner: wallets[1],
    certificate: {
      serialNumber: "HB-30T-2023-1592",
      brand: "Hermès",
      model: "Birkin 30 Togo",
      yearOfManufacture: 2023,
      material: "Togo Calfskin Leather / Palladium Hardware",
      conditionGrade: "Mint",
      appraisedValue: 32000,
      lastInspectionDate: "2024-10-22",
      nftTokenId: "0x8b4c...d2a3",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card"],
    },
    ownershipHistory: [
      { wallet: wallets[4], date: "2023-03-15", price: 24000 },
      { wallet: wallets[1], date: "2024-06-10", price: 28500, isCurrent: true },
    ],
  },
  {
    id: "3",
    name: "Submariner Date",
    brand: "Rolex",
    category: "Watches",
    price: 14800,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop",
    description:
      "The Rolex Submariner Date is the quintessential dive watch, combining legendary reliability with timeless design. Its rotating bezel, luminous display, and waterproof Oyster case make it equally at home in the depths of the ocean or at a black-tie event.",
    currentOwner: wallets[2],
    certificate: {
      serialNumber: "RX-SUB-2022-3847",
      brand: "Rolex",
      model: "Submariner Date 126610LN",
      yearOfManufacture: 2022,
      material: "Oystersteel / Cerachrom Bezel",
      conditionGrade: "Excellent",
      appraisedValue: 16500,
      lastInspectionDate: "2024-09-18",
      nftTokenId: "0x3d5e...a7b2",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card", "Inspection Report"],
    },
    ownershipHistory: [
      { wallet: wallets[5], date: "2022-04-20", price: 12500 },
      { wallet: wallets[3], date: "2023-07-14", price: 13800 },
      { wallet: wallets[2], date: "2024-02-28", price: 14800, isCurrent: true },
    ],
  },
  {
    id: "4",
    name: "Butterfly Print (Limited)",
    brand: "Damien Hirst",
    category: "Art & Collectibles",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
    description:
      "A rare limited edition butterfly print from Damien Hirst's celebrated series. This work showcases the artist's signature exploration of beauty and mortality through meticulously arranged butterfly wings in a kaleidoscopic composition.",
    currentOwner: wallets[3],
    certificate: {
      serialNumber: "DH-BFP-2019-0042",
      brand: "Damien Hirst",
      model: "Butterfly Print (Sanctum)",
      yearOfManufacture: 2019,
      material: "Screenprint on Somerset Satin / Numbered Edition",
      conditionGrade: "Mint",
      appraisedValue: 92000,
      lastInspectionDate: "2024-08-05",
      nftTokenId: "0x9e1f...c4d6",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Certificate of Authenticity"],
    },
    ownershipHistory: [
      { wallet: wallets[5], date: "2019-11-30", price: 45000 },
      { wallet: wallets[4], date: "2021-05-22", price: 62000 },
      { wallet: wallets[3], date: "2023-09-10", price: 85000, isCurrent: true },
    ],
  },
  {
    id: "5",
    name: "Love Bracelet",
    brand: "Cartier",
    category: "Jewelry",
    price: 7650,
    image:
      "https://images.unsplash.com/photo-1515562141589-67f0d962e67b?w=600&h=600&fit=crop",
    description:
      "The Cartier Love Bracelet is one of the most iconic pieces of jewelry ever created. Designed by Aldo Cipullo in 1969, its screw motif symbolizes an unbreakable bond. This 18K yellow gold version comes with the signature screwdriver.",
    currentOwner: wallets[4],
    certificate: {
      serialNumber: "CT-LB-2023-7291",
      brand: "Cartier",
      model: "Love Bracelet 18K Yellow Gold",
      yearOfManufacture: 2023,
      material: "18K Yellow Gold",
      conditionGrade: "Mint",
      appraisedValue: 8200,
      lastInspectionDate: "2024-12-01",
      nftTokenId: "0x2a7b...f8e3",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card"],
    },
    ownershipHistory: [
      { wallet: wallets[4], date: "2023-12-25", price: 7650, isCurrent: true },
    ],
  },
  {
    id: "6",
    name: "Speedy 30 Monogram",
    brand: "Louis Vuitton",
    category: "Bags & Accessories",
    price: 1650,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    description:
      "The Louis Vuitton Speedy 30 in Monogram Canvas is a timeless classic that has been a staple of luxury fashion since its creation in 1930. Originally designed as a travel bag, it remains one of the most recognizable bags in the world.",
    currentOwner: wallets[5],
    certificate: {
      serialNumber: "LV-SP30-2024-4128",
      brand: "Louis Vuitton",
      model: "Speedy 30 Monogram Canvas",
      yearOfManufacture: 2024,
      material: "Monogram Coated Canvas / Natural Cowhide Leather",
      conditionGrade: "Mint",
      appraisedValue: 1800,
      lastInspectionDate: "2024-11-20",
      nftTokenId: "0x5c8d...b1a4",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt"],
    },
    ownershipHistory: [
      { wallet: wallets[5], date: "2024-01-15", price: 1650, isCurrent: true },
    ],
  },
  {
    id: "7",
    name: "Royal Oak Offshore",
    brand: "Audemars Piguet",
    category: "Watches",
    price: 38500,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&h=600&fit=crop",
    description:
      "The Audemars Piguet Royal Oak Offshore pushes the boundaries of luxury sports watchmaking. With its oversized case, bold design elements, and intricate finishing, this timepiece commands attention on any wrist.",
    currentOwner: wallets[0],
    certificate: {
      serialNumber: "AP-ROO-2023-5673",
      brand: "Audemars Piguet",
      model: "Royal Oak Offshore Chronograph",
      yearOfManufacture: 2023,
      material: "Stainless Steel / Ceramic Bezel",
      conditionGrade: "Excellent",
      appraisedValue: 42000,
      lastInspectionDate: "2024-10-10",
      nftTokenId: "0x6d9e...c2b5",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card", "Inspection Report"],
    },
    ownershipHistory: [
      { wallet: wallets[2], date: "2023-02-28", price: 35000 },
      { wallet: wallets[0], date: "2024-04-15", price: 38500, isCurrent: true },
    ],
  },
  {
    id: "8",
    name: "Serpenti Seduttori",
    brand: "Bulgari",
    category: "Watches",
    price: 12400,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
    description:
      "The Bulgari Serpenti Seduttori embodies the maison's legendary serpent motif in a contemporary timepiece. Its sinuous bracelet and distinctive snake-head case create a bold statement that blurs the line between jewelry and watchmaking.",
    currentOwner: wallets[1],
    certificate: {
      serialNumber: "BV-SRP-2022-8934",
      brand: "Bulgari",
      model: "Serpenti Seduttori",
      yearOfManufacture: 2022,
      material: "18K Rose Gold / Diamonds",
      conditionGrade: "Good",
      appraisedValue: 14000,
      lastInspectionDate: "2024-07-25",
      nftTokenId: "0x7e0f...d3c6",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Inspection Report"],
    },
    ownershipHistory: [
      { wallet: wallets[4], date: "2022-08-10", price: 11000 },
      { wallet: wallets[3], date: "2023-12-05", price: 12000 },
      { wallet: wallets[1], date: "2024-05-20", price: 12400, isCurrent: true },
    ],
  },
  {
    id: "9",
    name: "Classic Flap Medium",
    brand: "Chanel",
    category: "Bags & Accessories",
    price: 10800,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop",
    description:
      "The Chanel Classic Flap is perhaps the most iconic handbag in fashion history. With its quilted lambskin, interlocking CC turn-lock, and signature chain strap, this bag is the epitome of Parisian elegance.",
    currentOwner: wallets[2],
    certificate: {
      serialNumber: "CH-CLF-2023-6712",
      brand: "Chanel",
      model: "Classic Flap Medium Lambskin",
      yearOfManufacture: 2023,
      material: "Lambskin Leather / Gold-Tone Hardware",
      conditionGrade: "Mint",
      appraisedValue: 12000,
      lastInspectionDate: "2024-09-30",
      nftTokenId: "0x8f1a...e4d7",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card"],
    },
    ownershipHistory: [
      { wallet: wallets[5], date: "2023-06-18", price: 9800 },
      { wallet: wallets[2], date: "2024-03-12", price: 10800, isCurrent: true },
    ],
  },
  {
    id: "10",
    name: "RM 011 Flyback",
    brand: "Richard Mille",
    category: "Watches",
    price: 295000,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop",
    description:
      "The Richard Mille RM 011 represents the ultimate fusion of high watchmaking and Formula 1 technology. Its tonneau-shaped case houses a complex flyback chronograph movement visible through the skeletonized dial.",
    currentOwner: wallets[3],
    certificate: {
      serialNumber: "RM-011-2020-0156",
      brand: "Richard Mille",
      model: "RM 011 Flyback Chronograph",
      yearOfManufacture: 2020,
      material: "Titanium / Carbon TPT",
      conditionGrade: "Excellent",
      appraisedValue: 320000,
      lastInspectionDate: "2024-11-05",
      nftTokenId: "0x0a2b...f5e8",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "Warranty Card", "Inspection Report"],
    },
    ownershipHistory: [
      { wallet: wallets[5], date: "2020-09-25", price: 220000 },
      { wallet: wallets[1], date: "2022-03-18", price: 260000 },
      {
        wallet: wallets[3],
        date: "2024-01-10",
        price: 295000,
        isCurrent: true,
      },
    ],
  },
  {
    id: "11",
    name: "Diamond Rivière Necklace",
    brand: "Graff",
    category: "Jewelry",
    price: 185000,
    image:
      "https://images.unsplash.com/photo-1599643478518-a76f59f0ff8f?w=600&h=600&fit=crop",
    description:
      "This extraordinary Graff Diamond Rivière Necklace features a graduated line of exceptional round brilliant-cut diamonds, each individually selected for maximum fire and brilliance. A masterpiece of high jewelry.",
    currentOwner: wallets[4],
    certificate: {
      serialNumber: "GF-DRN-2021-0023",
      brand: "Graff",
      model: "Diamond Rivière Necklace",
      yearOfManufacture: 2021,
      material: "Platinum / D-F VVS Diamonds (42.5 ct)",
      conditionGrade: "Mint",
      appraisedValue: 210000,
      lastInspectionDate: "2024-10-15",
      nftTokenId: "0x1b3c...a6f9",
      contractAddress: "0x1234...abcd",
      documents: ["Purchase Receipt", "GIA Certificate", "Insurance Appraisal"],
    },
    ownershipHistory: [
      { wallet: wallets[0], date: "2021-12-20", price: 165000 },
      {
        wallet: wallets[4],
        date: "2023-08-05",
        price: 185000,
        isCurrent: true,
      },
    ],
  },
  {
    id: "12",
    name: "Girl With Balloon (Print)",
    brand: "Banksy",
    category: "Art & Collectibles",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&h=600&fit=crop",
    description:
      'Banksy\'s "Girl With Balloon" is one of the most recognizable works of contemporary street art. This authenticated limited edition print captures the poignant image of a young girl reaching for a red heart-shaped balloon.',
    currentOwner: wallets[5],
    certificate: {
      serialNumber: "BK-GWB-2018-0089",
      brand: "Banksy",
      model: "Girl With Balloon (Signed Print)",
      yearOfManufacture: 2018,
      material: "Screenprint on Wove Paper / Signed & Numbered",
      conditionGrade: "Excellent",
      appraisedValue: 140000,
      lastInspectionDate: "2024-06-12",
      nftTokenId: "0x2c4d...b7a0",
      contractAddress: "0x1234...abcd",
      documents: [
        "Purchase Receipt",
        "Certificate of Authenticity",
        "Condition Report",
      ],
    },
    ownershipHistory: [
      { wallet: wallets[2], date: "2018-10-05", price: 40000 },
      { wallet: wallets[0], date: "2020-07-15", price: 72000 },
      { wallet: wallets[3], date: "2022-04-20", price: 98000 },
      {
        wallet: wallets[5],
        date: "2024-02-28",
        price: 120000,
        isCurrent: true,
      },
    ],
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  "Watches",
  "Jewelry",
  "Bags & Accessories",
  "Art & Collectibles",
];
