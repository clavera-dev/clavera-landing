/**
 * Minimal static server for `dist/`, used only by the Playwright harness.
 *
 * Why this exists instead of `astro preview`: this Astro version's preview
 * command always detaches into a background process and the foreground process
 * exits immediately. Playwright's `webServer` watches the process it spawned,
 * sees it exit, and aborts the run. This script stays in the foreground so
 * Playwright can start it, wait on it, and kill it cleanly.
 *
 * It is deliberately a plain `node:http` handler: no dependency is added to
 * the project just to serve files during tests.
 */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'dist');
const PORT = Number(process.env.PORT ?? process.argv[3] ?? 4321);

const TYPES = new Map([
	['.html', 'text/html; charset=utf-8'],
	['.css', 'text/css; charset=utf-8'],
	['.js', 'text/javascript; charset=utf-8'],
	['.svg', 'image/svg+xml'],
	['.avif', 'image/avif'],
	['.webp', 'image/webp'],
	['.png', 'image/png'],
	['.jpg', 'image/jpeg'],
	['.json', 'application/json; charset=utf-8'],
	['.woff2', 'font/woff2'],
	['.xml', 'application/xml; charset=utf-8'],
	['.txt', 'text/plain; charset=utf-8'],
]);

/** Resolves a URL path to a file inside ROOT, or null if it escapes ROOT. */
async function resolveFile(urlPath) {
	const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
	const candidate = resolve(join(ROOT, normalize(decoded)));

	// Directory traversal guard.
	if (candidate !== ROOT && !candidate.startsWith(ROOT + sep)) return null;

	try {
		const info = await stat(candidate);
		if (info.isDirectory()) {
			const index = join(candidate, 'index.html');
			await stat(index);
			return index;
		}
		return candidate;
	} catch {
		return null;
	}
}

/**
 * Refuse to serve a directory that was never built. Without this the harness
 * could start, answer 404s, and let a run "pass" against nothing.
 */
try {
	const index = await stat(join(ROOT, 'index.html'));
	if (!index.isFile()) throw new Error('not a file');
} catch {
	console.error(`serve-dist: ${join(ROOT, 'index.html')} is missing — run \`yarn build\` first.`);
	process.exit(1);
}

const server = createServer(async (request, response) => {
	const file = await resolveFile(request.url ?? '/');

	if (!file) {
		response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
		response.end('Not found');
		return;
	}

	response.writeHead(200, {
		'content-type': TYPES.get(extname(file)) ?? 'application/octet-stream',
		'cache-control': 'no-store',
	});
	createReadStream(file).pipe(response);
});

server.on('error', (error) => {
	// EADDRINUSE means something else already holds the port. Failing here is
	// deliberate: silently attaching to it would test the wrong build.
	console.error(`serve-dist: cannot listen on ${PORT} — ${error.message}`);
	process.exit(1);
});

server.listen(PORT, () => {
	console.log(`serving ${ROOT} on http://localhost:${PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () => server.close(() => process.exit(0)));
}
