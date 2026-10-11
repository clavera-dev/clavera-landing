/**
 * Review pack: several builds of the landing side by side in one static
 * folder, with a small switcher on every page, so someone who cannot run the
 * project can compare them with full motion and function.
 *
 *   node scripts/review-pack/build.mjs <out-dir> <slot>=<dist-dir> [...] [--artifact]
 *   node scripts/review-pack/build.mjs review base=dist-main 1=dist-h 2=dist-c 3=dist-a
 *
 * Each build is copied into its own folder (`base/`, `v1/`, …). Every
 * root-relative URL (`/_astro/…`, `/en/`, `/privacidad`) is rewritten to a
 * relative one that names the file (`../en/index.html`), so the pack works on
 * any static host, in a subfolder, without directory indexes. Absolute
 * metadata (canonical, hreflang, og:image) still points at the production
 * domain and is left alone.
 *
 * Assets that are byte-identical in every build (the renders, the logo) are
 * stored once, in `shared/`, and every build points there.
 *
 * Every page gets `noindex`, and a fixed switcher at the bottom: one link per
 * build to the same page in that build, plus a link back to the overview.
 * Following a link loads the page from the top, so its entrance plays again;
 * the current build's button reloads it from the top.
 *
 * `--artifact` prepares the pack for a claude.ai Artifact: the web fonts are
 * inlined into each build's CSS as data URIs (the Artifact's content policy
 * only admits Google Fonts as a font host) and their preload links dropped,
 * and the overview is also written as `<out-dir>.page.html`, a fragment
 * without its own document skeleton, to publish as the Artifact's page.
 *
 * The pack is a review copy only. Nothing here is part of the site build, and
 * the site's own files are never edited in place.
 */
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { INTRO, SLOT_TEXT } from './text.mjs';

const args = process.argv.slice(2);
const ARTIFACT = args.includes('--artifact');
const [outArg, ...slotArgs] = args.filter((a) => a !== '--artifact');
if (!outArg || slotArgs.length === 0) {
	console.error('usage: build.mjs <out-dir> <slot>=<dist-dir> [...]');
	process.exit(1);
}

const OUT = resolve(outArg);
const SLOTS = slotArgs.map((arg) => {
	const [key, dir] = arg.split('=');
	return { key, folder: key === 'base' ? 'base' : `v${key}`, dist: resolve(dir) };
});

/* Files a reviewer never needs; some hosts also reject the types. */
const SKIP = new Set(['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'llms.txt']);

async function walk(dir, base = dir) {
	const files = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(full, base)));
		else files.push(relative(base, full).split('\\').join('/'));
	}
	return files;
}

async function isDir(path) {
	try {
		return (await stat(path)).isDirectory();
	} catch {
		return false;
	}
}

/**
 * Root-relative URL -> URL relative to `fromFile` (a path inside the slot's
 * build), naming a file so no directory index is needed. Shared assets
 * resolve to the pack's `shared/` folder instead of the slot's own.
 */
