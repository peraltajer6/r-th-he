// medicines.js
// This is the single place you need to edit to change what's in the catalog.
// Add, remove, or edit objects in this array — the rest of the app updates automatically.
//
// Fields:
//   id           unique slug, used in the URL hash (e.g. #product-ibuprofen-200)
//   category     must match one of the CATEGORIES below, exactly
//   name         medicine name shown as the title
//   strength     e.g. "200mg" — shown next to the form. Use "" if not applicable
//   form         "Tablet" | "Capsule" | "Liquid"
//   price        number, in dollars
//   inStock      true | false
//   description  one or two sentences shown on the product page

const CATEGORIES = [
  "Pain Relief",
  "Antibiotics",
  "Vitamins & Supplements",
  "Cardiovascular",
  "Digestive Health",
  "Allergy",
  "Cold & Flu",
];

const MEDICINES = [
  {
    id: "ibuprofen-200",
    category: "Pain Relief",
    name: "Ibuprofen",
    strength: "200mg",
    form: "Tablet",
    price: 8.99,
    inStock: true,
    description: "A non-steroidal anti-inflammatory for everyday aches, headaches, and fever. Take with food to ease digestion.",
  },
  {
    id: "paracetamol-500",
    category: "Pain Relief",
    name: "Paracetamol",
    strength: "500mg",
    form: "Tablet",
    price: 6.49,
    inStock: true,
    description: "A gentle option for mild to moderate pain and fever, suitable for most adults when taken as directed.",
  },
  {
    id: "amoxicillin-250",
    category: "Antibiotics",
    name: "Amoxicillin",
    strength: "250mg",
    form: "Capsule",
    price: 12.99,
    inStock: true,
    description: "A broad-spectrum antibiotic prescribed for common bacterial infections. Complete the full course as directed.",
  },
  {
    id: "azithromycin-500",
    category: "Antibiotics",
    name: "Azithromycin",
    strength: "500mg",
    form: "Tablet",
    price: 15.99,
    inStock: false,
    description: "A short-course antibiotic often used for respiratory and skin infections. Requires a valid prescription.",
  },
  {
    id: "vitamin-c-1000",
    category: "Vitamins & Supplements",
    name: "Vitamin C",
    strength: "1000mg",
    form: "Tablet",
    price: 9.99,
    inStock: true,
    description: "A daily antioxidant supplement that supports immune health and skin repair.",
  },
  {
    id: "multivitamin-complex",
    category: "Vitamins & Supplements",
    name: "Multivitamin Complex",
    strength: "",
    form: "Capsule",
    price: 14.99,
    inStock: true,
    description: "A balanced daily blend of essential vitamins and minerals for general wellbeing.",
  },
  {
    id: "atorvastatin-20",
    category: "Cardiovascular",
    name: "Atorvastatin",
    strength: "20mg",
    form: "Tablet",
    price: 11.49,
    inStock: true,
    description: "Helps manage cholesterol levels as part of a heart-healthy routine. Best taken in the evening.",
  },
  {
    id: "amlodipine-5",
    category: "Cardiovascular",
    name: "Amlodipine",
    strength: "5mg",
    form: "Tablet",
    price: 10.99,
    inStock: true,
    description: "A once-daily medication that relaxes blood vessels to help manage blood pressure.",
  },
  {
    id: "omeprazole-20",
    category: "Digestive Health",
    name: "Omeprazole",
    strength: "20mg",
    form: "Capsule",
    price: 8.99,
    inStock: true,
    description: "Reduces stomach acid to relieve heartburn and support healing of acid-related irritation.",
  },
  {
    id: "loperamide-2",
    category: "Digestive Health",
    name: "Loperamide",
    strength: "2mg",
    form: "Tablet",
    price: 5.99,
    inStock: true,
    description: "Provides short-term relief from acute diarrhea by slowing digestive movement.",
  },
  {
    id: "cetirizine-10",
    category: "Allergy",
    name: "Cetirizine",
    strength: "10mg",
    form: "Tablet",
    price: 7.49,
    inStock: true,
    description: "A non-drowsy antihistamine for seasonal allergies, hives, and itchy eyes.",
  },
  {
    id: "loratadine-10",
    category: "Allergy",
    name: "Loratadine",
    strength: "10mg",
    form: "Tablet",
    price: 6.99,
    inStock: false,
    description: "A once-daily antihistamine that eases sneezing, runny nose, and watery eyes.",
  },
  {
    id: "dextromethorphan-syrup",
    category: "Cold & Flu",
    name: "Dextromethorphan Syrup",
    strength: "",
    form: "Liquid",
    price: 9.49,
    inStock: true,
    description: "Calms a persistent dry cough so you can rest, without the drowsy side effects of older formulas.",
  },
  {
    id: "pseudoephedrine-30",
    category: "Cold & Flu",
    name: "Pseudoephedrine",
    strength: "30mg",
    form: "Tablet",
    price: 8.49,
    inStock: true,
    description: "Clears nasal and sinus congestion from colds, flu, or seasonal allergies.",
  },
];

// Makes this file reusable from Node (Cloud Functions) without changing anything
// above. The browser just ignores this block since `module` doesn't exist there.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATEGORIES, MEDICINES };
}
