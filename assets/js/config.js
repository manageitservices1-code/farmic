/*
  FARMIC AGRO & CO — SITE CONFIGURATION
  =====================================
  Edit the values below to update contact details, the contact-form
  destination, and social media links across the ENTIRE website.
  You do not need to touch any other file — every page reads from here.

  After editing, just save this file and redeploy (or refresh, if
  testing locally) — no other changes needed.
*/

window.FARMIC_CONFIG = {

  // ---- Contact details ----
  phone: "+91 98663 10216, +91 79067 32405, +91 93813 78345",              // shown in the footer on every page
  email: "FarmicAgroCo@gmail.com",         // shown in the footer, and used as the
                                          // fallback mailto: address if the
                                          // contact form isn't connected yet

  // Address — used both as plain text (footer, contact page) and to build
  // the Google Map link on the Contact page automatically.
  address: {
    line1: "H.No.6-404/35, Mythri Kuteer, Laxma Reddy Palem,",
    line2: "Pedda Amberpet Village, Abdullapurmet Mandal,",
    line3: "Ranga Reddy District, Telangana - 501505"
  },

  // ---- Contact form (Formspree) ----
  // 1. Go to https://formspree.io and create a free form.
  // 2. Copy the ID it gives you (looks like "xyzabcde") and paste it below,
  //    replacing YOUR_FORM_ID.
  // Until you do this, the form will still work, but it falls back to
  // opening the visitor's email app instead of submitting silently.
  formspreeId: "mjyvodby",

  // ---- Social media links ----
  // Leave a value as "" (empty quotes) to hide that icon entirely.
  social: {
   youtube:   "https://www.youtube.com/@FamricAgro",
    x:         "",
    facebook:  "https://www.facebook.com/profile.php?id=61594171772794",
    instagram: "https://www.instagram.com/famricagro/"
  }

};
