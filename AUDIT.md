# ASMI-Cameroun website audit (V6 -> V7)

## What was wrong, and what changed
| Area | Finding | Action in V7 |
|---|---|---|
| Security policy | `_headers` blocked Google Fonts and the inline homepage script, so fonts and widgets would have failed on Netlify (a bug in V6) | CSP updated; homepage text moved to external files; no inline scripts remain |
| Homepage | Told the whole story (13 sections); visitors had no single next step | Cut to 9 focused sections: hero, trust facts, who we are, what we do, offer checker, Data Sentinel, live campaign, latest update, contact |
| Voice | Corporate/AI phrasing: "ecosystem", "intelligence", "not X but Y", long abstract headings | 270+ headings and paragraphs rewritten in plain, direct language (EN and FR) |
| Fundraising | Static, dated snapshot | Live counter with "confirmed" vs "pledged", treasurer panel, opt-in supporter names |
| Calls to action | Support route was a Google Form | Pledge form on-site (Google Form kept as alternative) |
| Public usefulness | Offer-checking guidance hidden in inner pages | Interactive offer checker on the homepage |

## Why confirmed and pledged are separate
A form entry is a promise, not money. If the public counter rose on promises alone, a donor or
journalist who asks for the bank/Mobile Money record would find a gap. Counting only
treasurer-confirmed money keeps the number defensible and matches your own rule against overstating progress.

## Things to fix outside the website (these affect donor trust more than design)
1. **Snapshot date.** The confirmed baseline (107,000 FCFA) is now dated 20 September 2026, after the declaration receipt of 10 September 2026.
   Before it goes public, make sure the treasurer's records really show 107,000 FCFA received by that date, and be ready to say
   when the first contributions arrived and who held the money before the association was declared.
2. **Payment channel.** Open an account (bank or Mobile Money merchant) in the association's name and publish its
   details only on the official site. Never use personal numbers.
3. **Documents to publish:** statutes (PDF), safeguarding and data-protection policy (2 pages each), a one-page
   theory of change, and the pilot budget with a reporting date.
4. **First proof of delivery.** One documented outreach session (attendance count, anonymous findings, photos with
   consent) will do more for credibility than any redesign. Publish it on the News page.
5. **Impact metrics.** Define 3 to 5 indicators now (e.g. people reached, offers checked, scam types logged) so reports are comparable.
6. **Email.** Use contact@asmi-cameroun.org consistently and add a named focal person for safeguarding.
7. **Photos.** Keep written consent for every identifiable person shown.

## Known limits
- Functions could not be run on Netlify from my environment. The logic was tested with an in-memory store
  (pledge, duplicate guard, bot filter, auth, confirm, offline entry). Test once after deploying.
- Concurrent writes are last-write-wins; fine at this volume.
- Pledges are unverified by design. Anyone can submit; the treasurer confirms only real receipts.
- Google Fonts load from Google. For fully self-hosted fonts, download Fraunces and Manrope into assets/fonts.

