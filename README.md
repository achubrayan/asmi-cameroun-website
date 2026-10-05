# ASMI-Cameroun Website V8

## Deploying (important: the live campaign needs this)
The site is static, but the live fundraising counter uses two small Netlify Functions
(`netlify/functions`) and Netlify Blobs for storage. Drag-and-drop uploads do NOT build
functions. Deploy with one of:
  1. Git: push this folder to GitHub/GitLab and connect it in Netlify (recommended), or
  2. Netlify CLI: `npm i -g netlify-cli && netlify deploy --prod`
Then in Netlify: Site settings -> Environment variables -> add `ADMIN_TOKEN` (a long random
password). It protects the treasurer panel.

If the functions are not deployed, the site still works: the counter shows the confirmed
baseline (assets/data/campaign.json) and the pledge form runs in clearly labelled preview mode.

## How the live counter works
- Visitors pledge on /donate.html#pledge. The pledge appears at once as "pledged" (hatched part of the bar).
- Nothing counts as "confirmed" until the treasurer clicks "Money received" in /treasurer.html
  (noindex, token protected). Contributions received directly (cash, Mobile Money) are added there too.
- The public API (/api/campaign) never exposes contacts; supporters appear by first name only, and only if they opt in.
- To change the baseline or target, edit `BASE` at the top of netlify/lib/logic.mjs.

## Survey
The two KoboToolbox links are in survey.html and fr/enquete.html. To change a link, edit the three places each one appears (button, embed button) in those files.

## Local testing
`python3 -m http.server 8000` then open http://localhost:8000 (preview mode, nothing is saved).

## Files
assets/documents (statutes, receipt), assets/css/site.css, assets/js/site.js (design + behaviour), assets/js/i18n-*.js,
_headers (security policy, now allows Google Fonts), AUDIT.md (full audit and recommendations).
