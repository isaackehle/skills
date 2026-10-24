#!/usr/bin/env node
// Render a resume JSON (see references/resume-format.md) to markdown and docx.
// Usage: node build-resume.js <resume.json> [--style standard|ats] [--md-only]
// Content comes only from the JSON. Nothing personal belongs in this file.

const fs = require('fs');
const path = require('path');

const ACCENT = '1F3864';
const FONT = 'Calibri';
const BODY = 19; // half-points (9.5pt)
const ALLOWED_KEYS = new Set([
  'name', 'headline', 'contact', 'summary', 'highlights', 'skills', 'experience',
  'compact', 'education', 'extras', 'notes', 'questions',
]);

function args(argv) {
  const out = { style: 'standard', mdOnly: false, file: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--style') out.style = argv[++i];
    else if (a === '--md-only') out.mdOnly = true;
    else if (!out.file) out.file = a;
  }
  if (!out.file || !['standard', 'ats'].includes(out.style)) {
    console.error('usage: build-resume.js <resume.json> [--style standard|ats] [--md-only]');
    process.exit(2);
  }
  return out;
}

function check(r) {
  const errs = [];
  for (const k of Object.keys(r)) if (!ALLOWED_KEYS.has(k)) errs.push(`unknown top-level key "${k}"`);
  for (const k of ['name', 'contact', 'experience']) if (!r[k]) errs.push(`missing "${k}"`);
  if (errs.length) {
    console.error(errs.map((e) => `error: ${e}`).join('\n'));
    process.exit(1);
  }
}

function asciiOnly(s) {
  return s
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/→/g, 'to')
    .replace(/[^\x00-\x7F]/g, '');
}

function companyLine(e) {
  return e.agency ? `${e.company} (${e.agency})` : e.company;
}

// ---------- markdown ----------

function toMarkdown(r, fix) {
  const L = [];
  L.push(`# ${fix(r.name)}`, '');
  if (r.headline) L.push(fix(r.headline), '');
  L.push(fix(r.contact.join(' | ')), '');
  if (r.summary) L.push('## Summary', '', fix(r.summary.text), '');
  if (r.highlights && r.highlights.items && r.highlights.items.length) {
    L.push(`## ${fix(r.highlights.heading || 'Highlights')}`, '');
    r.highlights.items.forEach((h) => L.push(`- **${fix(h.label)}:** ${fix(h.text)}`));
    L.push('');
  }
  if (r.skills && r.skills.length) {
    L.push('## Skills', '');
    r.skills.forEach((s) => L.push(`- **${fix(s.label)}:** ${fix(s.items.join(', '))}`));
    L.push('');
  }
  L.push('## Experience', '');
  r.experience.forEach((e) => {
    L.push(`### ${fix(companyLine(e))} | ${fix(e.location || '')} | ${fix(e.dates)}`, '', `**${fix(e.title)}**`, '');
    (e.bullets || []).forEach((b) => L.push(`- ${fix(b.text)}`));
    L.push('');
  });
  if (r.compact && r.compact.entries && r.compact.entries.length) {
    L.push(`## ${fix(r.compact.heading || 'Earlier Experience')}`, '');
    r.compact.entries.forEach((e) => {
      L.push(`**${fix(e.company)}** | ${fix(e.location || '')} | ${fix(e.dates)}  `);
      L.push(`*${fix(e.title)}* | ${fix(e.text)}`, '');
    });
  }
  if (r.education && r.education.length) {
    L.push('## Education', '');
    r.education.forEach((e) => L.push(`- ${fix(e)}`));
    L.push('');
  }
  (r.extras || []).forEach((x) => L.push(`## ${fix(x.label)}`, '', fix(x.text), ''));
  return L.join('\n').replace(/\n{3,}/g, '\n\n');
}

// ---------- docx ----------

