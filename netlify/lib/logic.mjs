// Campaign logic, kept separate from the Netlify wrapper so it can be tested without a server.
const BASE = { confirmedBase: 107000, target: 700000, baseDate: '2026-09-20' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const clean = (v, n) => String(v ?? '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, n);
const sum = (a) => a.reduce((t, x) => t + x.amount, 0);

export async function load(store) {
  return (await store.get('state', { type: 'json' })) || { ...BASE, pledges: [], offline: [], updated: null };
}
const save = (store, s) => { s.updated = new Date().toISOString(); return store.setJSON('state', s); };

export function view(s) {
  const confirmedPledges = s.pledges.filter((p) => p.status === 'confirmed');
  const pending = s.pledges.filter((p) => p.status === 'pending');
  return {
    confirmed: s.confirmedBase + sum(confirmedPledges) + sum(s.offline),
    pledged: sum(pending),
    pledgeCount: pending.length,
    target: s.target,
    updated: s.updated || s.baseDate,
    supporters: s.pledges.filter((p) => p.public && p.status !== 'declined').slice(-6).reverse()
      .map((p) => ({ name: p.name.split(/\s+/)[0], status: p.status })),
  };
}

export async function handleCampaign(req, store) {
  if (req.method === 'GET') return json(view(await load(store)));
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  let b; try { b = await req.json(); } catch { return json({ error: 'bad_json' }, 400); }
  if (b.company) return json({ ok: true }); // honeypot: silently ignore bots
  const amount = Math.round(Number(b.amount));
  const name = clean(b.name, 60), contact = clean(b.contact, 80);
  if (!(amount >= 500 && amount <= 5000000)) return json({ error: 'amount' }, 400);
  if (name.length < 2 || contact.length < 5) return json({ error: 'fields' }, 400);
  const s = await load(store);
  const now = Date.now();
  if (s.pledges.some((p) => p.contact === contact && p.amount === amount && now - Date.parse(p.ts) < 300000))
    return json({ ok: true, duplicate: true, ...view(s) });
  s.pledges.push({ id: crypto.randomUUID(), name, contact, amount, public: !!b.public, status: 'pending', ts: new Date(now).toISOString() });
  await save(store, s);
  return json({ ok: true, ...view(s) });
}

export async function handleTreasurer(req, store, token) {
  if (!token || req.headers.get('x-admin-token') !== token) return json({ error: 'unauthorised' }, 401);
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  let b; try { b = await req.json(); } catch { return json({ error: 'bad_json' }, 400); }
  const s = await load(store);
  if (b.action === 'confirm' || b.action === 'decline') {
    const p = s.pledges.find((x) => x.id === b.id);
    if (!p) return json({ error: 'not_found' }, 404);
    p.status = b.action === 'confirm' ? 'confirmed' : 'declined';
    p.decidedAt = new Date().toISOString();
    await save(store, s);
  } else if (b.action === 'offline') {
    const amount = Math.round(Number(b.amount));
    if (!(amount > 0 && amount <= 50000000)) return json({ error: 'amount' }, 400);
    s.offline.push({ id: crypto.randomUUID(), amount, note: clean(b.note, 120), ts: new Date().toISOString() });
    await save(store, s);
  } else if (b.action !== 'list') return json({ error: 'action' }, 400);
  return json({ ...view(s), pledges: [...s.pledges].reverse(), offline: [...s.offline].reverse() });
}
