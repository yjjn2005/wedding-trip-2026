// Google Maps JavaScript API key.
// Restrict this key in Google Cloud Console to the deployed GitHub Pages
// domain (HTTP referrer restriction) so it is safe to ship client-side.
window.GOOGLE_MAPS_API_KEY = "AIzaSyAZislK5mCjFvQ_W6_2zbwgrHprBWXUW-U";

// Cloudflare Worker endpoint used for cross-device sync of checklist /
// day-completion state. Reusing the existing wedding-trip-2026 Worker.
window.SYNC_API_BASE = "https://wedding-trip-api.yjjn2005.workers.dev";