async function relativize(url, fromFile, slot) {
	if (!url.startsWith('/') || url.startsWith('//')) return url;
	const match = url.match(/^([^?#]*)([?#].*)?$/);
	let path = match[1];
	const tail = match[2] ?? '';
	if (path.endsWith('/')) path += 'index.html';
	else if (await isDir(join(slot.dist, path))) path += '/index.html';
	const target = SHARED.has(path.slice(1)) ? `/shared${path}` : `/${slot.folder}${path}`;
	const from = posix.dirname(`/${slot.folder}/${fromFile}`);
	let rel = posix.relative(from, target);
	if (!rel.startsWith('.')) rel = `./${rel}`;
	return rel + tail;
}

async function replaceAsync(text, pattern, fn) {
	const parts = [];
	let last = 0;
	for (const m of text.matchAll(pattern)) {
		parts.push(text.slice(last, m.index), await fn(...m));
		last = m.index + m[0].length;
	}
	parts.push(text.slice(last));
	return parts.join('');
}

async function rewriteCssUrls(css, file, slot) {
	return replaceAsync(css, /url\((['"]?)(\/[^'")]+)\1\)/g, async (_, q, url) => {
		if (ARTIFACT && url.endsWith('.woff2')) {
			const data = await readFile(join(slot.dist, url));
			return `url(data:font/woff2;base64,${data.toString('base64')})`;
		}
		return `url(${q}${await relativize(url, file, slot)}${q})`;
	});
}

async function rewriteHtml(html, file, slot) {
	html = await replaceAsync(html, /\s(href|src|action|poster)="(\/[^"]*)"/g, async (_, attr, url) => ` ${attr}="${await relativize(url, file, slot)}"`);
	html = await replaceAsync(html, /\ssrcset="([^"]*)"/g, async (_, list) => {
		const items = await Promise.all(
			list.split(',').map(async (item) => {
				const [url, ...rest] = item.trim().split(/\s+/);
				return [await relativize(url, file, slot), ...rest].join(' ');
			}),
		);
		return ` srcset="${items.join(', ')}"`;
	});
	if (ARTIFACT) html = html.replace(/<link rel="preload" as="font"[^>]*>\s*/g, '');
	return rewriteCssUrls(html, file, slot);
}

function switcher(slot, file) {
	const depth = file.split('/').length; // folder + path segments
	const up = '../'.repeat(depth);
	const links = SLOTS.map((s) => {
		const current = s.key === slot.key;
		const label = SLOT_TEXT[s.key]?.tab ?? s.key;
		return `<a href="${up}${s.folder}/${file}"${current ? ' aria-current="page"' : ''} data-rp-slot>${label}</a>`;
	}).join('');
	return `
<nav class="rp-switch" aria-label="${INTRO.switchLabel}">${links}<a href="${up}overview.html" class="rp-switch__home" aria-label="${INTRO.overviewLabel}" title="${INTRO.overviewLabel}">?</a></nav>
<style>
.rp-switch{position:fixed;z-index:2147483647;left:50%;bottom:max(12px,env(safe-area-inset-bottom));transform:translateX(-50%);display:flex;gap:2px;padding:4px;border-radius:999px;background:rgba(18,18,18,.86);box-shadow:0 6px 24px rgba(0,0,0,.28),0 0 0 1px rgba(255,255,255,.12);font:600 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.rp-switch a{display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:36px;padding:0 12px;border-radius:999px;color:#f2f2f2;text-decoration:none;letter-spacing:0;background:none}
.rp-switch a:hover{background:rgba(255,255,255,.14)}
.rp-switch a[aria-current="page"]{background:#f2f2f2;color:#111}
.rp-switch a:focus-visible{outline:2px solid #f2f2f2;outline-offset:2px}
.rp-switch .rp-switch__home{min-width:36px;padding:0;color:#bdbdbd;font-weight:500}
.rp-switch{transition:translate .3s ease,opacity .3s ease}
.rp-switch.rp-switch--away:not(:focus-within){translate:0 calc(100% + 24px);opacity:0}
@media print{.rp-switch{display:none}}
</style>
<script>
(() => {
	const bar = document.querySelector('.rp-switch');
	const current = bar.querySelector('[aria-current="page"]');
	current.addEventListener('click', (event) => {
		event.preventDefault();
		history.scrollRestoration = 'manual';
		window.scrollTo(0, 0);
		location.reload();
	});
	// Out of the way while reading down the page; back on any scroll up,
	// near the top and at the very end.
	let last = window.scrollY;
	window.addEventListener('scroll', () => {
		const y = window.scrollY;
		const end = y + window.innerHeight >= document.documentElement.scrollHeight - 80;
		if (Math.abs(y - last) < 8 && !end) return;
		bar.classList.toggle('rp-switch--away', y > last && y > 240 && !end);
		last = y;
	}, { passive: true });
})();
</script>
`;
}

function packed(slot) {
	return walk(slot.dist).then((files) => files.filter((f) => !SKIP.has(f) && !(ARTIFACT && f.endsWith('.woff2'))));
}

/* Paths of the non-page files that every slot has, with the same bytes. */
async function sharedAssets() {
	const [first, ...rest] = SLOTS;
	const shared = new Set();
	for (const file of await packed(first)) {
		if (file.endsWith('.html') || file.endsWith('.css')) continue;
		const bytes = await readFile(join(first.dist, file));
		let same = true;
		for (const slot of rest) {
			const other = await readFile(join(slot.dist, file)).catch(() => null);
			if (!other || !bytes.equals(other)) {
				same = false;
				break;
			}
		}
		if (same) shared.add(file);
	}
	return shared;
}

async function buildSlot(slot) {
	const target = join(OUT, slot.folder);
	const files = (await packed(slot)).filter((f) => !SHARED.has(f));
	for (const file of files) {
		const from = join(slot.dist, file);
		const to = join(target, file);
		await mkdir(dirname(to), { recursive: true });
		if (file.endsWith('.html')) {
			let html = await rewriteHtml(await readFile(from, 'utf8'), file, slot);
			html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">');
			html = html.replace('</body>', `${switcher(slot, file)}</body>`);
			await writeFile(to, html);
		} else if (file.endsWith('.css')) {
			await writeFile(to, await rewriteCssUrls(await readFile(from, 'utf8'), file, slot));
		} else {
			await cp(from, to);
		}
	}
	return files.length;
}

function escape(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function introPage({ fragment = false } = {}) {
	const cards = SLOTS.map((slot) => {
		const text = SLOT_TEXT[slot.key];
		const points = text.points.map((p) => `<li>${escape(p)}</li>`).join('');
		const locales = [
			['ES', 'index.html'],
			['EN', 'en/index.html'],
			['RU', 'ru/index.html'],
		]
			.map(([label, path]) => `<a class="open" href="${slot.folder}/${path}">${label}</a>`)
			.join('');
		return `<article class="card"><p class="tag">${escape(text.tab)}</p><h2>${escape(text.title)}</h2><p class="lead">${escape(text.lead)}</p><ul>${points}</ul><div class="open-row" aria-label="${escape(text.title)}">${locales}</div></article>`;
	}).join('');
	const notes = INTRO.notes.map((n) => `<li>${escape(n)}</li>`).join('');
	const head = `<title>${escape(INTRO.pageTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;700&display=swap">
<style>
/* Overview of a review pack: one column of copy, four equal cards, notes.
   CLAVERA's own palette (graphite, concrete, amber) and UI face (Onest). */
:root{--bg:oklch(96.5% 0.002 80);--surface:oklch(99.2% 0.001 80);--text:oklch(18% 0.004 95);--muted:oklch(46% 0.005 85);--line:oklch(86% 0.004 85);--accent:#9F5100;--font:"Onest",system-ui,-apple-system,"Segoe UI",sans-serif}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:oklch(15% 0.004 95);--surface:oklch(18% 0.004 95);--text:oklch(96.5% 0.002 80);--muted:oklch(69% 0.006 85);--line:oklch(25% 0.005 90);--accent:oklch(72% 0.15 62);color-scheme:dark}}
:root[data-theme="dark"]{--bg:oklch(15% 0.004 95);--surface:oklch(18% 0.004 95);--text:oklch(96.5% 0.002 80);--muted:oklch(69% 0.006 85);--line:oklch(25% 0.005 90);--accent:oklch(72% 0.15 62);color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 var(--font)}
main{max-width:1120px;margin:0 auto;padding-inline:16px;padding-block:48px 64px}
.kicker{margin:0 0 12px;font-size:13px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
h1{font-size:clamp(30px,4.4vw,46px);line-height:1.1;font-weight:700;letter-spacing:-.02em;margin:0 0 16px;text-wrap:balance}
.intro{max-width:44rem;color:var(--muted);margin:0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px;margin-block:36px}
.card{min-width:0;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:8px}
.tag{margin:0;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.card h2{margin:0;font-size:20px;line-height:1.25;font-weight:700;text-wrap:balance}
.lead{margin:0;color:var(--muted)}
.card ul{margin:4px 0 12px;padding-left:18px;font-size:15px}
.card li{margin:4px 0}
.open-row{margin-top:auto;display:flex;gap:8px}
.open{flex:1;text-align:center;padding:10px 0;border-radius:999px;border:1px solid var(--line);color:var(--text);text-decoration:none;font-weight:500;transition:border-color .2s ease,background-color .2s ease,color .2s ease}
.open:hover{border-color:var(--accent);color:var(--accent)}
.open:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.notes{max-width:44rem;color:var(--muted);font-size:15px;padding-left:18px;margin:0}
.notes li{margin:6px 0}
@media (prefers-reduced-motion: reduce){.open{transition:none}}
</style>`;
	const body = `<main>
<p class="kicker">${escape(INTRO.kicker)}</p>
<h1>${escape(INTRO.title)}</h1>
<p class="intro">${escape(INTRO.lead)}</p>
<div class="grid">${cards}</div>
<ul class="notes">${notes}</ul>
</main>`;
	if (fragment) return `${head}\n${body}\n`;
	return `<!doctype html>
<html lang="${INTRO.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
${head}
</head>
<body>
${body}
</body>
</html>
`;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
const SHARED = await sharedAssets();
for (const file of SHARED) {
	await mkdir(dirname(join(OUT, 'shared', file)), { recursive: true });
	await cp(join(SLOTS[0].dist, file), join(OUT, 'shared', file));
}
console.log(`shared: ${SHARED.size} files`);
let total = SHARED.size;
for (const slot of SLOTS) {
	const count = await buildSlot(slot);
	total += count;
	console.log(`${slot.folder}: ${count} files from ${slot.dist}`);
}
await writeFile(join(OUT, 'index.html'), introPage());
await writeFile(join(OUT, 'overview.html'), introPage());
if (ARTIFACT) await writeFile(`${OUT}.page.html`, introPage({ fragment: true }));
console.log(`review pack: ${total + 2} files in ${OUT}${ARTIFACT ? ` (+ page ${OUT}.page.html)` : ''}`);