function toDocx(r, fix, style) {
  let docx;
  try {
    docx = require('docx');
  } catch {
    console.error('error: the "docx" npm package is required (npm install docx)');
    process.exit(1);
  }
  const { Document, Paragraph, TextRun, AlignmentType, LevelFormat, BorderStyle, TabStopType } = docx;
  const ats = style === 'ats';
  const color = ats ? '000000' : ACCENT;
  const t = (text, o = {}) => new TextRun({ text: fix(text), font: FONT, size: BODY, ...o });
  const rich = (text) =>
    fix(text)
      .split(/(\*\*[^*]+\*\*)/)
      .filter(Boolean)
      .map((s) => (s.startsWith('**') ? t(s.slice(2, -2), { bold: true }) : t(s)));
  const heading = (text) =>
    new Paragraph({
      children: [t(text.toUpperCase(), { bold: true, color, size: 21 })],
      spacing: { before: 140, after: 50 },
      keepNext: true,
      ...(ats ? {} : { border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 1 } } }),
    });
  const bullet = (text) =>
    new Paragraph({ children: rich(text), numbering: { reference: 'bul', level: 0 }, spacing: { after: 15 } });
  const right = [{ type: TabStopType.RIGHT, position: 10800 }];

  const k = [];
  k.push(new Paragraph({ children: [t(r.name, { bold: true, size: 36, color })], alignment: AlignmentType.CENTER }));
  if (r.headline)
    k.push(new Paragraph({ children: [t(r.headline, { bold: true, size: 21 })], alignment: AlignmentType.CENTER }));
  k.push(
    new Paragraph({ children: [t(r.contact.join('  |  '), { size: 18 })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
  );
  if (r.summary) {
    k.push(heading('Summary'));
    k.push(new Paragraph({ children: rich(r.summary.text), spacing: { after: 40 } }));
  }
  if (r.highlights && r.highlights.items && r.highlights.items.length) {
    k.push(heading(r.highlights.heading || 'Highlights'));
    r.highlights.items.forEach((h) => k.push(bullet(`**${h.label}:** ${h.text}`)));
  }
  if (r.skills && r.skills.length) {
    k.push(heading('Skills'));
    r.skills.forEach((s) =>
      k.push(new Paragraph({ children: [t(`${s.label}: `, { bold: true }), t(s.items.join(', '))], spacing: { after: 25 } })),
    );
  }
  k.push(heading('Experience'));
  r.experience.forEach((e) => {
    k.push(
      new Paragraph({
        children: [t(companyLine(e), { bold: true }), t(e.location ? `  |  ${e.location}` : ''), t(`\t${e.dates}`)],
        tabStops: right,
        spacing: { before: 90 },
        keepNext: true,
      }),
    );
    k.push(new Paragraph({ children: [t(e.title, { bold: true, italics: true, color: '404040' })], keepNext: true }));
    (e.bullets || []).forEach((b) => k.push(bullet(b.text)));
  });
  if (r.compact && r.compact.entries && r.compact.entries.length) {
    k.push(heading(r.compact.heading || 'Earlier Experience'));
    r.compact.entries.forEach((e) => {
      k.push(
        new Paragraph({
          children: [t(e.company, { bold: true }), t(e.location ? `  |  ${e.location}` : ''), t(`\t${e.dates}`)],
          tabStops: right,
          spacing: { before: 45 },
          keepNext: true,
        }),
      );
      k.push(new Paragraph({ children: [t(e.title, { bold: true, italics: true, color: '404040' }), t(`  |  ${e.text}`)] }));
    });
  }
  if (r.education && r.education.length) {
    k.push(heading('Education'));
    r.education.forEach((e) => k.push(new Paragraph({ children: [t(e)], spacing: { after: 10 } })));
  }
  (r.extras || []).forEach((x) => {
    k.push(heading(x.label));
    k.push(new Paragraph({ children: rich(x.text) }));
  });

  return new Document({
    title: `${r.name} Resume`,
    styles: { default: { document: { run: { font: FONT, size: BODY } } } },
    numbering: {
      config: [
        {
          reference: 'bul',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: ats ? '-' : '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 300, hanging: 200 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
        children: k,
      },
    ],
  });
}

async function main() {
  const a = args(process.argv.slice(2));
  const r = JSON.parse(fs.readFileSync(a.file, 'utf8'));
  check(r);
  const fix = a.style === 'ats' ? (s) => asciiOnly(String(s ?? '')) : (s) => String(s ?? '');
  const stem = a.file.replace(/\.json$/i, '') + (a.style === 'ats' ? '-ats' : '');
  fs.writeFileSync(`${stem}.md`, toMarkdown(r, fix));
  console.log(`wrote ${path.basename(stem)}.md`);
  if (a.mdOnly) return;
  const { Packer } = require('docx');
  fs.writeFileSync(`${stem}.docx`, await Packer.toBuffer(toDocx(r, fix, a.style)));
  console.log(`wrote ${path.basename(stem)}.docx`);
}

main();
