#!/usr/bin/env node
// Mechanical checks for a tailored resume JSON. See tasks/verify-resume.md.
// Usage: node verify-resume.js <resume.json> --inventory <inventory.md> [--rules <resume-rules.md>] [--keywords <file>]
//
// Fails on: a claim with no src, an unknown src ID, a number not present in the cited entries, a title or
// date range not found in the inventory, and any banned pattern from the rules file.
// Exit code 0 = pass, 1 = fail, 2 = usage error.

const fs = require('fs');

function args(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[++i];
    else o.file = argv[i];
  }
  if (!o.file || !o.inventory) {
    console.error('usage: verify-resume.js <resume.json> --inventory <md> [--rules <md>] [--keywords <txt>]');
    process.exit(2);
  }
  return o;
}

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/\*\*/g, '')
    .replace(/(\d),(\d)/g, '$1$2')
    .replace(/\s+/g, ' ');

// Inventory entries: a heading line "### [id] Title" followed by its body.
function parseInventory(text) {
  const entries = new Map();
  let id = null;
  let buf = [];
  const flush = () => id && entries.set(id, norm(buf.join('\n')));
  for (const line of text.split('\n')) {
    const m = line.match(/^#{2,4}\s+\[([a-z0-9][a-z0-9-]*)\]/i);
    if (m) {
      flush();
      id = m[1].toLowerCase();
      buf = [line];
    } else if (/^#{1,2}\s/.test(line) && id) {
      flush();
      id = null;
      buf = [];
    } else if (id) buf.push(line);
  }
  flush();
  return entries;
}

// Banned patterns: a ```banned fenced block in the rules file, one regex per line, # for comments.
function parseBanned(text) {
  const m = text.match(/```banned\n([\s\S]*?)```/);
  if (!m) return [];
  return m[1]
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => new RegExp(l, 'i'));
}

function numbers(text) {
  return (norm(text).match(/\d+(?:\.\d+)?/g) || []).filter((n) => n.length > 0);
}

function claims(r) {
  const out = [];
  if (r.summary) out.push({ where: 'summary', text: r.summary.text, src: r.summary.src });
  ((r.highlights && r.highlights.items) || []).forEach((h, i) =>
    out.push({ where: `highlights[${i}]`, text: `${h.label}: ${h.text}`, src: h.src }),
  );
  (r.experience || []).forEach((e, i) =>
    (e.bullets || []).forEach((b, j) => out.push({ where: `${e.company} bullet ${j + 1}`, text: b.text, src: b.src })),
  );
  ((r.compact && r.compact.entries) || []).forEach((e) =>
    out.push({ where: `${e.company} (compact)`, text: e.text, src: e.src }),
  );
  return out;
}

function allText(r) {
  const parts = [r.name, r.headline, ...(r.contact || [])];
  claims(r).forEach((c) => parts.push(c.text));
  (r.skills || []).forEach((s) => parts.push(s.label, ...s.items));
  (r.experience || []).forEach((e) => parts.push(e.company, e.agency, e.title, e.dates, e.location));
  ((r.compact && r.compact.entries) || []).forEach((e) => parts.push(e.company, e.title, e.dates));
  (r.education || []).forEach((e) => parts.push(e));
  (r.extras || []).forEach((x) => parts.push(x.label, x.text));
  return parts.filter(Boolean).join('\n');
}

function main() {
  const a = args(process.argv.slice(2));
  const r = JSON.parse(fs.readFileSync(a.file, 'utf8'));
  const invText = fs.readFileSync(a.inventory, 'utf8');
  const inv = parseInventory(invText);
  const invAll = norm(invText);
  const fails = [];
  const warns = [];

  if (inv.size === 0) fails.push('inventory has no "### [id] Title" entries; cannot check sources');

  for (const c of claims(r)) {
    const src = (c.src || []).map((s) => String(s).toLowerCase());
    if (!src.length) {
      fails.push(`${c.where}: no src`);
      continue;
    }
    const unknown = src.filter((s) => !inv.has(s));
    if (unknown.length) fails.push(`${c.where}: unknown src ${unknown.join(', ')}`);
    const cited = src.filter((s) => inv.has(s)).map((s) => inv.get(s)).join('\n');
    for (const n of numbers(c.text)) {
      if (!new RegExp(`(^|[^0-9.])${n.replace('.', '\\.')}([^0-9]|$)`).test(cited)) {
        fails.push(`${c.where}: number "${n}" not found in cited entries [${src.join(', ')}]`);
      }
    }
  }

  for (const e of r.experience || []) {
    if (e.title && !invAll.includes(norm(e.title))) fails.push(`${e.company}: title "${e.title}" not in inventory`);
    if (e.dates && !invAll.includes(norm(e.dates))) fails.push(`${e.company}: dates "${e.dates}" not in inventory`);
    if (e.company && !invAll.includes(norm(e.company))) fails.push(`company "${e.company}" not in inventory`);
  }

  if (a.rules) {
    const banned = parseBanned(fs.readFileSync(a.rules, 'utf8'));
    if (!banned.length) warns.push('rules file has no ```banned block; banned-phrase check skipped');
    const text = allText(r);
    for (const re of banned) {
      const m = text.match(re);
      if (m) fails.push(`banned pattern /${re.source}/ matched "${m[0]}"`);
    }
  }

  let coverage = null;
  if (a.keywords) {
    const text = norm(allText(r));
    let got = 0;
    let total = 0;
    const missing = [];
    for (const raw of fs.readFileSync(a.keywords, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const req = line.startsWith('!');
      const forms = line.replace(/^!/, '').split('|').map((f) => norm(f.trim())).filter(Boolean);
      const w = req ? 2 : 1;
      total += w;
      if (forms.some((f) => text.includes(f))) got += w;
      else missing.push((req ? '!' : '') + forms[0]);
    }
    coverage = { pct: total ? Math.round((100 * got) / total) : 0, missing };
  }

  const pass = fails.length === 0;
  console.log(`Verdict: ${pass ? 'PASS' : 'FAIL'}`);
  if (fails.length) console.log('\nFailures:\n' + fails.map((f) => `- ${f}`).join('\n'));
  if (warns.length) console.log('\nWarnings:\n' + warns.map((w) => `- ${w}`).join('\n'));
  if (coverage) {
    console.log(`\nKeyword coverage: ${coverage.pct}%`);
    if (coverage.missing.length) console.log('Missing: ' + coverage.missing.join(', '));
  }
  process.exit(pass ? 0 : 1);
}

main();