## V7.1: documents received and what they changed
- Statutes (certified, adopted 9 May 2026) and the declaration receipt (10 September 2026) are now downloadable from Governance > Public documents (EN and FR), compressed for the web.
- Safeguarding and data-protection focal person: Mancho Tebo Salif, with portrait, on the Governance page and linked from the Privacy page.
- Governance text now matches the statutes exactly: Article 16 (joint signature of President and Treasurer; Secretary General co-signs if the Treasurer is unavailable; bank or microfinance account in the association's name), Article 18 bis (data protection), Article 8 (removal of a member for serious misconduct, including breach of survivor confidentiality).
- Removed a claim that the statutes do not support: a "conflict of interest declaration" rule for Bureau members. Add it to the Internal Rules first, then we can publish it.

## V7.2: policy received, role corrected, contacts confirmed
- Contact details are confirmed as correct by the client and were not changed.
- Safeguarding and Data Protection Policy v1.0 (ASMI-SDP-001, approved 3 October 2026, DEC-017/ASMI-CM/BE/2026) is published under Governance > Public documents and announced on the homepage and News page.
- **Correction:** the policy names Mancho Tebo Salif as **Data Protection Officer** (operational appointment, not a Bureau change). The Safeguarding Lead is the President / Executive Director. The earlier "focal person for safeguarding" wording was wrong and has been replaced everywhere (EN and FR).
- The site now explains how a concern is raised (policy Article 23): who can receive it, the 24-hour internal escalation standard, and non-retaliation.
- LinkedIn and the WhatsApp channel are linked in the footer, on the Contact page and in the organisation's structured data.

## Open points
1. **Drafting note left in the policy.** Section 2 says legal references "should be reviewed by a suitably qualified Cameroonian legal adviser before final adoption". That line reads as unfinished in an approved document. Have it reviewed, then remove the sentence in v1.1.
2. **Documents the policy relies on.** It cites the Internal Regulations, the Member Commitment, Conduct, Safeguarding and Confidentiality Charter, and a Master Document Control Register. If any do not exist yet, a donor reading the policy will ask for them. Statutes Article 19 also requires the Internal Regulations.
3. **Classification.** The policy is marked "Internal - Controlled". It is published here at your request; confirm you are comfortable with the Annex forms being public.
4. **French version.** The policy is English only. Most local partners and authorities work in French, so a French version would help. We can prepare it.
5. **Signatures** appear in the statutes and policy PDFs. Say so if you prefer a version without them.
6. **Bank account** in the association's name (statutes Article 16): confirm before the first pledge is confirmed.

## V7.3: brand-consistency audit (client report: wrong logo on the Digital Safe Route page)
Every image on the site was reviewed. Findings:
- **Wrong logo:** the Digital Safe Route banner used a different "Africa map" ASMI logo and a separate "Data Sentinel" shield logo. Neither is the official logo (globe, handshake and walking family, as on the statutes and the declaration receipt).
- **Invented statistics:** the same banner showed "2,847 reported cases, Jan-Jun 2024", "75% high risk", a risk heat map and top risk factors. ASMI was declared in September 2026, so no such data exists. The Data Sentinel dashboard, the social-share preview and the homepage also showed "98% verified information" and "Communities protected". All removed.
- **Social accounts that may not exist:** the banner showed Facebook, X and YouTube icons and an @ASMICameroun handle. Only LinkedIn and the WhatsApp channel are confirmed, and those are the only ones linked.
- **Other logo variants:** the data-ethics and safe-migration illustrations contained AI-redrawn versions of the logo on banners, mugs and tablets, plus an on-screen "Verified / Authentic" job-offer mock-up that implied a real verification service.
- **Action:** six AI-generated illustrations were deleted. They are replaced by brand cards that use the exact official logo file, and by a Data Sentinel layout clearly labelled "Sample layout, not real data". The social-share image and app icons were regenerated from the official logo.
- **Checked and consistent:** the header and footer logo on all 41 pages, the favicon, the name "ASMI-Cameroun" (205 occurrences, no variants), the legal name, the statutes, the policy and the Word policy template.
- **To confirm:** the team photos on the About, Human Trafficking and News pages look digitally enhanced or generated. If any are not real photographs of your team, replace them or label them. Donors and journalists check this.

## V7.4: social icons and survey integration
- WhatsApp channel, LinkedIn and YouTube now appear as icon buttons in the footer (every page), the top utility bar and the Contact page. YouTube was added to the organisation's structured data.
- New pages: Survey (survey.html) and Enquete (fr/enquete.html), linked from Data Sentinel > menu, the footer, the homepage Data Sentinel section and the end of the six topic pages. Both KoboToolbox surveys are offered: the general public edition (Safe Migration Risk Survey V2) and the Ambassador Edition. Each opens in a new tab or inside the page.
- The page explains anonymity, voluntary participation, what not to type, how answers are handled (linked to the policy) and the Collect, Clean, Analyse, Act flow. It includes WhatsApp share and copy-link buttons.
- `_headers` now allows framing ee.kobotoolbox.org, and sitemap.xml lists both new pages.
- Automated check: 43 pages on phone and desktop widths, no horizontal scrolling, no broken images, no script errors, one h1 per page.
- Not tested: embedding the live KoboToolbox forms (no internet in the build environment). If a form refuses to show inside the page, the visible "Open it in a new tab" link still works.
- Survey length shown on each card: general public edition 33 questions (about 8 to 10 minutes), Ambassador Edition 37 questions (about 10 to 12 minutes). Times are estimates; adjust them after a few real test runs.

## V7.5: portrait crop, privacy consent, footer confidentiality
- **Portrait crop fixed:** a global image-ratio rule I added for the safeguarding portrait was cropping the President's portrait on the About page. The rule is removed and the full photo now shows.
- **Privacy consent banner:** appears on the first visit to any page in a new browser, with Accept and Decline. The choice is stored once per browser and the banner does not return. "Privacy choices" in every footer reopens it.
- **What the choice does:** the site has no advertising, analytics or tracking cookies. Accept = remember the language and load fonts from Google Fonts. Decline = browser default fonts, no language memory. Google Fonts are no longer loaded before consent, so visitors' IP addresses are not sent to Google without a choice.
- **Cookies and browser storage** table added to the Privacy & ethics page (EN and FR), listing every item the site can store.
- **Footer data-confidentiality block** on all 43 pages, with links to Privacy & ethics, the policy PDF and the Data Protection Officer.
- Tested: banner on first visit, remembered across pages, shown again in a new browser, reopened from the footer; no script errors on 43 pages.
- If you add analytics later, load it only when the stored choice is "accepted".

## V7.6: Legal & Institutional Information page (for institutional and Google for Nonprofits verification)
**New:** `institutional-information.html`, served at `/institutional-information` (redirect rule in `_redirects`, canonical `https://asmi-cameroun.org/institutional-information`, listed in `sitemap.xml`). All wording follows the supplied brief exactly. The registration number, declaration date, NIU, headquarters wording (Baressoumtou Aviation), phone numbers, domain statement and final verification statement are normal visible text, not images and not metadata. NGO structured data (legal name, NIU, receipt reference, sameAs links) is included.
**Linked from:** the footer of every page and the About menu on every page.
**Footer, all 44 pages:** legal-identity line (name, receipt N° 051/RDA/C16/SASC.- of 10 September 2026, NIU), official website, email, calls and WhatsApp.
**Identity wording made consistent:** the registration number now ends in ".-" everywhere, the WhatsApp number is written +237 692 01 13 34 everywhere, and the vague "civil-society organisation/initiative" descriptors on the homepage, footer and About page now read "declared Cameroonian nonprofit civil society association" (English and French).
**Not published, as instructed:** NIU certificate, tax-compliance certificate, personal ID documents, member or survivor records.

### Noticed but NOT changed (your decision)
1. ~~Address spelling~~ — RESOLVED (V7.7): every page (EN + FR footer, Contact card, JSON-LD) now uses "Baressoumtou Aviation, Nkongsamba 3e, Moungo Division, Littoral Region, Cameroon" (FR: "département du Moungo, région du Littoral, Cameroun").
2. **Receipt and statutes already public.** The Governance page offers the full receipt and the certified statutes (with signatures) as downloads. The brief says not to publish the complete receipt unless you approve it. You supplied both for the website earlier, but please confirm this is still intended.
3. **"Founder" title.** The About page labels the President "President / Executive Director / Founder". "Founder" is not one of the statutory office titles used on the new page.
4. **"Data Sentinel Initiative" tagline.** It appears about 68 times (header, footer, hero tags). It is a programme name, not part of the registered name, so it was left alone. Decide whether it should stay beside the legal name.
5. **No French version of the new page.** French pages link to the English page; the link text stays in English as in the brief.
6. **Contact details on the statutes letterhead** (asmi.cameroun@gmail.com and other numbers) differ from the official details on the site. You confirmed the site details are correct; the statutes are unchanged.
7. **Safeguarding policy files.** The v1.0 PDF on the site and the v1.1 draft still use the old receipt number without ".-" and the old phone spacing "+237 6 92 01 13 34".
8. **Team photos.** Still to confirm that they are real photographs (see V7.3).

### Fix made while testing
The footer's contact column was cramped (the "Official website" label ran into the address); each label now sits above its value.

## V7.8 — Image crop audit
Checked every `<img>` on all 44 pages at 1366 px and 390 px (natural vs rendered proportions, then visual review).
Fixed: (1) homepage General Assembly photo lost 30 % of its width (edge faces cut) → box now 3:2, stacked caption on phones; (2) ASMI logo in news-card brand tiles was squashed to 72×45 and cropped 38 % → square, `object-fit:contain`; (3) header/footer logo set to `contain`; (4) news-card photos anchored to the upper part so heads are never cut.
Verified unchanged/OK: President portrait, DPO portrait, leadership portrait, About group photo, "STOP human trafficking" polo photos, all other logos (no distortion).

## V8 — Final deployment audit
Fixed: cache headers (CSS/JS/images no longer cached for a year under unversioned names); stale inline-script hash removed from CSP; noindex on 404, thank-you, merci and treasurer pages; spam honeypot on all 7 Netlify forms; function helper moved to netlify/lib/ so Netlify does not treat it as a function; sitemap now includes the institutional page; two over-long meta descriptions shortened; footer shows the official domain asmi-cameroun.org; deployment checklist rewritten; obsolete redirect removed.
Verified: 44 pages, 0 broken links/anchors, 0 duplicate ids, 0 script or CSP errors when served with the real _headers, no horizontal overflow, function logic runs.
