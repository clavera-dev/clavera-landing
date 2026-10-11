/**
 * Review pack: several builds of the landing side by side in one static
 * folder, with a small switcher on every page, so someone who cannot run the
 * project can compare them with full motion and function.
 *
 *   node scripts/review-pack/build.mjs <out-dir> <slot>=<dist-dir> [...]
 *   node scripts/review-pack/build.mjs review base=dist-main 1=dist-h 2=dist-c 3=dist-a
 *
 * Each build is copied into its own folder (`base/`, `v1/`, …). Every
 * root-relative URL (`/_astro/…`, `/en/`, `/privacidad`) is rewritten to a
 * relative one that names the file (`../en/index.html`), so the pack works on
 * any static host, in a subfolder, without directory indexes. Absolute
 * metadata (canonical, hreflang, og:image) still points at the production
 * domain and is left alone.
 *
 * Every page gets `noindex`, and a fixed switcher at the bottom: one link per
 * build to the same page in that build, plus a link back to the overview.
 * Following a link loads the page from the top, so its entrance plays again;
 * the current build's button reloads it from the top.
 *
 * The pack is a review copy only. Nothing here is part of the site build, and
 * the site's own files are never edited in place.
 */
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { INTRO, SLOT_TEXT } from './text.mjs';

const [outArg, ...slotArgs] = process.argv.slice(2);
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
 * Root-relative URL -> URL relative to `fromFile` (a path inside the build),
 * naming a file so no directory index is needed.
 */
async function relativize(url, fromFile, dist) {
	if (!url.startsWith('/') || url.startsWith('//')) return url;
	const match = url.match(/^([^?#]*)([?#].*)?$/);
	let path = match[1];
	const tail = match[2] ?? '';
	if (path.endsWith('/')) path += 'index.html';
	else if (await isDir(join(dist, path))) path += '/index.html';
	const from = posix.dirname(`/${fromFile}`);
	let rel = posix.relative(from, path);
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

async function rewriteCssUrls(css, file, dist) {
	return replaceAsync(css, /url\((['"]?)(\/[^'")]+)\1\)/g, async (_, q, url) => `url(${q}${await relativize(url, file, dist)}${q})`);
}

async function rewriteHtml(html, file, dist) {
	html = await replaceAsync(html, /\s(href|src|action|poster)="(\/[^"]*)"/g, async (_, attr, url) => ` ${attr}="${await relativize(url, file, dist)}"`);
	html = await replaceAsync(html, /\ssrcset="([^"]*)"/g, async (_, list) => {
		const items = await Promise.all(
			list.split(',').map(async (item) => {
				const [url, ...rest] = item.trim().split(/\s+/);
				return [await relativize(url, file, dist), ...rest].join(' ');
			}),
		);
		return ` srcset="${items.join(', ')}"`;
	});
	return rewriteCssUrls(html, file, dist);
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
<nav class="rp-switch" aria-label="${INTRO.switchLabel}">${links}<a href="${up}index.html" class="rp-switch__home" aria-label="${INTRO.overviewLabel}" title="${INTRO.overviewLabel}">?</a></nav>
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

async function buildSlot(slot) {
	const target = join(OUT, slot.folder);
	const files = (await walk(slot.dist)).filter((f) => !SKIP.has(f));
	for (const file of files) {
		const from = join(slot.dist, file);
		const to = join(target, file);
		await mkdir(dirname(to), { recursive: true });
		if (file.endsWith('.html')) {
			let html = await rewriteHtml(await readFile(from, 'utf8'), file, slot.dist);
			html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">');
			html = html.replace('</body>', `${switcher(slot, file)}</body>`);
			await writeFile(to, html);
		} else if (file.endsWith('.css')) {
			await writeFile(to, await rewriteCssUrls(await readFile(from, 'utf8'), file, slot.dist));
		} else {
			await cp(from, to);
		}
	}
	return files.length;
}

function escape(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function introPage() {
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
		return `<article class="card"><p class="tag">${escape(text.tab)}</p><h2>${escape(text.title)}</h2><p class="lead">${escape(text.lead)}</p><ul>${points}</ul><div class="open-row">${locales}</div></article>`;
	}).join('');
	const notes = INTRO.notes.map((n) => `<li>${escape(n)}</li>`).join('');
	return `<!doctype html>
<html lang="${INTRO.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escape(INTRO.title)}</title>
<style>
:root{--bg:#f4f3f0;--card:#fff;--text:#161616;--muted:#5d5d5d;--line:#e2e0db;--accent:#111}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#121212;--card:#1b1b1b;--text:#f0f0f0;--muted:#a8a8a8;--line:#2c2c2c;--accent:#f0f0f0}}
:root[data-theme="dark"]{--bg:#121212;--card:#1b1b1b;--text:#f0f0f0;--muted:#a8a8a8;--line:#2c2c2c;--accent:#f0f0f0}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1120px;margin:0 auto;padding:48px 16px 64px}
h1{font-size:clamp(28px,4vw,40px);line-height:1.15;margin:0 0 12px;letter-spacing:-.01em}
.intro{max-width:46rem;color:var(--muted);margin:0 0 8px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px;margin:32px 0}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:8px}
.tag{margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
.card h2{margin:0;font-size:20px;line-height:1.25}
.lead{margin:0;color:var(--muted)}
.card ul{margin:4px 0 8px;padding-left:18px;color:var(--text);font-size:15px}
.card li{margin:4px 0}
.open-row{margin-top:auto;display:flex;gap:8px}
.open{flex:1;text-align:center;padding:10px 0;border-radius:999px;border:1px solid var(--accent);color:var(--accent);text-decoration:none;font-weight:600}
.open:hover{background:var(--accent);color:var(--bg)}
.notes{max-width:46rem;color:var(--muted);font-size:15px;padding-left:18px}
.notes li{margin:6px 0}
</style>
</head>
<body>
<main>
<h1>${escape(INTRO.title)}</h1>
<p class="intro">${escape(INTRO.lead)}</p>
<div class="grid">${cards}</div>
<ul class="notes">${notes}</ul>
</main>
</body>
</html>
`;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
let total = 0;
for (const slot of SLOTS) {
	const count = await buildSlot(slot);
	total += count;
	console.log(`${slot.folder}: ${count} files from ${slot.dist}`);
}
await writeFile(join(OUT, 'index.html'), introPage());
console.log(`review pack: ${total + 1} files in ${OUT}`);
