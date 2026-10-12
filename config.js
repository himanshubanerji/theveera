/*
  ============================================================
  THEVEERA WEBSITE — CONTENT SETTINGS
  ============================================================
  Everything you see on the website comes from this file.
  To change a word, a price, a link or a photo, change it here and save.

  Three simple rules:
    1. Only change the text between the quote marks "like this".
    2. Keep the commas at the end of lines exactly where they are.
    3. To use a photo, paste its full link (starting with https://)
       or a file path such as "assets/photos/hoop.jpg".
       Leave a photo as "" to show a grey placeholder box.

  Lines starting with // are notes for you. The website ignores them.
  ============================================================
*/

window.SITE_CONFIG = {

  // ---------- Business details ----------
  business: {
    name: "TheVeera Embroidery Studio",
    shortName: "TheVeera",
    logo: "assets/logo.jpg",
    email: "theveera8@gmail.com",
    // Your phone number with country code. The WhatsApp buttons use it too.
    phone: "+91 76185 77678",
    currency: "INR",
  },

  // ---------- Browser tab and Google search text ----------
  seo: {
    title: "TheVeera Embroidery Studio · Hand-finished embroidery",
    description: "Embroidered clothing and keepsakes, stitched by hand. Pick a ready design, or send us a photo of your pet, your person or your name.",
  },

  // ---------- Thin strip at the very top of the page ----------
  announcement: "Every custom piece gets a digital preview before we stitch",

  // ---------- Menu links ----------
  // "href" is where the link goes: "#shop", "#custom", "#about" and "#faq" jump to parts of this page.
  menu: [
    { label: "Shop", href: "#shop" },
    { label: "Custom", href: "#custom" },
    { label: "About", href: "#about" },
  ],

  // ---------- Top section of the page ----------
  hero: {
    eyebrow: "Hand-finished embroidery",
    headline: "Stitched by hand.",
    headlineItalic: "Made to keep.",
    text: "Embroidered clothing and keepsakes from our studio. Pick a ready design, or send us a photo of your pet, your person or your name.",
    primaryButton: "Shop the collection",
    secondaryButton: "Start a custom order",
    // The two products shown beside the headline. Use the "id" of a product from the list below.
    featuredProductIds: ["your-idea-stitched", "couple-photo-embroidery"],
  },

  // ---------- Product categories (the "Shop by" buttons) ----------
  // "id" is a short name with no spaces. Products use it in their "categories" list.
  categories: [
    { id: "pets", label: "Pets" },
    { id: "couples", label: "Couples" },
    { id: "names", label: "Names" },
    { id: "portraits", label: "Portraits" },
    { id: "logos", label: "Logos" },
    { id: "florals", label: "Florals" },
  ],

  // ---------- Products ----------
  // Copy a whole { ... }, block to add a product. Delete a block to remove one.
  //   id         short unique name, no spaces (used in links)
  //   price      number only, no ₹ sign
  //   priceFrom  true shows "From ₹72", false shows "₹72"
  //   image      photo link, or "" for a placeholder
  //   imageAlt   describe the photo in a few words (read aloud to blind visitors)
  products: [
    {
      id: "your-idea-stitched",
      name: "Your Idea, Stitched",
      price: 72,
      priceFrom: true,
      note: "Personalised",
      image: "",
      imageAlt: "Pet portrait embroidered on a sweatshirt",
      categories: ["pets", "portraits"],
    },
    {
      id: "custom-name-embroidery",
      name: "Custom Name Embroidery",
      price: 42,
      priceFrom: true,
      note: "Personalised",
      image: "",
      imageAlt: "Name embroidered in script on a tote bag",
      categories: ["names"],
    },
    {
      id: "memory-stitched-in",
      name: "Memory Stitched In",
      price: 60,
      priceFrom: true,
      note: "Personalised",
      image: "",
      imageAlt: "Embroidery hoop with a stitched keepsake scene",
      categories: ["portraits", "florals"],
    },
    {
      id: "couple-photo-embroidery",
      name: "Couple Photo Embroidery",
      price: 64,
      priceFrom: true,
      note: "Personalised",
      image: "",
      imageAlt: "Couple portrait embroidered in an embroidery hoop",
      categories: ["couples", "portraits"],
    },
  ],

  // ---------- Product grid ----------
  shop: {
    title: "Studio favourites",
    shopByLabel: "Shop by",
    allLabel: "All",
    // How many products show before the "View all" button appears.
    initialCount: 8,
    viewAllLabel: "View all",
    emptyText: "No designs in this category yet. Message us and we’ll stitch one for you.",
    addToBagLabel: "Add to cart",
  },

  // ---------- Custom order section ----------
  custom: {
    eyebrow: "Custom embroidery",
    title: "Have something of your own in mind?",
    image: "",
    imageAlt: "Close-up of a needle and thread on an embroidery hoop",
    steps: [
      "Send a photo, sketch, logo or name",
      "Approve your digital preview",
      "We confirm the timeline and stitch it by hand",
    ],
    primaryButton: "Start a custom order",
    secondaryButton: "WhatsApp us",
    // The message that appears in WhatsApp when someone taps "Start a custom order".
    whatsappMessage: "Hi TheVeera! I’d like a custom embroidery piece. Here’s my idea:",
  },

  // ---------- Customer review ----------
  testimonial: {
    stars: 5,
    quote: "They turned our favorite photo into beautiful embroidery that feels incredibly personal and timeless.",
    author: "John Doe",
  },

  // ---------- About section ----------
  // To hide this section, change the line below to:  about: null,
  about: {
    eyebrow: "About the studio",
    title: "A small studio with a steady hand",
    text: "Every piece is drawn, previewed with you, and stitched by hand in our studio. We take on a few orders at a time so each one gets the care it deserves.",
    image: "",
    imageAlt: "The studio worktable with threads and hoops",
  },

  // ---------- Questions ----------
  faq: {
    title: "Questions",
    items: [
      {
        question: "What can I customize?",
        answer: "Almost anything: an original design from us, or your photo, pet, artwork, logo, name or idea.",
      },
      {
        question: "Will I see it before it’s stitched?",
        answer: "Yes. We send a digital preview for your approval before any stitching begins.",
      },
      {
        question: "Can you embroider a photo?",
        answer: "Pets, couples, portraits, memories, symbols and artwork all work well.",
      },
      {
        question: "How do I order something custom?",
        answer: "Tap “Start a custom order” to message us on WhatsApp with your idea, or email us.",
      },
      {
        question: "How long does it take?",
        answer: "It depends on the design and garment. We confirm your timeline before we start.",
      },
    ],
  },

  // ---------- Bag (cart) ----------
  // Orders are sent to you on WhatsApp. No payment happens on the website.
  bag: {
    title: "Your bag",
    emptyText: "Your bag is empty. Pick a design to get started.",
    checkoutButton: "Order on WhatsApp",
    checkoutNote: "We’ll confirm details, personalisation and payment with you on WhatsApp.",
    addedMessage: "added to your bag",
    whatsappIntro: "Hi TheVeera! I’d like to order:",
    whatsappOutro: "I’ll share my photo and details here.",
  },

  // ---------- Bottom of the page ----------
  footer: {
    shopTitle: "Shop",
    shopLinks: [
      { label: "All designs", href: "#shop" },
      { label: "Custom embroidery", href: "#custom" },
      { label: "About the studio", href: "#about" },
    ],
    contactTitle: "Contact",
    // Paste your profile links. Leave "" to hide a link.
    social: [
      { label: "Instagram", href: "" },
      { label: "Facebook", href: "" },
      { label: "TikTok", href: "" },
    ],
  },

  // ---------- Newsletter sign-up ----------
  // Needs a sign-up link from a service like Mailchimp, Formspree or Google Forms.
  // Paste that link into "formAction". While it is "", this block stays hidden.
  newsletter: {
    title: "New designs, first.",
    placeholder: "you@example.com…",
    button: "Subscribe",
    formAction: "",
  },
};
