/*
  ============================================================
  THEVEERA WEBSITE — CONTENT SETTINGS
  ============================================================
  Everything you see on the website comes from this file.
  To change a word, a price, a link or a photo, change it here and save.

  Three simple rules:
    1. Only change the text between the quote marks "like this".
    2. Keep the commas at the end of lines exactly where they are.
    3. To use a photo, upload it to Google Drive, set sharing to
       "Anyone with the link", and paste the share link here as it is
       (https://drive.google.com/file/d/…/view?usp=sharing).
       Any other https:// image link works too.
       Leave a photo as "" to show a grey placeholder box.

  Lines starting with // are notes for you. The website ignores them.
  ============================================================
*/

window.SITE_CONFIG = {

  // ---------- Business details ----------
  business: {
    name: "TheVeera Embroidery Studio",
    shortName: "TheVeera",
    logo: "https://drive.google.com/file/d/1u8X-m7QaCctIJJ2W2U7LeKt7audCvGhb/view?usp=sharing",
    // Small icon in the browser tab and on phone home screens (a square PNG works best).
    favicon: "https://drive.google.com/file/d/1h7VR7vt2oRe0l9ohQVQB3VOsKLvoMyrz/view?usp=sharing",
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
    // The two photos beside the headline. "link" is where a tap goes ("#custom" jumps to the custom order section).
    photos: [
      {
        caption: "Charizard Embroidery",
        note: "Made to order",
        image: "https://drive.google.com/file/d/1kzHWdKehYe4Xq7_1UXY3XbTGhLUAd-R0/view?usp=sharing",
        imageAlt: "Embroidered Charizard on black fabric, still in the embroidery machine hoop",
        link: "#custom",
      },
      {
        caption: "Anime Embroidery",
        note: "Made to order",
        image: "https://drive.google.com/file/d/1JKsDjwzL8BchbMGTXvyLG1rqA2oNcLj3/view?usp=sharing",
        imageAlt: "Two black T-shirts with embroidered anime designs, beside spools of coloured thread",
        link: "#custom",
      },
    ],
  },

  // ---------- Product categories (the "Shop by" buttons) ----------
  // "id" is a short name with no spaces. Products use it in their "categories" list.
  categories: [
    { id: "anime", label: "Anime" },
    { id: "pets", label: "Pets" },
    { id: "hoodies", label: "Hoodies" },
    { id: "bags", label: "Bags" },
    { id: "personalised", label: "Personalised" },
  ],

  // ---------- Products ----------
  // Copy a whole { ... }, block to add a product. Delete a block to remove one.
  //   id         short unique name, no spaces (used in links)
  //   price      number only, no ₹ sign
  //   priceFrom  true shows "From ₹1,999", false shows "₹1,999"
  //   image      Google Drive share link (or any image link), or "" for a placeholder
  //   imageAlt   describe the photo in a few words (read aloud to blind visitors)
  products: [
    {
      id: "your-pet-stitched-in",
      name: "Your Pet, Stitched In",
      price: 2499,
      priceFrom: true,
      note: "Personalised",
      image: "https://drive.google.com/file/d/1M_Pvu2o0BKEFvOgMWCovYSVrwROd2LQm/view?usp=sharing",
      imageAlt: "Red hoodie with an embroidered portrait of a dog named Sonya, next to her photo",
      categories: ["pets", "hoodies", "personalised"],
    },
    {
      id: "luffy-anime-hoodie",
      name: "Luffy Anime Hoodie",
      price: 1999,
      priceFrom: true,
      note: "Ready design",
      image: "https://drive.google.com/file/d/1hDmG4ix4Wzs0mk8Wr12JUtwNXhZ4MFgr/view?usp=sharing",
      imageAlt: "White hoodie with a large embroidered Monkey D. Luffy design on the back",
      categories: ["anime", "hoodies"],
    },
    {
      id: "zoro-anime-hoodie",
      name: "Zoro Anime Hoodie",
      price: 1999,
      priceFrom: true,
      note: "Ready design",
      image: "https://drive.google.com/file/d/1Yn8A3TfHULtoTl4Q2JSbrQxR3aQyVmdL/view?usp=sharing",
      imageAlt: "Black hoodie with an embroidered Roronoa Zoro design on the back",
      categories: ["anime", "hoodies"],
    },
    {
      id: "custom-embroidered-bag",
      name: "Custom Embroidered Bag",
      price: 1299,
      priceFrom: true,
      note: "Personalised",
      image: "https://drive.google.com/file/d/1TYwCGVr27xpcyIa3SO_8fKivPcyVYdja/view?usp=sharing",
      imageAlt: "White shoulder bag with small embroidered motifs and a TheVeera tag",
      categories: ["bags", "personalised"],
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
    image: "https://drive.google.com/file/d/1Z_TQHOtGsZjTPPJB4DPxNXxSBb_VMCbe/view?usp=sharing",
    imageAlt: "A dog portrait embroidered on a white T-shirt, next to the photos it was stitched from",
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
    image: "https://drive.google.com/file/d/1s5Y93qzi3Xmml6T-FC6lkBwDbBCTyW3D/view?usp=sharing",
    imageAlt: "Embroidered Creation of Adam hands on a grey T-shirt, with spools of thread on the worktable",
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
